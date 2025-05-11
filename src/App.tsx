
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Surveys from "./pages/Surveys";
import WeeklySurveys from "./pages/WeeklySurveys";
import Rewards from "./pages/Rewards";
import News from "./pages/News";
import Feedback from "./pages/Feedback";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import AdminRoute from "./components/auth/AdminRoute";
import AuthRoute from "./components/auth/AuthRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/surveys" element={
            <AuthRoute>
              <Surveys />
            </AuthRoute>
          } />
          <Route path="/weekly-surveys" element={
            <AuthRoute>
              <WeeklySurveys />
            </AuthRoute>
          } />
          <Route path="/rewards" element={
            <AuthRoute>
              <Rewards />
            </AuthRoute>
          } />
          <Route path="/news" element={
            <AuthRoute>
              <News />
            </AuthRoute>
          } />
          <Route path="/feedback" element={
            <AuthRoute>
              <Feedback />
            </AuthRoute>
          } />
          <Route path="/profile" element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          } />
          <Route path="/admin" element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
