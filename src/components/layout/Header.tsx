// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Bell, User, LogOut } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { toast } from "sonner";

// export function Header() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("vomsUser");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("vomsUser");
//     toast.success("Logged out successfully");
//     navigate("/");
//   };

//   const getRoleName = (role: string) => {
//     switch(role) {
//       case "fte-lead": return "FTE Lead";
//       case "business-desk": return "Business Desk";
//       case "vendor": return "Vendor";
//       default: return role;
//     }
//   };

//   const getDashboardTitle = () => {
//     if (!user) return "Dashboard";
//     switch(user.role) {
//       case "fte-lead": return "FTE Lead Dashboard";
//       case "business-desk": return "Business Desk Dashboard";
//       case "vendor": return "Vendor Dashboard";
//       default: return "Dashboard";
//     }
//   };

//   const getInitials = (name: string) => {
//     return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
//   };
//   return (
//     <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shadow-material-sm">
//       <div className="flex-1">
//         <h2 className="text-lg font-semibold text-foreground">
//           {getDashboardTitle()}
//         </h2>
//       </div>

//       <div className="flex items-center gap-4">
//         {/* Notifications */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" size="icon" className="relative">
//               <Bell className="h-5 w-5" />
//               <Badge
//                 variant="destructive"
//                 className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
//               >
//                 3
//               </Badge>
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end" className="w-80">
//             <DropdownMenuLabel>Notifications</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem className="flex flex-col items-start py-3">
//               <p className="font-medium text-sm">New Rate Card Submitted</p>
//               <p className="text-xs text-muted-foreground">
//                 Vendor TechSolutions submitted 2 profiles for review
//               </p>
//               <span className="text-xs text-muted-foreground mt-1">
//                 2 hours ago
//               </span>
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem className="flex flex-col items-start py-3">
//               <p className="font-medium text-sm">Interview Scheduled</p>
//               <p className="text-xs text-muted-foreground">
//                 Interview scheduled for John Doe on Jan 20, 2025
//               </p>
//               <span className="text-xs text-muted-foreground mt-1">
//                 5 hours ago
//               </span>
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem className="flex flex-col items-start py-3">
//               <p className="font-medium text-sm">Replacement Request Approved</p>
//               <p className="text-xs text-muted-foreground">
//                 Business Desk approved replacement for V-12345
//               </p>
//               <span className="text-xs text-muted-foreground mt-1">
//                 1 day ago
//               </span>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>

//         {/* Profile */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" size="icon">
//               <Avatar className="h-8 w-8">
//                 <AvatarFallback className="bg-primary text-primary-foreground">
//                   {user ? getInitials(user.name) : "U"}
//                 </AvatarFallback>
//               </Avatar>
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end" className="bg-popover">
//             <DropdownMenuLabel>
//               <div>
//                 <p className="font-medium">{user?.name || "User"}</p>
//                 <p className="text-xs text-muted-foreground">{user ? getRoleName(user.role) : ""}</p>
//               </div>
//             </DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>
//               <User className="mr-2 h-4 w-4" />
//               Profile
//             </DropdownMenuItem>
//             <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
//               <LogOut className="mr-2 h-4 w-4" />
//               Logout
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </header>
//   );
// }

// src/components/layout/Header.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { Bell, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

export function Header() {
  const navigate = useNavigate();
  const { instance } = useMsal();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("vmsUser"); // ← FIXED
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("vmsUser");
    toast.success("Logged out successfully");
    instance.logoutRedirect({ postLogoutRedirectUri: "/" });
  };

  const getRoleName = (role: string) => {
    const map: Record<string, string> = {
      "fte-lead": "FTE Lead",
      "business-desk": "Business Desk",
      "vendor": "Vendor",
    };
    return map[role] || role;
  };

  const getDashboardTitle = () => {
    if (!user) return "Dashboard";
    const map: Record<string, string> = {
      "fte-lead": "FTE Lead Dashboard",
      "business-desk": "Business Desk Dashboard",
      "vendor": "Vendor Dashboard",
    };
    return map[user.role] || "Dashboard";
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shadow-material-sm">
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-foreground">
          {getDashboardTitle()}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start py-3">
              <p className="font-medium text-sm">New Rate Card Submitted</p>
              <p className="text-xs text-muted-foreground">Vendor TechSolutions submitted 2 profiles</p>
              <span className="text-xs text-muted-foreground mt-1">2 hours ago</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user ? getInitials(user.name) : "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover">
            <DropdownMenuLabel>
              <div>
                <p className="font-medium">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground">{user ? getRoleName(user.role) : ""}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}