// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "sonner";

// export default function Login() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [error, setError] = useState("");

//   const handleAzureLogin = () => {
//     // Mock Azure AD login flow
//     const mockUser = {
//       username: "azureuser",
//       role: "fte-lead",
//       name: "Azure User"
//     };
//     localStorage.setItem("vomsUser", JSON.stringify(mockUser));
//     toast.success("Redirecting to Azure AD Sign-In...");
//     setTimeout(() => {
//       navigate("/dashboard");
//     }, 1500);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     if (!username || !password || !role) {
//       setError("All fields are required");
//       return;
//     }

//     // Mock validation - accept any username/password for demo
//     const user = {
//       username,
//       role,
//       name: username.charAt(0).toUpperCase() + username.slice(1)
//     };
//     localStorage.setItem("vomsUser", JSON.stringify(user));
//     toast.success("Login successful!");
//     navigate("/dashboard");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/10 p-4">
//       <Card className="w-full max-w-md shadow-material-lg">
//         <CardHeader className="space-y-2 text-center">
//           <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
//             <span className="text-2xl font-bold text-primary-foreground">V</span>
//           </div>
//           <CardTitle className="text-2xl">Vendor Onboarding Management</CardTitle>
//           <CardDescription>Sign in to access your VOMS dashboard</CardDescription>
//         </CardHeader>

//         <CardContent className="space-y-6">
//           {/* Azure AD Login */}
//           <Button
//             type="button"
//             variant="outline"
//             className="w-full h-12 text-base border-2 hover:bg-accent"
//             onClick={handleAzureLogin}
//           >
//             <svg className="mr-2 h-5 w-5" viewBox="0 0 23 23" fill="none">
//               <path d="M0 0h10.76v10.76H0zm12.24 0H23v10.76H12.24zM0 12.24h10.76V23H0zm12.24 0H23V23H12.24z" fill="#F25022"/>
//               <path d="M12.24 0H23v10.76H12.24z" fill="#7FBA00"/>
//               <path d="M0 12.24h10.76V23H0z" fill="#00A4EF"/>
//               <path d="M12.24 12.24H23V23H12.24z" fill="#FFB900"/>
//             </svg>
//             Sign in with Microsoft Azure AD
//           </Button>

//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <span className="w-full border-t border-border" />
//             </div>
//             <div className="relative flex justify-center text-xs uppercase">
//               <span className="bg-card px-2 text-muted-foreground">Or continue with credentials</span>
//             </div>
//           </div>

//           {/* Manual Login Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {error && (
//               <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
//                 {error}
//               </div>
//             )}

//             <div className="space-y-2">
//               <Label htmlFor="username">Username</Label>
//               <Input
//                 id="username"
//                 type="text"
//                 placeholder="Enter your username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 aria-label="Username"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 aria-label="Password"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="role">Role</Label>
//               <Select value={role} onValueChange={setRole}>
//                 <SelectTrigger id="role" aria-label="Select role">
//                   <SelectValue placeholder="Select your role" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-popover">
//                   <SelectItem value="fte-lead">FTE Lead / Manager</SelectItem>
//                   <SelectItem value="business-desk">Business Desk</SelectItem>
//                   <SelectItem value="vendor">Vendor</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <Button type="submit" className="w-full">
//               Sign In
//             </Button>
//           </form>
//         </CardContent>

//         <CardFooter className="flex flex-col space-y-2 text-sm text-center">
//           <a href="#" className="text-primary hover:underline">
//             Forgot Password?
//           </a>
//           <a href="#" className="text-muted-foreground hover:text-foreground">
//             Contact Admin for Support
//           </a>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleAzureLogin = () => {
    // Mock Azure AD login flow
    const mockUser = {
      username: "azureuser",
      role: "fte-lead",
      name: "VMS User"
    };
    localStorage.setItem("vomsUser", JSON.stringify(mockUser));
    toast.success("Redirecting to Azure AD Sign-In...");
    setTimeout(() => {
      const destination = mockUser.role === "business-desk" ? "/business-dashboard" :
                         mockUser.role === "vendor" ? "/vendor-dashboard" : "/dashboard";
      navigate(destination);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password || !role) {
      setError("All fields are required");
      return;
    }

    // Mock validation - accept any username/password for demo
    const user = {
      username,
      role,
      name: username.charAt(0).toUpperCase() + username.slice(1)
    };
    localStorage.setItem("vomsUser", JSON.stringify(user));
    toast.success("Login successful!");
    const destination = role === "business-desk" ? "/business-dashboard" :
                       role === "vendor" ? "/vendor-dashboard" : "/dashboard";
    navigate(destination);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/10 p-4">
      <Card className="w-full max-w-md shadow-material-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-primary-foreground">V</span>
          </div>
          <CardTitle className="text-2xl">Vendor Management System</CardTitle>
          <CardDescription>Sign in to access your VMS dashboard</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Azure AD Login */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 text-base border-2 hover:bg-accent"
            onClick={handleAzureLogin}
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 23 23" fill="none">
              <path d="M0 0h10.76v10.76H0zm12.24 0H23v10.76H12.24zM0 12.24h10.76V23H0zm12.24 0H23V23H12.24z" fill="#F25022"/>
              <path d="M12.24 0H23v10.76H12.24z" fill="#7FBA00"/>
              <path d="M0 12.24h10.76V23H0z" fill="#00A4EF"/>
              <path d="M12.24 12.24H23V23H12.24z" fill="#FFB900"/>
            </svg>
            Sign in with Microsoft Azure AD
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with credentials</span>
            </div>
          </div>

          {/* Manual Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-label="Username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role" aria-label="Select role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="fte-lead">FTE Lead / Manager</SelectItem>
                  <SelectItem value="business-desk">Business Desk</SelectItem>
                  <SelectItem value="vendor">Vendor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2 text-sm text-center">
          <a href="#" className="text-primary hover:underline">
            Forgot Password?
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            Contact Admin for Support
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}