
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { loginRequest } from "@/authConfig";

export default function Login() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const API_URL = "https://vendorfunctionapp-b9asdzfwcreyhgf0.eastus-01.azurewebsites.net/api/verifyUser";

  const handleAzureLogin = () => {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.error("Login failed:", e);
      toast.error("Azure AD login failed. Please try again.");
    });
  };

  // useEffect(() => {
  //   if (isAuthenticated && accounts[0]) {
  //     acquireTokenAndVerifyUser();
  //   }
  // }, [isAuthenticated, accounts]);

 useEffect(() => {
  // Prevent auto-login after logout
  const justLoggedOut = sessionStorage.getItem("justLoggedOut");
  if (justLoggedOut) {
    sessionStorage.removeItem("justLoggedOut");
    return;
  }

  if (isAuthenticated && accounts[0]) {
    acquireTokenAndVerifyUser();
  }
}, [isAuthenticated, accounts]);


  const acquireTokenAndVerifyUser = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const tokenResponse = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      });

      const idToken = tokenResponse.idToken;

      const apiResponse = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        throw new Error(`Backend error: ${apiResponse.status} - ${errorText}`);
      }

      const data = await apiResponse.json();

      if (data.status !== "success") {
        throw new Error(data.message || "Verification failed");
      }

      // Store exactly what backend sends
      const user = {
        userId: data.userId,      // ← From DB (GUID)
        name: data.name,
        email: data.email,
        role: data.role.toLowerCase().replace(" ", "-"),
      };

      localStorage.setItem("vmsUser", JSON.stringify(user));

      toast.success(`Welcome, ${user.name.split(" ")[0]}!`, { duration: 2000 });
      
      const roleToPath: Record<string, string> = {
  "vendor": "/vendor-dashboard",
  "fte-lead": "/dashboard",
  "business-desk": "/business-dashboard",
};

const redirectPath = roleToPath[user.role] || "/dashboard";
navigate(redirectPath);

      // setTimeout(() => {
      //   navigate(data.redirect);
      // }, 800);
    } catch (error: any) {
      console.error("Token verification failed:", error);
      toast.error(error.message || "Authentication failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/10 p-4">
      <Card className="w-full max-w-md shadow-material-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-primary-foreground">V</span>
          </div>
          <CardTitle className="text-2xl">Vendor Management System</CardTitle>
          <CardDescription>Sign in with your Microsoft Azure AD account</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 text-base border-2 hover:bg-accent"
            onClick={handleAzureLogin}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              <>
                <svg className="mr-2 h-5 w-5" viewBox="0 0 23 23" fill="none">
                  <path d="M0 0h10.76v10.76H0zm12.24 0H23v10.76H12.24zM0 12.24h10.76V23H0zm12.24 0H23V23H12.24z" fill="#F25022"/>
                  <path d="M12.24 0H23v10.76H12.24z" fill="#7FBA00"/>
                  <path d="M0 12.24h10.76V23H0z" fill="#00A4EF"/>
                  <path d="M12.24 12.24H23V23H12.24z" fill="#FFB900"/>
                </svg>
                Sign in with Microsoft Azure AD
              </>
            )}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Only authorized users can access the VMS dashboard.
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2 text-sm text-center">
          <a href="#" className="text-primary hover:underline">
            Having trouble signing in?
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            Contact your administrator
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}