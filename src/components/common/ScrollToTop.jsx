import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // Ye hook humein current URL (path) deta hai
  const { pathname } = useLocation();

  useEffect(() => {
    // Jab bhi pathname badlega, ye code chalega aur scroll top pe chala jayega
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Ye component kuch dikhata nahi hai, bas background me kaam karta hai
};

export default ScrollToTop;