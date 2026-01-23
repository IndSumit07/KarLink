
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useRfq } from '../contexts/RfqContext';
import { useBid } from '../contexts/BidContext';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import { useNavigate } from 'react-router-dom';
import {
    FileText,
    ArrowLeft,
    Calendar,
    Package,
    Tag,
    User,
    Clock,
    IndianRupee,
    Briefcase,
    Loader2,
    Send,
    Gavel,
    TrendingDown,
    MessageSquare
} from 'lucide-react';
import toast from 'react-hot-toast';

const RfqDetails = () => {
    const { id: paramId } = useParams();
    const location = useLocation();
    const id = paramId || location.pathname.split('/')[2];

    const { getRfqById } = useRfq();
    const { createBid, getBidsByRfqId, acceptBid } = useBid();
    const { user } = useAuth();
    const { createOrGetChat } = useChat();
    const navigate = useNavigate();

    const [rfq, setRfq] = useState(null);
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bidLoading, setBidLoading] = useState(false);
    const [bidAmount, setBidAmount] = useState('');
    const [bidMessage, setBidMessage] = useState('');

    const [confirmModal, setConfirmModal] = useState({ show: false, bidId: null });

    const fetchData = useCallback(async () => {
        // We do not set global loading here to avoid full page flicker, just update data
        const rfqRes = await getRfqById(id);
        if (rfqRes.data) {
            setRfq(rfqRes.data);
            if (rfqRes.data.bids) {
                setBids(rfqRes.data.bids);
            }
        }
        setLoading(false);
    }, [id, getRfqById]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleAcceptBid = (bidId) => {
        setConfirmModal({ show: true, bidId });
    };

    const confirmAcceptBid = async () => {
        if (!confirmModal.bidId) return;

        const { error } = await acceptBid(confirmModal.bidId, id);
        if (!error) {
            fetchData();
        }
        setConfirmModal({ show: false, bidId: null });
    };

    const handlePlaceBid = async () => {
        if (!bidAmount) {
            toast.error("Please enter a bid amount");
            return;
        }
        if (parseFloat(bidAmount) <= 0) {
            toast.error("Bid amount must be greater than 0");
            return;
        }

        setBidLoading(true);
        const { data, error } = await createBid({
            rfq_id: id,
            amount: parseFloat(bidAmount),
            message: bidMessage,
            status: 'pending'
        });

        if (data) {
            setBidAmount('');
            setBidMessage('');
            // Refresh bids
            const bidsRes = await getBidsByRfqId(id);
            if (bidsRes.data) {
                setBids(bidsRes.data);
            }
        }
        setBidLoading(false);
    };

    const handleChat = async (targetUserId) => {
        if (!targetUserId || !user) return;
        try {
            const chatId = await createOrGetChat(targetUserId);
            if (chatId) {
                navigate('/chats', { state: { chatId } });
            }
        } catch (error) {
            console.error(error);
            toast.error("Could not start chat");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full min-h-[60vh]">
                <Loader2 size={40} className="animate-spin text-orange-600" />
            </div>
        );
    }

    if (!rfq) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-700">RFQ Not Found</h2>
                <Link to="/market" className="text-orange-600 hover:underline mt-4 inline-block">Back to Market</Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto animate-in fade-in zoom-in duration-300 relative">
            {/* Confirmation Modal */}
            {confirmModal.show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 transform scale-100 animate-in zoom-in-95 duration-200 border border-gray-100">
                        <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4">
                            <Gavel size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Accept this Bid?</h3>
                        <p className="text-gray-500 text-center text-sm mb-6">
                            This action will close the RFQ and notify the bidder. This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setConfirmModal({ show: false, bidId: null })}
                                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmAcceptBid}
                                className="flex-1 px-4 py-2.5 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200"
                            >
                                Accept & Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Link to="/market" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors mb-6">
                <ArrowLeft size={20} />
                <span>Back to Market</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content - Left Side */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-8 -mt-8"></div>
                        {/* Header Section */}
                        <div className="p-6 lg:p-8 border-b border-gray-100 bg-gray-50/50 relative z-10">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-orange-100 text-orange-700">
                                            {rfq.status || 'Open'}
                                        </span>
                                        <span className="text-gray-500 text-sm flex items-center gap-1">
                                            <Clock size={14} /> Posted on {new Date(rfq.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{rfq.title}</h1>
                                    <div className="flex items-center gap-2.5 mt-2 p-2 bg-gray-50 rounded-lg border border-gray-100 w-fit">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 overflow-hidden border border-gray-200 shadow-sm">
                                            {(Array.isArray(rfq.profiles) ? rfq.profiles[0] : rfq.profiles)?.avatar_url ? (
                                                <img src={(Array.isArray(rfq.profiles) ? rfq.profiles[0] : rfq.profiles).avatar_url} alt="User" className="w-full h-full object-cover" />
                                            ) : (
                                                <User size={16} />
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-500">Posted by</span>
                                            <span className="text-sm font-bold text-gray-900 leading-none">{(Array.isArray(rfq.profiles) ? rfq.profiles[0] : rfq.profiles)?.full_name || "Trader"}</span>
                                        </div>
                                        {user && rfq.user_id !== user.id && (
                                            <button
                                                onClick={() => handleChat(rfq.user_id)}
                                                className="ml-2 p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                                title="Chat with Vendor"
                                            >
                                                <MessageSquare size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    <span className="text-sm text-gray-500">Target Budget</span>
                                    <div className="text-2xl font-bold text-gray-900 flex items-center">
                                        {rfq.budget ? (
                                            <>
                                                <IndianRupee size={24} className="text-gray-400 mr-1" />
                                                {rfq.budget}
                                            </>
                                        ) : 'Negotiable'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="p-6 lg:p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                                    <div className="text-orange-600 mb-2"><Tag size={20} /></div>
                                    <div className="text-sm text-gray-500 font-medium">Category</div>
                                    <div className="font-bold text-gray-900 capitalize">{rfq.category || 'General'}</div>
                                </div>
                                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <div className="text-blue-600 mb-2"><Package size={20} /></div>
                                    <div className="text-sm text-gray-500 font-medium">Quantity</div>
                                    <div className="font-bold text-gray-900">{rfq.quantity} {rfq.unit}</div>
                                </div>
                                <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                                    <div className="text-purple-600 mb-2"><Calendar size={20} /></div>
                                    <div className="text-sm text-gray-500 font-medium">Deadline</div>
                                    <div className="font-bold text-gray-900">{new Date(rfq.deadline).toLocaleDateString()}</div>
                                </div>
                                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                                    <div className="text-green-600 mb-2"><FileText size={20} /></div>
                                    <div className="text-sm text-gray-500 font-medium">RFQ ID</div>
                                    <div className="font-bold text-gray-900 text-xs font-mono truncate" title={rfq.id}>{rfq.id.slice(0, 8)}...</div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Briefcase size={20} className="text-gray-400" />
                                    Description & Requirements
                                </h3>
                                <div className="prose prose-orange max-w-none text-gray-600 bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <p className="whitespace-pre-wrap leading-relaxed">{rfq.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Bids */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Place Bid Card */}
                    {user?.id !== rfq.user_id && (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-orange-100/50">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <Gavel size={20} className="text-orange-600" />
                                    Place Your Bid
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">Submit your best offer for this requirement.</p>
                            </div>
                            <div className="p-5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bid Amount (₹)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <IndianRupee size={16} className="text-gray-400" />
                                        </div>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            min="0"
                                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            value={bidAmount}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (!val || parseFloat(val) >= 0) {
                                                    setBidAmount(val);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === '-' || e.key === '+' || e.key === 'e') {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        className="block w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition-colors min-h-[100px] resize-none"
                                        placeholder="Describe your offer, delivery time, etc..."
                                        value={bidMessage}
                                        onChange={(e) => setBidMessage(e.target.value)}
                                    />
                                </div>
                                <button
                                    onClick={handlePlaceBid}
                                    disabled={bidLoading}
                                    className="w-full bg-orange-600 text-white font-bold py-3 rounded-xl hover:bg-orange-700 transition-colors shadow-md shadow-orange-100 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                                    {bidLoading ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Submit Bid
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Recent Bids List */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-6 -mt-6"></div>
                        <div className="p-5 border-b border-gray-100 flex justify-between items-center relative z-10">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <TrendingDown size={20} className="text-blue-600" />
                                Recent Bids
                            </h3>
                            <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">{bids.length}</span>
                        </div>
                        <div className="divide-y divide-gray-50 max-h-[500px] overflow-y-auto custom-scrollbar">
                            {bids.length === 0 ? (
                                <div className="p-8 text-center text-gray-400">
                                    <Gavel size={32} className="mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">No bids yet. Be the first!</p>
                                </div>
                            ) : (
                                bids.map((bid) => (
                                    <div key={bid.id} className={`p-5 transition-colors cursor-default group ${bid.status === 'accepted' ? 'bg-green-50/60' : 'hover:bg-gray-50'}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <Link to={`/profile/${bid.bidder_id || bid.user_id}`} className="group/bidder flex items-center gap-2 hover:opacity-80 transition-opacity">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200 overflow-hidden group-hover/bidder:border-orange-300 transition-colors">
                                                    {(Array.isArray(bid.profiles) ? bid.profiles[0] : bid.profiles)?.avatar_url ? (
                                                        <img src={(Array.isArray(bid.profiles) ? bid.profiles[0] : bid.profiles).avatar_url} alt="Bidder" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <User size={14} />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="text-sm font-bold text-gray-900 group-hover/bidder:text-orange-600 transition-colors">{(Array.isArray(bid.profiles) ? bid.profiles[0] : bid.profiles)?.full_name || "Unknown Bidder"}</div>
                                                        {user && rfq.user_id === user.id && (bid.bidder_id || bid.user_id) !== user.id && (
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault(); // Prevent link navigation
                                                                    e.stopPropagation();
                                                                    handleChat(bid.bidder_id || bid.user_id);
                                                                }}
                                                                className="text-gray-400 hover:text-orange-600 transition-colors"
                                                                title="Message Bidder"
                                                            >
                                                                <MessageSquare size={14} />
                                                            </button>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-gray-400">
                                                        {new Date(bid.created_at).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-gray-900 flex items-center justify-end">
                                                    <IndianRupee size={14} className="text-gray-400 mr-0.5" />
                                                    {bid.amount}
                                                </div>
                                                <div className={`text-xs font-bold uppercase ${bid.status === 'accepted' ? 'text-green-600' : 'text-gray-400'}`}>
                                                    {bid.status}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pl-10">
                                            {bid.message && (
                                                <div className="bg-gray-50 p-3 rounded-lg rounded-tl-none border border-gray-100 text-sm text-gray-600 relative mb-2">
                                                    <p className="line-clamp-2 group-hover:line-clamp-none transition-all">{bid.message}</p>
                                                </div>
                                            )}
                                            {/* Accept Button Logic */}
                                            {user && rfq.user_id === user.id && rfq.status !== 'closed' && bid.status === 'pending' && (
                                                <button
                                                    onClick={() => handleAcceptBid(bid.id)}
                                                    className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-sm ml-auto block"
                                                >
                                                    Accept Bid
                                                </button>
                                            )}
                                            {bid.status === 'accepted' && (
                                                <div className="text-xs text-green-700 font-bold flex items-center gap-1 justify-end mt-1">
                                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                                    Bid Accepted
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RfqDetails;

