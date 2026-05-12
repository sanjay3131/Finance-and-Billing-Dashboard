const CategoryTab = ({
  selectedCategory,
  setSelectedCategory,
  Categories,
}: {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  Categories: [string];
}) => {
  return (
    <div className=" ">
      <div className="flex gap-2 flex-wrap pb-2">
        <button
          onClick={() => setSelectedCategory("")}
          className={` px-2 py-1 md:px-4 md:py-2 rounded-2xl shadow-md transition-all font-bold capitalize text-sm md:text-lg  ${
            selectedCategory === "" ? "bg-green-500 text-white  " : "bg-white"
          }`}
        >
          All
        </button>
        {Categories?.map((category: string) => (
          <button
            onClick={() => setSelectedCategory(category)}
            key={category}
            className={`whitespace-nowrap px-2 py-1 md:px-4 md:py-2 rounded-2xl shadow-md transition-all font-bold capitalize text-sm md:text-lg  ${
              selectedCategory === category
                ? "bg-green-500 text-white "
                : "bg-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTab;
