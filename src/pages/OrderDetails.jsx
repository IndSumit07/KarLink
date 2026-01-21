
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrder } from '../contexts/OrderContext';
import { useAuth } from '../contexts/AuthContext';
import { Loader2, ArrowLeft, Package, User, MapPin, Calendar, IndianRupee, MessageSquare, CheckCircle, Truck, AlertCircle, RefreshCw } from 'lucide-react';

const OrderDetails = ({ orderId }) => {
    // const { id } = useParams();
    const id = orderId;
    const { getOrderById, updateOrderStatus, loading: updateLoading } = useOrder();
    const { user } = useAuth();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const { data } = await getOrderById(id);
        if (data) setOrder(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [id, getOrderById]);

    const handleStatusChange = async (newStatus) => {
        await updateOrderStatus(id, newStatus);
        fetchData();
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

    const isBuyer = user?.id === order.buyer_id;
    const isSeller = user?.id === order.seller_id;

    // Define steps for a simple progress bar
    const steps = ['pending', 'in_progress', 'completed'];
    const currentStepIndex = steps.indexOf(order.status) === -1 && order.status === 'cancelled' ? -1 : steps.indexOf(order.status);

    return (
        <div className="max-w-5xl mx-auto animate-in fade-in duration-300 p-4 lg:p-8">
            <Link to="/your-orders" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors mb-6">
                <ArrowLeft size={20} />
                <span>Back to Orders</span>
            </Link>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide 
                                ${order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                    order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                        'bg-blue-100 text-blue-700'}`}>
                                {order.status.replace('_', ' ')}
                            </span>
                            <span className="text-gray-500 text-sm">Order ID: #{order.id.slice(0, 8)}</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{order.rfqs?.title}</h1>
                        <p className="text-gray-500 flex items-center gap-2">
                            <Calendar size={16} /> Created on {new Date(order.created_at).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-500 mb-1">Agreed Amount</div>
                        <div className="text-3xl font-bold text-gray-900 flex items-center md:justify-end">
                            <IndianRupee size={24} className="text-gray-400 mr-1" />
                            {order.amount}
                        </div>
                    </div>
                </div>

                {/* Progress Bar (Only if not cancelled) */}
                {order.status !== 'cancelled' && (
                    <div className="px-8 py-8 border-b border-gray-100 bg-white">
                        <div className="relative max-w-3xl mx-auto">
                            {/* Background Line */}
                            <div className="absolute top-4 left-0 w-full h-1 bg-gray-100 rounded-full -z-0"></div>

                            {/* Active Line */}
                            <div
                                className="absolute top-4 left-0 h-1 bg-green-500 rounded-full -z-0 transition-all duration-700 ease-out"
                                style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                            ></div>

                            <div className="flex justify-between relative z-10 w-full">
                                {steps.map((step, idx) => {
                                    const isCompleted = idx <= currentStepIndex;
                                    const isCurrent = idx === currentStepIndex;
                                    const Icon = idx === 0 ? AlertCircle : idx === 1 ? Truck : CheckCircle;

                                    return (
                                        <div key={step} className="flex flex-col items-center gap-3 w-24">
                                            <div className={`
                                                w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-500 bg-white
                                                ${isCompleted
                                                    ? 'border-green-500 text-green-600 shadow-md shadow-green-100 scale-110'
                                                    : 'border-gray-200 text-gray-300'
                                                }
                                                ${isCurrent ? 'ring-4 ring-green-100' : ''}
                                            `}>
                                                <Icon size={isCompleted ? 18 : 16} strokeWidth={2.5} />
                                            </div>
                                            <span className={`
                                                text-xs font-bold uppercase tracking-wider transition-colors duration-300
                                                ${isCompleted ? 'text-green-600' : 'text-gray-400'}
                                            `}>
                                                {step.replace('_', ' ')}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    <div className="p-6 md:p-8 col-span-2">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Package className="text-orange-600" size={20} />
                            Order Details
                        </h3>
                        <div className="space-y-4 text-gray-600">
                            <p className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                {order.rfqs?.description}
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Quantity</span>
                                    <span className="block font-medium text-gray-900">{order.rfqs?.quantity} {order.rfqs?.unit}</span>
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Original Deadline</span>
                                    <span className="block font-medium text-gray-900">{new Date(order.rfqs?.deadline).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-8 bg-gray-50/30">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <User className="text-blue-600" size={20} />
                            {isBuyer ? 'Vendor Details' : 'Client Details'}
                        </h3>
                        {/* Show Counterparty Profile */}
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto rounded-full bg-white border-2 border-gray-200 overflow-hidden mb-3">
                                {isBuyer ? (
                                    order.seller?.avatar_url ? <img src={order.seller.avatar_url} className="w-full h-full object-cover" /> : <User className="w-full h-full p-4 text-gray-300" />
                                ) : (
                                    order.buyer?.avatar_url ? <img src={order.buyer.avatar_url} className="w-full h-full object-cover" /> : <User className="w-full h-full p-4 text-gray-300" />
                                )}
                            </div>
                            <h4 className="text-lg font-bold text-gray-900">
                                {isBuyer ? order.seller?.full_name : order.buyer?.full_name}
                            </h4>
                            <p className="text-sm text-gray-500 mb-4">
                                {isBuyer ? order.seller?.email : order.buyer?.email}
                            </p>
                            <button className="text-sm border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors w-full flex items-center justify-center gap-2">
                                <MessageSquare size={16} /> Send Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions Panel */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <RefreshCw className="text-green-600" size={20} />
                    Status Management
                </h3>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500">
                        Current Status: <strong className="text-gray-900 uppercase">{order.status.replace('_', ' ')}</strong>
                        {order.status_message && (
                            <p className="mt-1 text-gray-500 italic">" {order.status_message} "</p>
                        )}
                    </div>

                    <div className="flex gap-3">
                        {/* Only allow status changes if not cancelled/completed, or if re-opening is needed (business logic varies) */}
                        {order.status !== 'cancelled' && order.status !== 'completed' && (
                            <>
                                {order.status === 'pending' && (
                                    <button
                                        onClick={() => handleStatusChange('in_progress')}
                                        disabled={updateLoading}
                                        className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-70"
                                    >
                                        Mark In Progress
                                    </button>
                                )}
                                {order.status === 'in_progress' && (
                                    <button
                                        onClick={() => handleStatusChange('completed')}
                                        disabled={updateLoading}
                                        className="bg-green-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-200 disabled:opacity-70"
                                    >
                                        Mark Completed
                                    </button>
                                )}
                                <button
                                    onClick={() => handleStatusChange('cancelled')}
                                    disabled={updateLoading}
                                    className="bg-red-50 text-red-600 border border-red-100 px-5 py-2.5 rounded-xl font-bold hover:bg-red-100 transition-colors disabled:opacity-70"
                                >
                                    Cancel Order
                                </button>
                            </>
                        )}
                        {order.status === 'completed' && (
                            <div className="text-green-600 font-bold flex items-center gap-2">
                                <CheckCircle /> Order Fulfilled
                            </div>
                        )}
                        {order.status === 'cancelled' && (
                            <div className="text-red-600 font-bold flex items-center gap-2">
                                <AlertCircle /> Order Cancelled
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
