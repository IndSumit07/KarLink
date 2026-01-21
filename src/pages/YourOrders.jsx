
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import supabase from '../libs/Supabase';
import { Link } from 'react-router-dom';
import { Loader2, Package, IndianRupee, Clock, ArrowRight, CheckCircle, User, Gavel } from 'lucide-react';
import { useOrder } from '../contexts/OrderContext'; // Assuming this hook exists

const YourOrders = () => {
    const { user } = useAuth();
    const { myOrders, fetchMyOrders, loading } = useOrder();
    const [activeTab, setActiveTab] = useState('vendor'); // 'vendor' (Jobs to do) or 'client' (Jobs given)

    useEffect(() => {
        if (user) { // Only fetch if user is logged in
            fetchMyOrders(true);
        }
    }, [fetchMyOrders, user]); // Add user to dependencies to re-fetch if user changes

    if (loading && !myOrders.loaded) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader2 size={40} className="animate-spin text-orange-600" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4 lg:p-8 animate-in fade-in duration-300">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Package size={32} className="text-orange-600" />
                Your Orders
            </h1>
            <p className="text-gray-500 mb-8">Manage your active jobs and purchase orders.</p>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    onClick={() => setActiveTab('vendor')}
                    className={`pb-4 px-6 text-sm font-bold transition-all relative ${activeTab === 'vendor' ? 'text-orange-600' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Jobs to Do (Vendor)
                    {activeTab === 'vendor' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 rounded-t-full"></span>}
                </button>
                <button
                    onClick={() => setActiveTab('client')}
                    className={`pb-4 px-6 text-sm font-bold transition-all relative ${activeTab === 'client' ? 'text-orange-600' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Work Assigned (Client)
                    {activeTab === 'client' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 rounded-t-full"></span>}
                </button>
            </div>

            {/* Vendor Orders List (I am the Seller) */}
            {activeTab === 'vendor' && (
                <section className="animate-in slide-in-from-left-4 duration-300">
                    {/* <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <CheckCircle size={20} className="text-green-600" />
                        My Won Bids (Jobs to do)
                    </h2> */}
                    {myOrders.asVendor.length === 0 ? (
                        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 border border-gray-100">
                                <Gavel size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">No jobs yet</h3>
                            <p className="text-gray-500 mb-6">You haven't won any bids to work on yet.</p>
                            <Link to="/market" className="inline-flex items-center gap-2 bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200">
                                Browse Market
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                            {myOrders.asVendor.map((order) => (
                                <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide mb-2 inline-block 
                                                ${order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                        'bg-blue-100 text-blue-700'}`}>
                                                {order.status.replace('_', ' ')}
                                            </span>
                                            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{order.rfqs?.title || 'Unknown RFQ'}</h3>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <div className="text-xl font-bold text-gray-900 flex items-center justify-end">
                                                <IndianRupee size={18} className="text-gray-400 mr-0.5" />
                                                {order.amount}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 border border-gray-200 overflow-hidden shrink-0">
                                            {order.buyer?.avatar_url ? (
                                                <img src={order.buyer.avatar_url} alt="Client" className="w-full h-full object-cover" />
                                            ) : (
                                                <User size={18} />
                                            )}
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Client</div>
                                            <div className="text-sm font-bold text-gray-900">{order.buyer?.full_name || "Unknown"}</div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-1">
                                            <Clock size={14} /> {new Date(order.created_at).toLocaleDateString()}
                                        </div>
                                        <Link to={`/order/${order.id}/manage`} className="text-orange-600 font-medium hover:underline flex items-center gap-1">
                                            Manage Order <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            )}

            {/* Client Orders List (I am the Buyer) */}
            {activeTab === 'client' && (
                <section className="animate-in slide-in-from-right-4 duration-300">
                    {/* <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Package size={20} className="text-blue-600" />
                        My Confirmed RFQs (Work assigned)
                    </h2> */}
                    {myOrders.asClient.length === 0 ? (
                        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 border border-gray-100">
                                <Package size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">No orders assigned</h3>
                            <p className="text-gray-500 mb-6">You haven't assigned any work to vendors yet.</p>
                            <Link to="/rfq/create" className="inline-flex items-center gap-2 bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200">
                                Create New RFQ
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                            {myOrders.asClient.map((order) => {
                                return (
                                    <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide mb-2 inline-block 
                                                ${order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                        order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                            'bg-blue-100 text-blue-700'}`}>
                                                    {order.status.replace('_', ' ')}
                                                </span>
                                                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{order.rfqs?.title}</h3>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <div className="text-xl font-bold text-gray-900 flex items-center justify-end">
                                                    <IndianRupee size={18} className="text-gray-400 mr-0.5" />
                                                    {order.amount}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 border border-gray-200 overflow-hidden shrink-0">
                                                {order.seller?.avatar_url ? (
                                                    <img src={order.seller.avatar_url} alt="Vendor" className="w-full h-full object-cover" />
                                                ) : (
                                                    <User size={18} />
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Vendor (Karigar)</div>
                                                <div className="text-sm font-bold text-gray-900">{order.seller?.full_name || "Unknown"}</div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-1">
                                                <Clock size={14} /> {new Date(order.created_at).toLocaleDateString()}
                                            </div>
                                            <Link to={`/order/${order.id}`} className="text-orange-600 font-medium hover:underline flex items-center gap-1">
                                                Manage Order <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            )}
        </div>
    );
};

export default YourOrders;
