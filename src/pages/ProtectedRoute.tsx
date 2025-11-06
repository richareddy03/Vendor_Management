
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = localStorage.getItem("vmsUser");

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const parsed = JSON.parse(user);
    const roleToDashboard: Record<string, string> = {
      "vendor": "/vendor-dashboard",
      "fte-lead": "/dashboard",
      "business-desk": "/business-dashboard",
    };

    const expected = roleToDashboard[parsed.role] || "/dashboard";

    // Only redirect if on root OR on wrong dashboard
    const isOnDashboard = [
      "/dashboard",
      "/vendor-dashboard",
      "/business-dashboard"
    ].includes(location.pathname);

    if (location.pathname === "/" || (!isOnDashboard && location.pathname === expected)) {
      navigate(expected, { replace: true });
    }
  }, [user, navigate, location.pathname]);

  if (!user) return null;

  return <>{children}</>;
}