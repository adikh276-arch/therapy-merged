import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Home, MessageSquare, Calendar, CheckSquare, BarChart3, Receipt, Gift, Lightbulb, HelpCircle, X, Menu, ChevronRight, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userString = localStorage.getItem("mantraUser");
  const user = userString ? JSON.parse(userString) : null;
  const userName = user?.name || "User";

  const mainNavItems = [
    { icon: Home,          label: "Home",         path: "/dashboard"    },
    { icon: MessageSquare, label: "Care Team",     path: "/care-team"    },
    { icon: Calendar,      label: "Appointments",  path: "/appointments" },
    { icon: CheckSquare,   label: "Tasks",          path: "/tasks"        },
    { icon: BarChart3,     label: "Insights",       path: "/insights"     },
    { icon: Receipt,       label: "Billing",        path: "/billing"      },
    { icon: UserCircle,    label: "Profile",        path: "/profile"      },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("mantraUser");
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Navigation Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-[#E2ECF5] h-16 flex items-center justify-between px-4 z-50 shadow-sm">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-10 h-10 rounded-lg flex items-center justify-center text-[#64748B] hover:bg-slate-100 transition-colors"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#7C3AED] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-[#020817] font-bold text-lg">MantraCare</span>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden fixed top-0 right-0 bottom-0 w-72 bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#E2ECF5]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#2D9CDB] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-[#020817] font-semibold text-sm">{userName}</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <X size={20} className="text-[#64748B]" />
                </button>
              </div>

              {/* Drawer Nav */}
              <nav className="flex-1 p-3 overflow-y-auto">
                <div className="space-y-1">
                  {mainNavItems.map((navItem) => (
                    <button
                      key={navItem.label}
                      onClick={() => handleNav(navItem.path)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full ${
                        isActive(navItem.path)
                          ? "bg-[#2563EB] text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <navItem.icon size={20} />
                      <span className="text-sm">{navItem.label}</span>
                      <ChevronRight size={16} className={`ml-auto ${isActive(navItem.path) ? "text-white/50" : "text-slate-300"}`} />
                    </button>
                  ))}
                </div>

                <div className="my-3 border-t border-[#E2ECF5]" />

                <button
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left text-[#1E293B] hover:bg-[#E6F4FF]"
                  onClick={() => handleNav("/refer")}
                >
                  <Gift size={20} />
                  <span className="text-sm font-medium">Invite a Friend</span>
                </button>

                <div className="my-3 border-t border-[#E2ECF5]" />

                <div className="space-y-1">
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-[#64748B] hover:bg-[#E6F4FF] hover:text-[#020817]"
                    onClick={() => handleNav("/feedback")}
                  >
                    <Lightbulb size={20} />
                    <span className="text-sm">Share Feedback</span>
                  </button>
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-[#64748B] hover:bg-[#E6F4FF] hover:text-[#020817]"
                    onClick={() => handleNav("/support")}
                  >
                    <HelpCircle size={20} />
                    <span className="text-sm">Support</span>
                  </button>
                </div>
              </nav>

              {/* Logout */}
              <div className="p-3 border-t border-[#E2ECF5]">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#64748B] hover:bg-[#EEF4FF] hover:text-[#020817] transition-colors text-left font-medium"
                >
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
