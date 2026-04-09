const BillCardSkeleton = () => {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6">
      {/* loading skeleton ui */}
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="animate-pulse p-4 border rounded-lg">
          <div className="  w-full flex gap-2 justify-around items-center">
            {/* image skeleton */}
            <div className="bg-gray-300 h-10 w-10 rounded mx-auto"></div>
            <div className="flex-1">
              <div className="bg-gray-300 h-4 w-full mt-2"></div>
              <div className="bg-gray-300 h-4 w-full mt-2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BillCardSkeleton;
