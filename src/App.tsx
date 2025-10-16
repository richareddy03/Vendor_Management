import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import Replacement from "./pages/Replacement";
import Offboarding from "./pages/Offboarding";
import RateCard from "./pages/RateCard";
import Interview from "./pages/Interview";
import RequestTracking from "./pages/RequestTracking";
import VideoVerification from "./pages/VideoVerification";
import BusinessDashboard from "./pages/BusinessDashboard";
import ApprovalInbox from "./pages/ApprovalInbox";
import BusinessRateCard from "./pages/BusinessRateCard";
import BudgetManagement from "./pages/BudgetManagement";
import PipelineView from "./pages/PipelineView";
import BusinessRequestTracking from "./pages/BusinessRequestTracking";
import NotFound from "./pages/NotFound";
import VendorConfirmation from "./pages/VendorConfirmation";
import VendorRequestInbox from "./pages/VendorRequestInbox";
import VendorScheduleInterview from "./pages/VendorScheduleInterview";
import VendorSubmitRatecard from "./pages/VendorSubmitRatecard";
import VendorOffboarding from "./pages/VendorOffboarding";
import VendorDashboard from "./pages/VendorDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/replacement" element={<Replacement />} />
            <Route path="/offboarding" element={<Offboarding />} />
            <Route path="/rate-card" element={<RateCard />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/request-tracking" element={<RequestTracking />} />
            <Route path="/video-verification" element={<VideoVerification />} />
            <Route path="/business-dashboard" element={<BusinessDashboard />} />
            <Route path="/approval-inbox" element={<ApprovalInbox />} />
            <Route path="/business-rate-card" element={<BusinessRateCard />} />
            <Route path="/budget-management" element={<BudgetManagement />} />
            <Route path="/pipeline-view" element={<PipelineView />} />
            <Route path="/business-request-tracking" element={<BusinessRequestTracking />} />
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />
            <Route path="/vendor-confirmation" element={<VendorConfirmation />} />
            <Route path="/vendor-offboarding-request" element={<VendorOffboarding />} />
            <Route path="/vendor-request-inbox" element={<VendorRequestInbox />} />
            <Route path="/vendor-schedule-interview" element={<VendorScheduleInterview />} />
            <Route path="/vendor-submit-ratecard" element={<VendorSubmitRatecard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
