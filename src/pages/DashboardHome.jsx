import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
    Sparkles,
    ChevronRight,
    Compass,
    Globe,
    Briefcase,
    Trophy
} from "lucide-react";

const DashboardHome = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-7xl mx-auto">
            {/* Welcome Hero Section */}
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-xl shadow-orange-50/50 relative overflow-hidden mb-10">


                <div className="relative z-10 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-wider mb-6">
                        <Sparkles size={14} />
                        Welcome Back
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                        Hello, {user?.user_metadata?.full_name?.split(' ')[0] || "Trader"}! <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
                            Ready to Grow?
                        </span>
                    </h1>

                    <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
                        Kar<span className="text-orange-600 font-bold">Link</span> helps you to connect with others and grow your business!
                        Start your journey with us today.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/workspace"
                            className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-orange-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-orange-200 hover:bg-orange-700 hover:shadow-orange-300 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Go to Workspace
                            <ChevronRight size={18} />
                        </Link>
                        <Link
                            to="/explore"
                            className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-xl font-bold text-sm hover:bg-white hover:border-gray-300 transition-all duration-300"
                        >
                            Explore Market
                            <Compass size={18} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <Link to="/rfq/create" className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Briefcase size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Create RFQ</h3>
                        <p className="text-gray-500 text-sm mb-4">Submit a Request for Quotation to get the best deals for your needs.</p>
                        <span className="text-blue-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                            Create <ChevronRight size={16} />
                        </span>
                    </div>
                </Link>

                {/* Card 2 */}
                <Link to="/rfq" className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <Compass size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">See RFQ</h3>
                        <p className="text-gray-500 text-sm mb-4">View active Request for Quotations and find new opportunities.</p>
                        <span className="text-purple-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                            Browse <ChevronRight size={16} />
                        </span>
                    </div>
                </Link>

                {/* Card 3 */}
                <Link to="/portfolio" className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:bg-green-600 group-hover:text-white transition-colors">
                            <Trophy size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Check Portfolio</h3>
                        <p className="text-gray-500 text-sm mb-4">Keep track of your projects, submissions, and trading history.</p>
                        <span className="text-green-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                            View Portfolio <ChevronRight size={16} />
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default DashboardHome;
