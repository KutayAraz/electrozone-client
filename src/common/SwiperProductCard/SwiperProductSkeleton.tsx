const SwiperProductSkeleton = () => {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-[160px] bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    );
  };
  
  export default SwiperProductSkeleton;