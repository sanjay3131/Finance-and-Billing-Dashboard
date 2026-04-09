const BillCardSkeleton = () => {
  return (
    <div className=" flex flex-col gap-4">
      {/* loading skeleton ui */}
      {Array.from({ length: 3 }).map((_, index) => (
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
