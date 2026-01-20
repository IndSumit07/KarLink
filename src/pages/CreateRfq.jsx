import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRfq } from '../contexts/RfqContext';
import {
    Send,
    FileText,
    Calendar,
    DollarSign,
    Package,
    Tag,
    AlertCircle,
    Loader2
} from 'lucide-react';

const CreateRfq = () => {
    const navigate = useNavigate();
    const { createRfq, loading } = useRfq();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        quantity: '',
        unit: 'pieces',
        budget: '',
        deadline: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await createRfq(formData);
        if (!error) {
            // Optional: Redirect or clear form.
            // For now, let's redirect to dashboard/market or the detail page of the created item
            navigate('/market');
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in zoom-in duration-300">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 relative overflow-hidden">

                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-bl-full -mr-16 -mt-16 opacity-50 pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                            <FileText size={20} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Create New RFQ</h1>
                    </div>
                    <p className="text-gray-500 mb-8 ml-14">
                        Fill in the details below to submit a Request for Quotation and connect with suppliers.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Title Section */}
                        <div className="space-y-1">
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                                RFQ Title <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-gray-400 font-medium text-gray-900"
                                    placeholder="e.g., Wireless Headphones Bulk Order"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Category & Quantity Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
                                    Category
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Tag size={18} />
                                    </div>
                                    <select
                                        id="category"
                                        name="category"
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all text-gray-900 appearance-none cursor-pointer"
                                        value={formData.category}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>Select Category</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="fashion">Fashion & Apparel</option>
                                        <option value="home_garden">Home & Garden</option>
                                        <option value="industrial">Industrial Machinery</option>
                                        <option value="raw_materials">Raw Materials</option>
                                        <option value="services">Services</option>
                                        <option value="others">Others</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700">
                                    Quantity <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            <Package size={18} />
                                        </div>
                                        <input
                                            type="number"
                                            id="quantity"
                                            name="quantity"
                                            min="1"
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-gray-400 text-gray-900"
                                            placeholder="Amount"
                                            value={formData.quantity}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <select
                                        id="unit"
                                        name="unit"
                                        className="w-32 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all text-gray-900 cursor-pointer"
                                        value={formData.unit}
                                        onChange={handleChange}
                                    >
                                        <option value="pieces">Pieces</option>
                                        <option value="kg">Kg</option>
                                        <option value="liters">Liters</option>
                                        <option value="tons">Tons</option>
                                        <option value="boxes">Boxes</option>
                                        <option value="meters">Meters</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Budget & Deadline Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label htmlFor="budget" className="block text-sm font-semibold text-gray-700">
                                    Target Budget (Optional)
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <DollarSign size={18} />
                                    </div>
                                    <input
                                        type="number"
                                        id="budget"
                                        name="budget"
                                        min="0"
                                        step="0.01"
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-gray-400 text-gray-900"
                                        placeholder="Enter budget amount"
                                        value={formData.budget}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="deadline" className="block text-sm font-semibold text-gray-700">
                                    Submission Deadline <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Calendar size={18} />
                                    </div>
                                    <input
                                        type="date"
                                        id="deadline"
                                        name="deadline"
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all text-gray-900 cursor-pointer placeholder:text-gray-400"
                                        value={formData.deadline}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-1">
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                                Detailed Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows="5"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-gray-400 text-gray-900 resize-none"
                                placeholder="Describe your requirements in detail..."
                                value={formData.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                <AlertCircle size={12} />
                                Be specific about specifications, quality, and other requirements.
                            </p>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 flex items-center justify-end gap-4">
                            <button
                                type="button"
                                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                                onClick={() => setFormData({ // Reset form
                                    title: '',
                                    description: '',
                                    category: '',
                                    quantity: '',
                                    unit: 'pieces',
                                    budget: '',
                                    deadline: ''
                                })}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-3 bg-orange-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-200 hover:bg-orange-700 hover:shadow-orange-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                                {loading ? 'Posting...' : 'Post Request'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateRfq;
