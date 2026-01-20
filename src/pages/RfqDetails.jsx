
import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useRfq } from '../contexts/RfqContext';
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
    Loader2
} from 'lucide-react';

const RfqDetails = () => {
    const { id: paramId } = useParams();
    const location = useLocation();
    // Fallback: If paramId is undefined (due to wildcard routing), extract from URL path
    const id = paramId || location.pathname.split('/')[2];

    const { getRfqById } = useRfq();
    const [rfq, setRfq] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRfq = async () => {
            const { data, error } = await getRfqById(id);
            if (data) {
                setRfq(data);
            }
            setLoading(false);
        };
        fetchRfq();
    }, [id, getRfqById]);

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
        <div className="max-w-4xl mx-auto animate-in fade-in zoom-in duration-300">
            <Link to="/market" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors mb-6">
                <ArrowLeft size={20} />
                <span>Back to Market</span>
            </Link>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Header Section */}
                <div className="p-6 lg:p-8 border-b border-gray-100 bg-gray-50/50">
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

                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Briefcase size={20} className="text-gray-400" />
                            Description & Requirements
                        </h3>
                        <div className="prose prose-orange max-w-none text-gray-600 bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <p className="whitespace-pre-wrap leading-relaxed">{rfq.description}</p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <Link to={`/rfq/${id}/bid`} className="px-8 py-3 bg-orange-600 text-white rounded-xl text-base font-bold shadow-lg shadow-orange-200 hover:bg-orange-700 hover:shadow-orange-300 hover:-translate-y-0.5 transition-all duration-300">
                            Place a Bid
                        </Link>
                    </div>
                </div >
            </div >
        </div >
    );
};

export default RfqDetails;
