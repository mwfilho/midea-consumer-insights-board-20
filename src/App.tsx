
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GeographicAnalysis from "./pages/GeographicAnalysis";
import ProductAnalysis from "./pages/ProductAnalysis";
import FinancialAnalysis from "./pages/FinancialAnalysis";
import RegionalAnalysis from "./pages/RegionalAnalysis";
import Conclusions from "./pages/Conclusions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/geografia" element={<GeographicAnalysis />} />
          <Route path="/produtos" element={<ProductAnalysis />} />
          <Route path="/financeiro" element={<FinancialAnalysis />} />
          <Route path="/regional" element={<RegionalAnalysis />} />
          <Route path="/conclusoes" element={<Conclusions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
