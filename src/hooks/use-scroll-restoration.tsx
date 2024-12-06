import { useEffect } from "react";
import { useLocation, useNavigationType, NavigationType } from "react-router-dom";

export default function useCustomScrollRestoration() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === NavigationType.Pop) {
      // Restore scroll position for back/forward navigation
      const savedPosition = sessionStorage.getItem(location.key);
      if (savedPosition) {
        const { x, y } = JSON.parse(savedPosition);
        window.scrollTo(x, y);
      }
    }
  }, [location, navigationType]);

  useEffect(() => {
    // Save the scroll position when leaving the page
    const handleSavePosition = () => {
      const scrollPosition = { x: window.scrollX, y: window.scrollY };
      sessionStorage.setItem(location.key, JSON.stringify(scrollPosition));
    };

    window.addEventListener("beforeunload", handleSavePosition);
    return () => {
      window.removeEventListener("beforeunload", handleSavePosition);
      // Also save when the component unmounts
      handleSavePosition();
    };
  }, [location]);
}
