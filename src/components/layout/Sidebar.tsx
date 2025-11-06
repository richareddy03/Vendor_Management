import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import {
  LayoutDashboard,
  UserPlus,
  RefreshCw,
  UserMinus,
  FileText,
  Calendar,
  CheckCircle,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const fteMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Onboarding Request", url: "/onboarding", icon: UserPlus },
  { title: "Replacement Request", url: "/replacement", icon: RefreshCw },
  { title: "Offboarding Request", url: "/offboarding", icon: UserMinus },
  { title: "Spend Summary", url: "/rate-card", icon: FileText },
  { title: "Interviews Calendar", url: "/interview", icon: Calendar },
];

const businessDeskMenuItems = [
  { title: "Dashboard", url: "/business-dashboard", icon: LayoutDashboard },
  { title: "Approval Inbox", url: "/approval-inbox", icon: CheckCircle },
];

const vendorMenuItems = [
  { title: "Dashboard", url: "/vendor-dashboard", icon: LayoutDashboard },
  { title: "Confirmation to FTE", url: "/vendor-confirmation", icon: CheckCircle },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState("fte-lead");
  const navigate = useNavigate();
  const { instance } = useMsal();

  useEffect(() => {
    const storedUser = localStorage.getItem("vmsUser"); // ← FIXED
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserRole(user.role);
    }
  }, []);

  const menuItems =
    userRole === "business-desk"
      ? businessDeskMenuItems
      : userRole === "vendor"
      ? vendorMenuItems
      : fteMenuItems;

const handleLogout = async () => {
  localStorage.removeItem("vmsUser");
  sessionStorage.setItem("justLoggedOut", "true");
  toast.success("Logged out successfully", { duration: 1000 });

  const account = instance.getActiveAccount();

  if (account) {
    try {
      await instance.logoutPopup({
        account,
        postLogoutRedirectUri: "/",
      });
    } catch {
      instance.logoutRedirect({
        account,
        postLogoutRedirectUri: "/",
      });
    }
  }

  // CLEAR MSAL CACHE
  sessionStorage.clear(); // ← CRITICAL: Removes all MSAL tokens
  localStorage.removeItem("msal.interaction.status");

  // Force redirect
  window.location.href = "/"; // ← Use window.location to bypass React Router cache
};

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 px-6 border-b border-sidebar-border">
            <h1 className="text-xl font-bold text-sidebar-foreground">VOMS</h1>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {menuItems.map((item) => (
                <li key={item.url}>
                  <NavLink
                    to={item.url}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-base",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-primary"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                      )
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 w-full text-left"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}