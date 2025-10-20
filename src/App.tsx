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
          
          {/* German and English routes for About Us */}
          <Route path="/uber-uns" element={<Layout><UberUns /></Layout>} />
          <Route path="/about-us" element={<Layout><UberUns /></Layout>} />
          
          {/* German and English routes for Privacy Policy */}
          <Route path="/datenschutz" element={<Layout><Datenschutz /></Layout>} />
          <Route path="/privacy" element={<Layout><Datenschutz /></Layout>} />
          
          {/* German and English routes for Terms & Conditions */}
          <Route path="/agbs" element={<Layout><AGBs /></Layout>} />
          <Route path="/terms" element={<Layout><AGBs /></Layout>} />
          
          {/* German and English routes for Cookie Policy */}
          <Route path="/cookie-richtlinie" element={<Layout><CookieRichtlinie /></Layout>} />
          <Route path="/cookies" element={<Layout><CookieRichtlinie /></Layout>} />
          
          {/* German and English routes for Imprint */}
          <Route path="/impressum" element={<Layout><Impressum /></Layout>} />
          <Route path="/imprint" element={<Layout><Impressum /></Layout>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
