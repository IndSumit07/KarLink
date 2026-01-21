
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useOrder } from '../contexts/OrderContext';
import { useAuth } from '../contexts/AuthContext';
import { Loader2, ArrowLeft, Package, User, Save, RefreshCw, MessageSquare, Clock, Hammer, CheckSquare, XCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ManageOrder = ({ orderId }) => {
    // const { id } = useParams(); // useParams won't work with wildcard route setup
    const id = orderId;
    const navigate = useNavigate();
    const { getOrderById, updateOrderStatus } = useOrder();
    const { user } = useAuth();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true);
            const { data } = await getOrderById(id);
            if (data) {
                setOrder(data);
                setStatus(data.status);
                setMessage(data.status_message || '');
            }
            setLoading(false);
        };
        fetchOrder();
    }, [id, getOrderById]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!status) return;

        setSubmitting(true);
        const { error } = await updateOrderStatus(id, status, message);
        setSubmitting(false);

        if (!error) {
            navigate('/your-orders');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader2 size={40} className="animate-spin text-orange-600" />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-700">Order Not Found</h2>
                <Link to="/your-orders" className="text-orange-600 hover:underline mt-4 inline-block">Back to Orders</Link>
            </div>
        );
    }

    // Security check: Only Seller can manage status via this page? 
    // User requested "for vender add a route order/id/manage".
    // Let's assume only seller should access.
    if (user && order.seller_id !== user.id) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-red-600">Unauthorized</h2>
                <p className="text-gray-500">Only the assigned Vendor can manage this order.</p>
                <Link to={`/order/${id}`} className="text-orange-600 hover:underline mt-4 inline-block">View Order Details</Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-300 p-4 lg:p-8">
            <Link to="/your-orders" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors mb-6">
                <ArrowLeft size={20} />
                <span>Back to Orders</span>
            </Link>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
                <div className="p-6 bg-orange-600 text-white">
                    <h1 className="text-2xl font-bold flex items-center gap-3">
                        <RefreshCw size={24} />
                        Manage Order Status
                    </h1>
                    <p className="text-orange-100 mt-1">Update progress and communicate with the client.</p>
                </div>

                <div className="p-6 md:p-8">
                    {/* Order Summary */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-8 flex items-start gap-4">
                        <div className="bg-white p-2 rounded-lg border border-gray-200 text-orange-600">
                            <Package size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">{order.rfqs?.title}</h3>
                            <div className="text-sm text-gray-600 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                                <span>Quantity: <strong>{order.rfqs?.quantity} {order.rfqs?.unit}</strong></span>
                                <span>Client: <strong>{order.buyer?.full_name}</strong></span>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Status Selection */}
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-3">Update Stage</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { id: 'pending', label: 'Pending', icon: <Clock size={20} />, desc: 'Order initialized, waiting for action.' },
                                    { id: 'in_progress', label: 'In Progress', icon: <Hammer size={20} />, desc: 'Work has started on the order.' },
                                    { id: 'completed', label: 'Completed', icon: <CheckSquare size={20} />, desc: 'Order delivered and finished.' },
                                    { id: 'cancelled', label: 'Cancelled', icon: <XCircle size={20} />, desc: 'Order was stopped.' }
                                ].map((option) => (
                                    <label
                                        key={option.id}
                                        className={`
                                            relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-gray-50
                                            ${status === option.id
                                                ? 'border-orange-500 bg-orange-50/50 ring-1 ring-orange-500/20'
                                                : 'border-gray-200 hover:border-orange-200'
                                            }
                                        `}
                                    >
                                        <input
                                            type="radio"
                                            name="status"
                                            value={option.id}
                                            checked={status === option.id}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="sr-only"
                                        />
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 
                                            ${status === option.id ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}>
                                            {option.icon}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">{option.label}</div>
                                            <div className="text-xs text-gray-500 mt-1 leading-snug">{option.desc}</div>
                                        </div>
                                        {status === option.id && (
                                            <div className="absolute top-4 right-4 text-orange-600">
                                                <div className="w-3 h-3 rounded-full bg-orange-600 shadow-sm"></div>
                                            </div>
                                        )}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Status Message */}
                        <div>
                            <label className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <MessageSquare size={16} />
                                Status Update Message
                            </label>
                            <p className="text-xs text-gray-500 mb-2">Provide details about the current status or any notes for the client.</p>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="e.g., 'Materials procured, starting production tomorrow.' or 'Order shipped via Courier XYZ...'"
                                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all min-h-[120px]"
                            ></textarea>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-4 flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/your-orders')}
                                className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex-1 bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Save size={20} />
                                        Update Order
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ManageOrder;
