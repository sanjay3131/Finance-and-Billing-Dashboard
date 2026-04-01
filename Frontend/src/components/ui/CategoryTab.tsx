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
      <div className="flex gap-4 flex-wrap pb-2">
        <button
          onClick={() => setSelectedCategory("")}
          className={`whitespace-nowrap px-4 py-2 rounded-2xl shadow-md transition-all font-bold capitalize  ${
            selectedCategory === "" ? "bg-green-500 text-white  " : "bg-white"
          }`}
        >
          All
        </button>
        {Categories?.map((category: string) => (
          <button
            onClick={() => setSelectedCategory(category)}
            key={category}
            className={`whitespace-nowrap px-4  rounded-2xl shadow-md transition-all font-bold capitalize  ${
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
