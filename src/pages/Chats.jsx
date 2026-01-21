
import React, { useEffect, useState, useRef } from 'react';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { Send, Search, MoreVertical, Phone, Video, ArrowLeft, User } from 'lucide-react';

const Chats = () => {
    const { user } = useAuth();
    const location = useLocation();
    const { chats, messages, fetchMessages, sendMessage, loading } = useChat();
    const [selectedChatId, setSelectedChatId] = useState(location.state?.chatId || null);
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const messagesEndRef = useRef(null);
    const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

    const selectedChat = chats.find(c => c.id === selectedChatId);
    const currentMessages = selectedChatId ? (messages[selectedChatId] || []) : [];

    useEffect(() => {
        if (selectedChatId) {
            fetchMessages(selectedChatId);
            setIsMobileChatOpen(true);
            setTimeout(scrollToBottom, 100);
        }
    }, [selectedChatId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [currentMessages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedChatId) return;

        const content = newMessage;
        setNewMessage('');
        await sendMessage(selectedChatId, content);
    };

    const filteredChats = chats.filter(chat =>
        chat.otherUser?.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-[calc(100vh-100px)] bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Chats List Sidebar */}
            <div className={`${selectedChatId && isMobileChatOpen ? 'hidden md:flex' : 'flex'} w-full md:w-80 lg:w-96 flex-col border-r border-gray-200 bg-gray-50/50`}>
                {/* Header */}
                <div className="p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-xs">
                            {chats.length}
                        </div>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                    {loading ? (
                        <div className="text-center py-10 text-gray-400 text-sm">Loading chats...</div>
                    ) : filteredChats.length === 0 ? (
                        <div className="text-center py-10 text-gray-400 text-sm">No conversations found</div>
                    ) : (
                        filteredChats.map(chat => (
                            <div
                                key={chat.id}
                                onClick={() => setSelectedChatId(chat.id)}
                                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${selectedChatId === chat.id ? 'bg-orange-50 border-orange-100 shadow-sm' : 'hover:bg-white hover:shadow-sm border border-transparent'
                                    }`}
                            >
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 border border-gray-100 overflow-hidden">
                                        {chat.otherUser?.avatar_url ? (
                                            <img src={chat.otherUser.avatar_url} alt="User" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-100">
                                                <User size={20} />
                                            </div>
                                        )}
                                    </div>

                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-0.5">
                                        <h3 className="font-bold text-gray-900 truncate">{chat.otherUser?.full_name || 'User'}</h3>
                                        <span className="text-[10px] text-gray-400">
                                            {chat.lastMessage ? new Date(chat.lastMessage.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                        </span>
                                    </div>
                                    <p className={`text-sm truncate ${chat.lastMessage?.is_read === false && chat.lastMessage?.sender_id !== user.id ? 'font-bold text-gray-800' : 'text-gray-500'}`}>
                                        {chat.lastMessage ? (
                                            (chat.lastMessage.sender_id === user.id ? 'You: ' : '') + chat.lastMessage.content
                                        ) : (
                                            <span className="italic text-gray-400">Start a conversation</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Area */}
            {selectedChat ? (
                <div className={`${selectedChatId && isMobileChatOpen ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-white h-full relative`}>
                    {/* Header */}
                    <div className="h-16 border-b border-gray-100 flex items-center justify-between px-4 sticky top-0 bg-white/80 backdrop-blur-md z-10">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setIsMobileChatOpen(false)} className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full">
                                <ArrowLeft size={20} />
                            </button>
                            <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
                                {selectedChat.otherUser?.avatar_url ? (
                                    <img src={selectedChat.otherUser.avatar_url} alt="User" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                                        <User size={18} />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 leading-none">{selectedChat.otherUser?.full_name}</h3>

                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                                <MoreVertical size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4 bg-gray-50/30">
                        {currentMessages.map((msg, index) => {
                            const isMe = msg.sender_id === user?.id;
                            return (
                                <div key={msg.id || index} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 fade-in duration-300`}>
                                    <div className={`max-w-[70%] sm:max-w-[60%] px-5 py-3 rounded-2xl text-sm shadow-sm ${isMe
                                        ? 'bg-gradient-to-br from-orange-600 to-orange-500 text-white rounded-tr-none shadow-orange-100'
                                        : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                                        }`}>
                                        {msg.content}
                                        <div className={`text-[10px] mt-1 text-right ${isMe ? 'text-orange-100/80' : 'text-gray-400'}`}>
                                            {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-2 bg-gray-50 p-1.5 pl-4 rounded-full border border-gray-200 focus-within:border-orange-200 focus-within:ring-4 focus-within:ring-orange-100/50 transition-all shadow-sm">
                            <input
                                type="text"
                                className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-gray-800 placeholder:text-gray-400 py-2"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                style={{ outline: 'none', boxShadow: 'none' }}
                            />
                            <button
                                type="submit"
                                disabled={!newMessage.trim()}
                                className="p-2.5 bg-gradient-to-tr from-orange-600 to-orange-500 text-white rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-orange-200 disabled:opacity-50 disabled:shadow-none disabled:scale-100"
                            >
                                <Send size={18} className="ml-0.5" />
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-gray-50/30">
                    <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-4 animate-pulse">
                        <Send size={40} className="text-orange-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Select a conversation</h3>
                    <p className="text-gray-500 max-w-xs text-center mt-2">Choose a chat from the sidebar to start messaging in real-time.</p>
                </div>
            )}
        </div>
    );
};

export default Chats;
