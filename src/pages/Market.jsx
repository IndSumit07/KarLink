import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRfq } from "../contexts/RfqContext";
import { Search, Filter, ShoppingBag, ArrowUpRight, IndianRupee, Clock, User, Tag, Loader2 } from "lucide-react";

const Market = () => {
    const { getRfqs } = useRfq();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const { data, error } = await getRfqs();
            if (data) {
                setOrders(data);
            }
            setLoading(false);
        };
        fetchOrders();
    }, []);


    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <ShoppingBag className="text-orange-600" />
                        Karigar Marketplace
                    </h1>
                    <p className="text-gray-500 mt-1">Connect with wholesalers, manufacturers, and skilled labor.</p>
                </div>
                <Link to="/rfq/create" className="bg-white text-gray-700 border border-gray-200 px-4 py-2 rounded-lg font-medium hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-colors flex items-center gap-2 shadow-sm">
                    <ArrowUpRight size={18} />
                    Post Requirement
                </Link>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search for materials, job work, or karigars..."
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 shadow-sm transition-all"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors bg-white shadow-sm text-gray-700 font-medium">
                    <Filter size={18} className="text-gray-500" />
                    Filters
                </button>
            </div>

            {/* Orders Grid */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 size={40} className="animate-spin text-orange-600" />
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                    <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No RFQs Found</h3>
                    <p className="text-gray-500 mb-6">Be the first to post a requirement in the marketplace.</p>
                    <Link to="/rfq/create" className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-700 transition-colors">
                        Post Requirement
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-orange-100/40 transition-all duration-300 group flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-blue-50 text-blue-700`}>
                                        {/* Since we don't have 'type' in DB yet, using generic or derived */}
                                        RFQ
                                    </span>
                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                        <Clock size={12} /> {new Date(order.created_at).toLocaleDateString()}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
                                    {order.title}
                                </h3>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {/* Using category as tag */}
                                    {order.category && (
                                        <span className="text-xs bg-gray-50 text-gray-600 px-2.5 py-1 rounded-md border border-gray-100 flex items-center gap-1">
                                            <Tag size={10} className="text-gray-400" /> {order.category}
                                        </span>
                                    )}
                                    <span className="text-xs bg-gray-50 text-gray-600 px-2.5 py-1 rounded-md border border-gray-100 flex items-center gap-1">
                                        Details: {order.quantity} {order.unit}
                                    </span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-50 mt-2">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 overflow-hidden border border-gray-200 shrink-0">
                                            {(Array.isArray(order.profiles) ? order.profiles[0] : order.profiles)?.avatar_url ? (
                                                <img src={(Array.isArray(order.profiles) ? order.profiles[0] : order.profiles).avatar_url} alt="User" className="w-full h-full object-cover" />
                                            ) : (
                                                <User size={14} />
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="truncate max-w-[120px] font-medium text-gray-900" title={(Array.isArray(order.profiles) ? order.profiles[0] : order.profiles)?.full_name}>
                                                {(Array.isArray(order.profiles) ? order.profiles[0] : order.profiles)?.full_name || "Trader"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-lg font-bold text-gray-900 flex items-center">
                                        {order.budget ? (
                                            <>
                                                <IndianRupee size={16} className="text-gray-400 mr-0.5" />
                                                {order.budget}
                                            </>
                                        ) : <span className="text-sm text-gray-400">Negotiable</span>}
                                    </div>
                                </div>

                                <Link to={`/rfq/${order.id}`} className="block w-full text-center py-2.5 rounded-xl font-bold text-sm bg-white text-gray-700 border border-gray-200 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all shadow-sm">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Market;
