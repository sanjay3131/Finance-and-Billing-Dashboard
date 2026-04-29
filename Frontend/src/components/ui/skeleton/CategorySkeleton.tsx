const CategorySkeleton = () => {
  return (
    <div>
      <div className="flex text-sm gap-2 px-2 flex-wrap items-center py-2">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div
              className="animate-pulse bg-gray-300 rounded-full h-6 w-16"
              key={index}
            ></div>
          ))}
      </div>
    </div>
  );
};

export default CategorySkeleton;
