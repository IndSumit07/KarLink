import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../libs/Supabase';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import { MessageSquare, User, Loader2, ArrowLeft, ShieldCheck, MapPin, Calendar, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';

const PublicProfile = () => {
    const { userId } = useParams(); // Start with lowercase consistent with App.jsx param
    const { user } = useAuth();
    const { createOrGetChat } = useChat();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [chatLoading, setChatLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            console.log("Fetching profile for userId:", userId);
            if (!userId || userId === 'undefined') {
                console.error("Invalid user ID");
                setLoading(false);
                return;
            }

            try {
                // Fetch public profile data
                // Note: RLS must allow reading profiles (usually true for authenticated users)
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', userId)
                    .single();

                if (error) {
                    console.error("Error fetching profile:", error);
                    toast.error("Could not load user profile");
                } else {
                    setProfile(data);
                }
            } catch (err) {
                console.error("Unexpected error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [userId]);

    const handleChat = async () => {
        if (!user) {
            toast.error("Please login to chat");
            return;
        }
        if (user.id === userId) {
            toast.error("You cannot chat with yourself");
            return;
        }

        setChatLoading(true);
        try {
            const chatId = await createOrGetChat(userId);
            if (chatId) {
                navigate('/chats', { state: { chatId } });
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to start chat via profile");
        } finally {
            setChatLoading(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
            <Loader2 className="animate-spin text-orange-600" size={40} />
        </div>
    );

    if (!profile) return (
        <div className="text-center py-20">
            <h2 className="text-xl font-bold text-gray-800">User Not Found</h2>
            <button onClick={() => navigate(-1)} className="mt-4 text-orange-600 hover:underline">Go Back</button>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in zoom-in duration-300">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-orange-600 mb-6 transition-colors font-medium">
                <ArrowLeft size={18} className="mr-2" /> Back
            </button>

            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                {/* Cover Image Placeholder */}
                <div className="h-40 bg-gradient-to-r from-orange-100 via-orange-50 to-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/50 rounded-bl-full -mr-8 -mt-8"></div>
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]"></div>
                </div>

                <div className="px-8 pb-8 relative">
                    <div className="flex flex-col md:flex-row justify-between items-end -mt-12 mb-6 gap-4">
                        <div className="flex items-end gap-6">
                            <div className="w-32 h-32 rounded-full border-[6px] border-white bg-white overflow-hidden shadow-xl shadow-gray-100">
                                {profile.avatar_url ? (
                                    <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300">
                                        <User size={64} />
                                    </div>
                                )}
                            </div>
                            <div className="mb-2 hidden md:block">
                                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                                    {profile.full_name || "Unknown User"}
                                    {/* Simulate Verification if needed later */}
                                    {/* <ShieldCheck size={24} className="text-blue-500 fill-blue-50" /> */}
                                </h1>
                                <p className="text-gray-500 flex items-center gap-2 mt-1">
                                    <Calendar size={14} /> Joined {new Date(profile.updated_at || Date.now()).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                                </p>
                            </div>
                        </div>

                        {user && user.id !== userId && (
                            <button
                                onClick={handleChat}
                                disabled={chatLoading}
                                className="w-full md:w-auto bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:scale-100"
                            >
                                {chatLoading ? <Loader2 size={20} className="animate-spin" /> : <MessageSquare size={20} />}
                                Message
                            </button>
                        )}
                    </div>

                    {/* Mobile Title */}
                    <div className="md:hidden mb-6 text-center">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {profile.full_name || "Unknown User"}
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Joined {new Date(profile.updated_at || Date.now()).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 border-t border-gray-100 pt-8">
                        {/* Info Column */}
                        <div className="space-y-6">
                            <h3 className="font-bold text-gray-900 text-lg">About</h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3 text-gray-600">
                                    <Briefcase size={20} className="text-gray-400 mt-0.5" />
                                    <div>
                                        <span className="block text-sm font-medium text-gray-900">Role</span>
                                        <span className="text-sm">User</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 text-gray-600">
                                    <MapPin size={20} className="text-gray-400 mt-0.5" />
                                    <div>
                                        <span className="block text-sm font-medium text-gray-900">Location</span>
                                        <span className="text-sm">Not specified</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity Placeholder - Could be 'Open RFQs' later */}
                        <div className="md:col-span-2 space-y-6">
                            <h3 className="font-bold text-gray-900 text-lg">Bio</h3>
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                <p className="text-gray-600 leading-relaxed italic">
                                    "No bio provided yet."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicProfile;
