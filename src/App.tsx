import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UberUns from "./pages/UberUns";
import Datenschutz from "./pages/Datenschutz";
import AGBs from "./pages/AGBs";
import CookieRichtlinie from "./pages/CookieRichtlinie";
import Impressum from "./pages/Impressum";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/uber-uns" element={<Layout><UberUns /></Layout>} />
          <Route path="/datenschutz" element={<Layout><Datenschutz /></Layout>} />
          <Route path="/agbs" element={<Layout><AGBs /></Layout>} />
          <Route path="/cookie-richtlinie" element={<Layout><CookieRichtlinie /></Layout>} />
          <Route path="/impressum" element={<Layout><Impressum /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
