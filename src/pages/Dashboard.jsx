import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
    Home,
    Globe,
    Briefcase,
    LayoutGrid,
    Compass,
    FileSpreadsheet,
    FileText,
    Calendar,
    Trophy,
    ClipboardList,
    User,
    LogOut,
    Menu,
    Sun,
    ChevronRight,
    Info,
    MoreVertical,
    ExternalLink,
    Sparkles,
    PanelLeft
} from "lucide-react";

const Dashboard = () => {
    const { user, signOut } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(true); // For mobile
    const [isCollapsed, setIsCollapsed] = useState(false); // For desktop

    // Sidebar Links Configuration
    const sidebarSection = [
        {
            title: "",
            items: [{ name: "Home", icon: Home, path: "/", active: true }],
        },
        {
            title: "PROFILE TRACKER",
            items: [{ name: "Portfolio", icon: Globe, path: "/portfolio" }],
        },
        {
            title: "QUESTION TRACKER",
            items: [
                { name: "Company Wise Kit", icon: Briefcase, path: "/company-kit" },
                { name: "My Workspace", icon: LayoutGrid, path: "/workspace" },
                { name: "Explore Sheets", icon: Compass, path: "/explore" },
                { name: "My Sheets", icon: FileSpreadsheet, path: "/sheets" },
                { name: "Notes", icon: FileText, path: "/notes" },
            ],
        },
        {
            title: "EVENT TRACKER",
            items: [{ name: "Contests", icon: Calendar, path: "/contests" }],
        },
        {
            title: "COMMUNITY",
            items: [{ name: "Leaderboard", icon: Trophy, path: "/leaderboard" }],
        },
        {
            title: "FEEDBACK",
            items: [{ name: "Form", icon: ClipboardList, path: "/feedback" }],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            {/* Sidebar */}
            <aside
                className={`bg-white border-r border-gray-200 fixed lg:sticky top-0 h-screen z-40 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-all duration-300 ease-in-out flex flex-col ${isCollapsed ? "w-20" : "w-64"}`}
            >
                <div className={`p-4 border-b border-gray-100 flex items-center h-16 ${isCollapsed ? "justify-center" : "justify-between"}`}>
                    <div className="flex items-center gap-2 overflow-hidden">
                        <img src="/logo.png" alt="KarLink" className="w-8 h-8 object-contain shrink-0" />
                        {!isCollapsed && (
                            <h1 className="text-xl font-bold text-gray-900 tracking-tight whitespace-nowrap">
                                Kar<span className="text-orange-600">Link</span>
                            </h1>
                        )}
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className={`lg:hidden text-gray-500 ${isCollapsed ? "hidden" : "block"}`}>
                        <Menu size={20} />
                    </button>
                </div>

                <div className="p-4 space-y-6 flex-1 overflow-y-auto custom-scrollbar overflow-x-hidden">
                    {sidebarSection.map((section, idx) => (
                        <div key={idx}>
                            {section.title && !isCollapsed && (
                                <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 whitespace-nowrap">
                                    {section.title}
                                </p>
                            )}
                            <div className="space-y-0.5">
                                {section.items.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        title={isCollapsed ? item.name : ""}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${item.active
                                            ? "bg-orange-50 text-orange-600"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                            } ${isCollapsed ? "justify-center px-2" : ""}`}
                                    >
                                        <item.icon size={20} className={`shrink-0 ${item.active ? "text-orange-600" : "text-gray-400"}`} />
                                        {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-gray-100 bg-white">
                    <Link
                        to="/profile"
                        title={isCollapsed ? "Edit Profile" : ""}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors ${isCollapsed ? "justify-center px-2" : ""}`}
                    >
                        <User size={20} className="text-gray-400 shrink-0" />
                        {!isCollapsed && <span className="whitespace-nowrap">Edit Profile</span>}
                    </Link>
                    <button
                        onClick={signOut}
                        title={isCollapsed ? "Log Out" : ""}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-1 ${isCollapsed ? "justify-center px-2" : ""}`}
                    >
                        <LogOut size={20} className="shrink-0" />
                        {!isCollapsed && <span className="whitespace-nowrap">Log Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg lg:hidden"
                        >
                            <Menu size={20} />
                        </button>
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="hidden lg:block p-2 -ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <PanelLeft size={20} />
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2">
                            <span className="text-orange-600 font-bold text-xl italic drop-shadow-sm">2025</span>
                        </div>
                        <button className="hidden md:flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                            Company Wise Kit
                            <Sparkles size={14} className="text-yellow-400" />
                        </button>
                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                            <Sun size={20} />
                        </button>
                        {user?.user_metadata?.avatar_url ? (
                            <img
                                src={user.user_metadata.avatar_url}
                                alt="Profile"
                                className="w-9 h-9 rounded-full border border-gray-200"
                            />
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm border border-orange-200">
                                {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0)}
                            </div>
                        )}
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                    <div className="flex flex-col xl:flex-row gap-6">
                        {/* Left Column (Main) */}
                        <div className="flex-1 space-y-6">
                            {/* My Workspace Section */}
                            <div>
                                <div className="flex items-center gap-2 mb-4 group cursor-pointer">
                                    <h2 className="text-lg font-semibold text-gray-900">My Workspace</h2>
                                    <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { label: "Total Questions", value: "0" },
                                        { label: "Completed Questions", value: "0" },
                                        { label: "Starred Questions", value: "0" }
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative group">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-sm text-gray-500">{stat.label}</span>
                                                <Info size={14} className="text-gray-300 cursor-help" />
                                            </div>
                                            <div className="text-3xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">{stat.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Sheets Section */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm min-h-[300px]">
                                <div className="flex items-center gap-6 px-6 py-4 border-b border-gray-100">
                                    <button className="text-sm font-semibold text-gray-900 border-b-2 border-orange-500 pb-4 -mb-4.5">Recent</button>
                                    <button className="text-sm font-medium text-gray-500 hover:text-gray-700 pb-4 -mb-4">Custom Sheets</button>
                                </div>
                                <div className="p-2">
                                    {[
                                        { name: "Untitled Sheet - 1", date: "Viewed Dec 14" },
                                        { name: "Google", date: "Viewed Dec 14" },
                                        { name: "Strivers A2Z DSA Sheet", date: "Viewed Dec 10" }
                                    ].map((sheet, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg group cursor-pointer transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                                                    <FileSpreadsheet size={18} />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{sheet.name}</span>
                                            </div>
                                            <span className="text-xs text-gray-400">{sheet.date}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Topic Analysis */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 min-h-[250px] flex flex-col">
                                <div className="flex items-center gap-2 mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900">Topic Analysis</h2>
                                    <ChevronRight size={16} className="text-gray-400" />
                                </div>
                                <div className="flex-1 flex items-center justify-center text-gray-400 text-sm font-medium">
                                    No topic data available
                                </div>
                            </div>
                        </div>

                        {/* Right Column (Widgets) */}
                        <div className="w-full xl:w-80 space-y-6">
                            {/* Company Wise Sheet Widget */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Company Wise Sheet</h3>
                                        <ChevronRight size={14} className="inline-block ml-1 text-gray-400" />
                                        <p className="text-xs text-gray-500 mt-1">Last Updated: 31/12/2025</p>
                                    </div>
                                </div>

                                <div className="mb-6 p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                                    <div className="flex justify-between items-start">
                                        <span className="text-sm text-gray-500">Total Companies</span>
                                        <Info size={14} className="text-gray-300" />
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900 mt-1">18</div>
                                </div>

                                <div className="space-y-4 relative">
                                    {/* Vertical line connector */}
                                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-200 rounded-full"></div>

                                    {[
                                        { name: "Google", icon: "G", color: "text-red-500" },
                                        { name: "Amazon", icon: "a", color: "text-gray-900" },
                                        { name: "Meta", icon: "∞", color: "text-blue-600" }
                                    ].map((company, i) => (
                                        <div key={i} className="flex items-center gap-3 relative z-10 bg-white">
                                            <span className={`w-6 h-6 flex items-center justify-center font-bold ${company.color} bg-white border border-gray-200 rounded text-sm`}>
                                                {company.icon}
                                            </span>
                                            <span className="text-sm text-gray-600 font-medium">{company.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Extension Promo */}
                            <div className="bg-orange-50 rounded-xl border border-orange-100 p-5">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-medium text-gray-800">Try the Codolio Extension</h3>
                                    <ExternalLink size={16} className="text-gray-400" />
                                </div>
                                <div className="bg-white rounded-lg border border-orange-100 p-2 shadow-sm">
                                    {/* Mockup of extension UI */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                                            <div className="text-[10px] font-bold">Longest Valid Parenthesis</div>
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="h-1.5 w-3/4 bg-gray-100 rounded"></div>
                                            <div className="h-1.5 w-1/2 bg-gray-100 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
