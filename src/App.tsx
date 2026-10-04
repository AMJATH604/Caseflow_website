import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import Home from "@/pages/Home";

// The home page ships in the first bundle; everything else loads on demand.
const Features = lazy(() => import("@/pages/Features"));
const PricingPage = lazy(() => import("@/pages/PricingPage"));
const BarPage = lazy(() => import("@/pages/BarPage"));
const Contact = lazy(() => import("@/pages/Contact"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const NotFound = lazy(() => import("@/pages/NotFound"));
// The admin panel is a separate app at /admin with its own layout and login.
const AdminApp = lazy(() => import("@/admin/AdminApp"));

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ink" />}>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="features" element={<Features />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="bar-associations" element={<BarPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
