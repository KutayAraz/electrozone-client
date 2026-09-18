import { useEffect, useRef, useState } from "react";

interface UseFixedElementVisibility {
  showFixedElement: boolean;
  elementHeight: number;
}

interface UseFixedElementVisibilityOptions {
  threshold?: number;
  elementSelector: string;
}

export const useFixedElementVisibility = ({
  threshold = 300,
  elementSelector,
}: UseFixedElementVisibilityOptions): UseFixedElementVisibility => {
  const [showFixedElement, setShowFixedElement] = useState(false);
  const [elementHeight, setElementHeight] = useState(0);

  // Doesn't need to trigger re-renders
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const element = document.querySelector<HTMLElement>(elementSelector);
    if (!element) return;

    // Reports the initial height as soon as observing starts, then every change.
    const resizeObserver = new ResizeObserver(() => {
      setElementHeight(element.offsetHeight);
    });
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [elementSelector]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      const scrollingUp = currentScrollY < lastScrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      const pastThreshold = currentScrollY > threshold;

      // Hide element if below threshold
      if (!pastThreshold) {
        setShowFixedElement(false);
      }

      // Hide element when scrolling down
      if (scrollingDown) {
        setShowFixedElement(false);
      }

      // Show fixed element when scrolling up and past threshold (but not at very top)
      if (pastThreshold && scrollingUp && currentScrollY > 50) {
        setShowFixedElement(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    // Add scroll listener with passive option for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return { showFixedElement, elementHeight };
};
