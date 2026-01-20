import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRfq } from "../contexts/RfqContext";
import { ShoppingBag, ArrowUpRight, IndianRupee, Clock, User, Tag, Loader2, Plus, Edit, Trash2, X, Save, AlertTriangle } from "lucide-react";
import { toast } from "react-hot-toast";

const YourRfqs = () => {
    const { getUserRfqs, updateRfq, deleteRfq } = useRfq();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // State for Modals
    const [editingRfq, setEditingRfq] = useState(null);
    const [deletingRfqId, setDeletingRfqId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchOrders = async () => {
        setLoading(true);
        const { data, error } = await getUserRfqs();
        if (data) {
            setOrders(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // --- Delete Handlers ---
    const handleDeleteClick = (id) => {
        setDeletingRfqId(id);
    };

    const confirmDelete = async () => {
        if (!deletingRfqId) return;
        setIsDeleting(true);
        const { error } = await deleteRfq(deletingRfqId);
        setIsDeleting(false);
        setDeletingRfqId(null);
        if (!error) {
            // Refresh list
            fetchOrders();
        }
    };

    // --- Edit Handlers ---
    const handleEditClick = (rfq) => {
        setEditingRfq({ ...rfq }); // Create a copy to edit
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingRfq(prev => ({ ...prev, [name]: value }));
    };

    const saveEdit = async (e) => {
        e.preventDefault();
        if (!editingRfq) return;

        const { error } = await updateRfq(editingRfq.id, {
            title: editingRfq.title,
            description: editingRfq.description,
            category: editingRfq.category,
            quantity: editingRfq.quantity,
            unit: editingRfq.unit,
            budget: editingRfq.budget,
            deadline: editingRfq.deadline,
            // Add other fields as necessary
        });

        if (!error) {
            setEditingRfq(null);
            fetchOrders();
        }
    };

    return (
        <div className="max-w-7xl mx-auto relative">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <User className="text-orange-600" />
                        My RFQs
                    </h1>
                    <p className="text-gray-500 mt-1">Manage the requirements you have posted.</p>
                </div>
                <Link to="/rfq/create" className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center gap-2 shadow-sm shadow-orange-200">
                    <Plus size={18} />
                    Post New RFQ
                </Link>
            </div>

            {/* Orders Grid */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 size={40} className="animate-spin text-orange-600" />
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                    <User size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No RFQs Posted Yet</h3>
                    <p className="text-gray-500 mb-6">You haven't posted any requirements yet.</p>
                    <Link to="/rfq/create" className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-700 transition-colors">
                        Post Requirement
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-blue-50 text-blue-700`}>
                                        {order.status || 'Open'}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleEditClick(order)}
                                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Edit RFQ"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(order.id)}
                                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete RFQ"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                                    {order.title}
                                </h3>

                                <div className="flex flex-wrap gap-2 mb-4">
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
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500">Budget</span>
                                        <div className="text-lg font-bold text-gray-900 flex items-center">
                                            {order.budget ? (
                                                <>
                                                    <IndianRupee size={16} className="text-gray-400 mr-0.5" />
                                                    {order.budget}
                                                </>
                                            ) : <span className="text-sm text-gray-400">Negotiable</span>}
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                        <Clock size={12} /> {new Date(order.created_at).toLocaleDateString()}
                                    </span>
                                </div>

                                <Link to={`/rfq/${order.id}`} className="block w-full text-center py-2.5 rounded-xl font-bold text-sm bg-gray-50 text-gray-700 border border-gray-200 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all shadow-sm">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* DELETE CONFIRMATION MODAL */}
            {deletingRfqId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl border border-gray-100">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                                <AlertTriangle size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete RFQ?</h3>
                            <p className="text-gray-500 mb-6 text-sm">
                                Are you sure you want to delete this requirement? This action cannot be undone.
                            </p>
                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={() => setDeletingRfqId(null)}
                                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    disabled={isDeleting}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {editingRfq && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in overflow-y-auto">
                    <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Edit className="text-orange-600" size={20} />
                                Edit RFQ
                            </h2>
                            <button onClick={() => setEditingRfq(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={saveEdit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={editingRfq.title}
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        name="category"
                                        value={editingRfq.category}
                                        onChange={handleEditChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                    >
                                        <option value="textiles">Textiles</option>
                                        <option value="jewelry">Jewelry</option>
                                        <option value="handicrafts">Handicrafts</option>
                                        <option value="leather">Leather</option>
                                        <option value="furniture">Furniture</option>
                                        <option value="others">Others</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget (₹)</label>
                                    <input
                                        type="number"
                                        name="budget"
                                        value={editingRfq.budget}
                                        onChange={handleEditChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={editingRfq.quantity}
                                        onChange={handleEditChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                                    <select
                                        name="unit"
                                        value={editingRfq.unit}
                                        onChange={handleEditChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                    >
                                        <option value="pieces">Pieces</option>
                                        <option value="meters">Meters</option>
                                        <option value="kg">Kg</option>
                                        <option value="sets">Sets</option>
                                        <option value="boxes">Boxes</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                                <input
                                    type="date"
                                    name="deadline"
                                    value={editingRfq.deadline}
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={editingRfq.description}
                                    onChange={handleEditChange}
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 resize-none"
                                    required
                                ></textarea>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setEditingRfq(null)}
                                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-colors flex items-center gap-2 shadow-lg shadow-orange-200"
                                >
                                    <Save size={18} />
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default YourRfqs;
