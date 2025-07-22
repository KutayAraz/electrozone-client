import { useCallback, useEffect, useRef, useState } from "react";

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

  // Use refs for values that don't need to trigger re-renders
  const lastScrollYRef = useRef(0);
  const thresholdRef = useRef(threshold);

  // Update refs when props change
  thresholdRef.current = threshold;

  useEffect(() => {
    const calculateElementHeight = () => {
      const element = document.querySelector(elementSelector) as HTMLElement;
      if (element) {
        setElementHeight(element.offsetHeight);
      }
    };

    calculateElementHeight();
    window.addEventListener("resize", calculateElementHeight);

    return () => {
      window.removeEventListener("resize", calculateElementHeight);
    };
  }, [elementSelector]);

  // Memoized scroll handler
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const lastScrollY = lastScrollYRef.current;

    const scrollingUp = currentScrollY < lastScrollY;
    const scrollingDown = currentScrollY > lastScrollY;
    const pastThreshold = currentScrollY > thresholdRef.current;

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
  }, []);

  useEffect(() => {
    // Add scroll listener with passive option for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return { showFixedElement, elementHeight };
};
