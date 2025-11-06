
  
export const msalConfig = {
    auth: {
      clientId: import.meta.env.VITE_AZURE_CLIENT_ID as string,
      authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
      redirectUri: import.meta.env.VITE_REDIRECT_URI as string,
    },
    cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  };
  
  export const loginRequest = {
    scopes: ["User.Read","openid", "profile", "email"],
  };
  