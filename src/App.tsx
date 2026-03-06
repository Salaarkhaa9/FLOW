import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";

// Auth Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Dashboard Pages
import Dashboard from "./pages/Dashboard";
import LoadMarketplace from "./pages/LoadMarketplace";
import FleetManagement from "./pages/FleetManagement";
import Profile from "./pages/Profile";
import RealTimeTracking from "./pages/RealTimeTracking";
import TeamMembers from "./pages/TeamMembers";
import Documents from "./pages/Documents";
import Payments from "./pages/Payments";
import Expenses from "./pages/Expenses";
import Analytics from "./pages/Analytics";
import Messages from "./pages/Messages";
import Reviews from "./pages/Reviews";
import AIAssistant from "./pages/AIAssistant";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Toaster />
        <Sonner />
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/loads" element={<LoadMarketplace />} />
          <Route path="/fleet" element={<FleetManagement />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Additional Routes */}
          <Route path="/tracking" element={<RealTimeTracking />} />
          <Route path="/team" element={<TeamMembers />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
