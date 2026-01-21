
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import supabase from '../libs/Supabase';
import { Link } from 'react-router-dom';
import { Loader2, Gavel, IndianRupee, Clock, ArrowRight, User, Package, Filter } from 'lucide-react';

const YourBids = () => {
    const { user } = useAuth();
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, accepted, rejected

    useEffect(() => {
        const fetchBids = async () => {
            if (!user) return;
            setLoading(true);

            try {
                // Fetch all bids placed by the user, including RFQ details and RFQ Owner profile
                const { data, error } = await supabase
                    .from('bids')
                    .select('*, rfqs(*, profiles(full_name, avatar_url, email))')
                    .eq('bidder_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setBids(data || []);
            } catch (error) {
                console.error("Error fetching your bids:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBids();
    }, [user]);

    const filteredBids = bids.filter(bid => {
        if (filter === 'all') return true;
        return bid.status === filter;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'accepted': return 'text-green-600 bg-green-50 border-green-100';
            case 'rejected': return 'text-red-600 bg-red-50 border-red-100';
            default: return 'text-orange-600 bg-orange-50 border-orange-100';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader2 size={40} className="animate-spin text-orange-600" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4 lg:p-8 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                        <Gavel className="text-orange-600" />
                        Your Bids
                    </h1>
                    <p className="text-gray-500">Track all the offers you've made to clients.</p>
                </div>

                {/* Filter Tabs */}
                <div className="flex p-1 bg-gray-100 rounded-xl w-fit">
                    {['all', 'pending', 'accepted'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${filter === f
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {filteredBids.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <Gavel size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No bids found</h3>
                    <p className="text-gray-500 mb-6">You haven't placed any bids matching this filter yet.</p>
                    <Link to="/market" className="inline-flex items-center gap-2 bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200">
                        Browse Market
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filteredBids.map((bid) => (
                        <div key={bid.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                {/* Left: RFQ Info */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wide border ${getStatusColor(bid.status)}`}>
                                            {bid.status}
                                        </span>
                                        <span className="text-gray-400 text-sm flex items-center gap-1">
                                            <Clock size={14} /> {new Date(bid.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                                        <Link to={`/rfq/${bid.rfq_id}`}>
                                            {bid.rfqs?.title || "Unknown RFQ"}
                                        </Link>
                                    </h3>

                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                                        <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                                            <Package size={14} className="text-gray-400" />
                                            <span>Qty: {bid.rfqs?.quantity} {bid.rfqs?.unit}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden">
                                                {(Array.isArray(bid.rfqs?.profiles) ? bid.rfqs.profiles[0] : bid.rfqs?.profiles)?.avatar_url ? (
                                                    <img src={(Array.isArray(bid.rfqs?.profiles) ? bid.rfqs.profiles[0] : bid.rfqs?.profiles).avatar_url} alt="C" className="w-full h-full object-cover" />
                                                ) : (
                                                    <User size={12} className="w-full h-full p-1 text-gray-500" />
                                                )}
                                            </div>
                                            <span>client: {(Array.isArray(bid.rfqs?.profiles) ? bid.rfqs.profiles[0] : bid.rfqs?.profiles)?.full_name || "Trader"}</span>
                                        </div>
                                    </div>

                                    {bid.message && (
                                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm text-gray-600 italic">
                                            "{bid.message}"
                                        </div>
                                    )}
                                </div>

                                {/* Right: Bid Amount & Action */}
                                <div className="flex flex-col items-end justify-between min-w-[150px]">
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500 mb-1">Your Offer</div>
                                        <div className="text-2xl font-bold text-gray-900 flex items-center justify-end">
                                            <IndianRupee size={20} className="text-gray-400 mr-0.5" />
                                            {bid.amount}
                                        </div>
                                    </div>

                                    <Link
                                        to={`/rfq/${bid.rfq_id}`}
                                        className="mt-4 md:mt-0 inline-flex items-center gap-1 text-orange-600 font-bold hover:text-orange-700 transition-colors bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-lg"
                                    >
                                        View RFQ <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default YourBids;
