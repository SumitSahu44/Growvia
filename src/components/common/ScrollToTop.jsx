import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Page ko turant top (x: 0, y: 0) par scroll kar dega
    window.scrollTo(0, 0);
  }, [pathname]); // Jab bhi pathname (URL) change hoga, ye effect chalega

  return null; // Ye UI mein kuch render nahi karega
}