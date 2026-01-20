import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Calendar, Camera, Save, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import supabase from '../libs/Supabase';

const Profile = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: user?.user_metadata?.full_name || '',
        email: user?.email || '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Update user metadata
            const { error: authError } = await supabase.auth.updateUser({
                data: { full_name: formData.full_name }
            });

            if (authError) throw authError;

            // Update profile table
            const { error: profileError } = await supabase
                .from('profiles')
                .update({ full_name: formData.full_name })
                .eq('id', user.id);

            if (profileError) throw profileError;

            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="max-w-4xl mx-auto relative">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <User className="text-orange-600" />
                    My Profile
                </h1>
                <p className="text-gray-500 mt-1">Manage your personal information and account settings.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column - Avatar Card */}
                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                        <div className="relative group mb-4">
                            {user?.user_metadata?.avatar_url || user?.user_metadata?.picture ? (
                                <img
                                    src={user.user_metadata.avatar_url || user.user_metadata.picture}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-4xl border-4 border-white shadow-lg">
                                    {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0)}
                                </div>
                            )}
                            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Camera className="text-white" size={24} />
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-gray-900">{user?.user_metadata?.full_name || 'User'}</h2>
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wide rounded-full mt-2">
                            <ShieldCheck size={12} /> Verified Member
                        </span>

                        <div className="mt-6 w-full pt-6 border-t border-gray-100 flex flex-col gap-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Joined</span>
                                <span className="font-medium text-gray-900">{formatDate(user?.created_at)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Details Form */}
                <div className="md:col-span-2">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            Personal Details
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="text-gray-400" size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            name="full_name"
                                            value={formData.full_name}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-medium"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="text-gray-400" size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            disabled
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed font-medium"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1.5 ml-1">Email address cannot be changed.</p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2.5 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-colors flex items-center gap-2 shadow-lg shadow-orange-200 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>Saving...</>
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Additional Stats / Info Card could go here */}
                    <div className="mt-6 bg-orange-50 p-6 rounded-2xl border border-orange-100">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-xl shadow-sm text-orange-600">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Account Security</h4>
                                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                    Your account is secured with Google Authentication. We recommend checking your activity regularly.
                                </p>
                                <div className="text-xs font-mono bg-white/50 inline-block px-2 py-1 rounded border border-orange-200 text-orange-800">
                                    User ID: {user?.id}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
