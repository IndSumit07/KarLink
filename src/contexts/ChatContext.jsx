
import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import supabase from '../libs/Supabase';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
    const { user } = useAuth();
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState({});
    const [loading, setLoading] = useState(false);

    // Fetch all chats for the current user
    const fetchChats = useCallback(async (showLoading = true) => {
        if (!user) return;

        // Only show loading spinner if we clearly want to (initial load) 
        // OR if we don't have ANY chats yet, we might as well show it.
        // But the argument control is safer for background updates.
        if (showLoading) setLoading(true);

        try {
            // 1. Get chat IDs the user is part of
            const { data: participantData, error: participantError } = await supabase
                .from('chat_participants')
                .select('chat_id')
                .eq('user_id', user.id);

            if (participantError) throw participantError;

            const chatIds = participantData.map(p => p.chat_id);

            if (chatIds.length === 0) {
                setChats([]);
                if (showLoading) setLoading(false);
                return;
            }

            // 2. Fetch chat details and other participants
            const { data: chatsData, error: chatsError } = await supabase
                .from('chats')
                .select(`
          *,
          chat_participants (
            user_id,
            profiles:user_id (full_name, avatar_url)
          ),
          messages (
            content,
            created_at,
            is_read,
            sender_id
          )
        `)
                .in('id', chatIds)
                .order('last_message_at', { ascending: false });

            if (chatsError) throw chatsError;

            // Process chats to format data nicely
            const formattedChats = chatsData.map(chat => {
                // Find the "other" participant
                const otherParticipant = chat.chat_participants.find(p => p.user_id !== user.id);
                const lastMessage = chat.messages && chat.messages.length > 0
                    ? chat.messages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]
                    : null;

                return {
                    ...chat,
                    otherUser: otherParticipant ? otherParticipant.profiles : { full_name: 'Unknown User', avatar_url: null },
                    lastMessage
                };
            });

            setChats(formattedChats);
        } catch (error) {
            console.error("Error fetching chats:", error);
            toast.error("Failed to load chats");
        } finally {
            if (showLoading) setLoading(false);
        }
    }, [user]);

    // Fetch messages for a specific chat
    const fetchMessages = async (chatId) => {
        if (!user) return;
        try {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .eq('chat_id', chatId)
                .order('created_at', { ascending: true });

            if (error) throw error;

            setMessages(prev => ({
                ...prev,
                [chatId]: data
            }));
            return data;
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    // Send a message
    const sendMessage = async (chatId, content) => {
        if (!user) return;
        try {
            const { data, error } = await supabase
                .from('messages')
                .insert({
                    chat_id: chatId,
                    sender_id: user.id,
                    content
                })
                .select()
                .single();

            if (error) throw error;

            // Update last_message_at in chats table
            await supabase
                .from('chats')
                .update({ last_message_at: new Date() })
                .eq('id', chatId);

            return data;
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message");
            return null;
        }
    };

    // Create or Get existing chat (1-on-1)
    const createOrGetChat = async (otherUserId) => {
        if (!user) return null;
        if (user.id === otherUserId) return null; // Cannot chat with self

        try {
            // 1. Check if a chat already exists using our secure RPC
            const { data: existingChatId, error: rpcError } = await supabase
                .rpc('get_personal_chat_id', { other_user_id: otherUserId });

            if (rpcError) throw rpcError;

            if (existingChatId) {
                return existingChatId;
            }

            // 2. Create new chat
            const { data: newChat, error: chatError } = await supabase
                .from('chats')
                .insert({}) // created_by is handled by default constraint in DB or we can add it explicitly if needed
                .select()
                .single();

            if (chatError) throw chatError;

            // 3. Add participants
            const { error: participantsError } = await supabase
                .from('chat_participants')
                .insert([
                    { chat_id: newChat.id, user_id: user.id },
                    { chat_id: newChat.id, user_id: otherUserId }
                ]);

            if (participantsError) throw participantsError;

            // Refresh the chat list so the new chat (bootstrapped) appears immediately
            // Even if empty, we want to see it in the list or at least have it ready when we send a message
            fetchChats();

            return newChat.id;

        } catch (error) {
            console.error("Error creating chat:", error);
            toast.error("Failed to start chat");
            return null;
        }
    };

    const lastFetchedUser = useRef(null);

    // Effect to fetch chats only when user ID changes
    useEffect(() => {
        if (!user) {
            setChats([]);
            setMessages({});
            lastFetchedUser.current = null;
            return;
        }

        // Only fetch if we haven't fetched for this specific user ID yet
        // This prevents re-fetching when the user object reference changes (e.g. on tab focus/token refresh)
        // unless it's a different user or first load.
        if (lastFetchedUser.current !== user.id) {
            fetchChats(true);
            lastFetchedUser.current = user.id;
        }
    }, [user, fetchChats]);

    // Effect for Realtime Subscription
    useEffect(() => {
        if (!user) return;

        // Subscribe to new messages
        const messageSubscription = supabase
            .channel('public:messages')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
                const newMessage = payload.new;

                // Update messages state if we have it loaded
                setMessages(prev => {
                    const chatMessages = prev[newMessage.chat_id] || [];
                    // Avoid duplicates
                    if (chatMessages.find(m => m.id === newMessage.id)) return prev;
                    return {
                        ...prev,
                        [newMessage.chat_id]: [...chatMessages, newMessage]
                    };
                });

                // Refresh chats list blindly to update previews (fetchChats allows this manual call)
                fetchChats(false);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(messageSubscription);
        };
    }, [user, fetchChats]);

    const value = {
        chats,
        messages,
        loading,
        fetchChats,
        fetchMessages,
        sendMessage,
        createOrGetChat
    };

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
