import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { StickyCta } from "./StickyCta";
import { WhatsAppFloat } from "./WhatsAppFloat";

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
      <StickyCta />
      <WhatsAppFloat />
    </>
  );
}
