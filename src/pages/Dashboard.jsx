import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Market from "./Market";
import DashboardHome from "./DashboardHome";
import CreateRfq from "./CreateRfq";
import RfqDetails from "./RfqDetails";
import RfqBid from "./RfqBid";
import YourRfqs from "./YourRfqs";
import Profile from "./Profile";
import YourOrders from "./YourOrders";
import YourBids from "./YourBids";
import OrderDetails from "./OrderDetails";
import ManageOrder from "./ManageOrder";
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
  PanelLeft,
  ShoppingBag,
  Package,
  Gavel
} from "lucide-react";

const Dashboard = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile
  const [isCollapsed, setIsCollapsed] = useState(false); // For desktop
  const navigate = useNavigate();

  const logout = () => {
    signOut();
    navigate("/");
  };

  // Sidebar Links Configuration
  const sidebarSection = [
    {
      title: "",
      items: [{ name: "Home", icon: Home, path: "/" }],
    },
    {
      title: "KARLINK TOOLS",
      items: [
        { name: "Market", icon: ShoppingBag, path: "/market" },
        { name: "Create RFQ", icon: Briefcase, path: "/rfq/create" },
      ],
    },
    {
      title: "YOUR ACTIVITY",
      items: [
        { name: "Your RFQs", icon: FileText, path: "/your-rfqs" },
        { name: "Your Bids", icon: Gavel, path: "/your-bids" },
        { name: "Your Orders", icon: Package, path: "/your-orders" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 fixed xl:sticky top-0 h-screen z-40 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } xl:translate-x-0 transition-all duration-300 ease-in-out flex flex-col ${isCollapsed ? "w-20" : "w-64"
          }`}
      >
        <div
          className={`p-4 border-b border-gray-100 flex items-center h-16 ${isCollapsed ? "justify-center" : "justify-between"
            }`}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <img
              src="/logo.png"
              alt="KarLink"
              className="w-12 h-12 object-contain shrink-0"
            />
            {!isCollapsed && (
              <h1 className="text-xl font-bold text-gray-900 tracking-tight whitespace-nowrap">
                Kar<span className="text-orange-600">Link</span>
              </h1>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className={`xl:hidden text-gray-500 ${isCollapsed ? "hidden" : "block"
              }`}
          >
            <PanelLeft size={20} />
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
                {section.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      title={isCollapsed ? item.name : ""}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                        ? "bg-orange-50 text-orange-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        } ${isCollapsed ? "justify-center px-2" : ""}`}
                    >
                      <item.icon
                        size={20}
                        className={`shrink-0 ${isActive ? "text-orange-600" : "text-gray-400"
                          }`}
                      />
                      {!isCollapsed && (
                        <span className="whitespace-nowrap">{item.name}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-100 bg-white">
          <Link
            to="/profile"
            onClick={() => setSidebarOpen(false)}
            title={isCollapsed ? "Edit Profile" : ""}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors ${isCollapsed ? "justify-center px-2" : ""
              }`}
          >
            <User size={20} className="text-gray-400 shrink-0" />
            {!isCollapsed && (
              <span className="whitespace-nowrap">Edit Profile</span>
            )}
          </Link>
          <button
            onClick={logout}
            title={isCollapsed ? "Log Out" : ""}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-1 ${isCollapsed ? "justify-center px-2" : ""
              }`}
          >
            <LogOut size={20} className="shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">Log Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 xl:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg xl:hidden"
            >
              <PanelLeft size={20} />
            </button>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden xl:block p-2 -ml-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <PanelLeft size={20} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/rfq/create" className="hidden md:flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors shadow-md shadow-orange-200">
              Create RFQ
              <Sparkles size={14} className="text-orange-100" />
            </Link>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Sun size={20} />
            </button>
            <Link to="/profile" className="block">
              {user?.user_metadata?.avatar_url || user?.user_metadata?.picture ? (
                <img
                  src={
                    user.user_metadata.avatar_url || user.user_metadata.picture
                  }
                  alt="Profile"
                  className="w-9 h-9 rounded-full border border-gray-200 cursor-pointer hover:border-orange-400 transition-all"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm border border-orange-200 cursor-pointer hover:border-orange-400 transition-all">
                  {user?.user_metadata?.full_name?.charAt(0) ||
                    user?.email?.charAt(0)}
                </div>
              )}
            </Link>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 xl:p-8 overflow-y-auto">
          {(() => {
            if (location.pathname === "/market") return <Market />;
            if (location.pathname === "/rfq/create") return <CreateRfq />;
            if (location.pathname === "/profile") return <Profile />;
            if (location.pathname === "/your-rfqs") return <YourRfqs />;
            if (location.pathname === "/your-bids") return <YourBids />;
            if (location.pathname === "/your-orders") return <YourOrders />;
            // Check for Review RFQ route (rfq/:id) but not create or bid
            // Using a simple regex to check if it matches /rfq/something, excluding /rfq/create
            // and checking it doesn't end in /bid
            const isRfqDetail = /^\/rfq\/[^/]+$/.test(location.pathname) && location.pathname !== "/rfq/create";
            if (isRfqDetail) return <RfqDetails />;

            // Check for Bid route (rfq/:id/bid)
            const isRfqBid = /^\/rfq\/[^/]+\/bid$/.test(location.pathname);
            if (isRfqBid) return <RfqBid />;

            // Check for Manage Order route (order/:id/manage)
            const manageOrderMatch = location.pathname.match(/^\/order\/([^/]+)\/manage$/);
            if (manageOrderMatch) return <ManageOrder orderId={manageOrderMatch[1]} />;

            // Check for Order Details route (order/:id)
            const orderDetailsMatch = location.pathname.match(/^\/order\/([^/]+)$/);
            if (orderDetailsMatch) return <OrderDetails orderId={orderDetailsMatch[1]} />;

            return <DashboardHome />;
          })()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
