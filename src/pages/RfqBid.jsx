import React from 'react';
import { useParams } from 'react-router-dom';
import { Gavel, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const RfqBid = () => {
    const { id } = useParams();

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in zoom-in duration-300">
            <Link to={`/rfq/${id}`} className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors mb-6">
                <ArrowLeft size={20} />
                <span>Back to RFQ Details</span>
            </Link>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                        <Gavel size={20} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Place a Bid</h1>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-gray-600 text-center">
                        Placing bid for RFQ ID: <span className="font-mono font-bold text-gray-900">{id}</span>
                    </p>
                    {/* Placeholder content - will be replaced with real form */}
                </div>
            </div>
        </div>
    );
};

export default RfqBid;
