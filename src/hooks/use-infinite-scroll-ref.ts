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
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching || !node) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        { threshold },
      );

      observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, threshold],
  );

  return lastElementRef;
};
