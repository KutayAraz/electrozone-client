interface CarouselSkeletonProps {
  className?: string;
}

export const CarouselSkeleton = ({ className }: CarouselSkeletonProps) => (
  <div className="relative overflow-hidden xs:px-6">
    <div className={`relative mx-auto flex ${className ?? ""}`}>
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="w-1/2 shrink-0 sm:w-1/3 md:w-1/4 lg:w-1/5" aria-hidden="true">
          <div className="relative mx-[4px] xs:mx-2 sm:mx-3 my-1">
            <div className="flex animate-pulse flex-col items-center rounded-lg border border-gray-200 bg-white pt-6 px-3 pb-3 shadow-sm">
              <div className="h-[100px] w-full rounded-md pt-2 sm:h-[160px] bg-gray-100" />

              {/* `h-[3em]` is relative to the font size, so the name block has
                  to carry the card's `text-sm` to reserve the same height. */}
              <div className="mt-3 flex h-[3em] w-full flex-col gap-[0.4em] pt-[0.25em] text-sm">
                <div className="h-[0.75em] rounded bg-gray-100" />
                <div className="h-[0.75em] w-4/5 rounded bg-gray-100" />
              </div>

              <div className="mt-1 flex h-4 w-1/2 items-center">
                <div className="h-3 w-full rounded bg-gray-100" />
              </div>

              <div className="mt-2 flex h-6 w-1/3 items-center">
                <div className="h-4 w-full rounded bg-gray-100" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
