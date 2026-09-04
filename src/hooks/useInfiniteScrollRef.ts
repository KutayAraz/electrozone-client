import { useCallback, useRef } from "react";

interface UseInfiniteScrollRefOptions {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
  threshold?: number;
}

export const useInfiniteScrollRef = ({
  fetchNextPage,
  hasNextPage,
  isFetching,
  threshold = 0.1,
}: UseInfiniteScrollRefOptions) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      // Always drop the previous observer first. Bailing out early used to
      // leave it attached, still holding the previous page's fetchNextPage.
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (isFetching || !node) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        { threshold },
      );

      observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, threshold],
  );

  return lastElementRef;
};
