import React from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const categories = [
    { name: "Woman's Fashion", link: "woman" },
    { name: "Men's Fashion", link: "men" },
    { name: "Electronics", link: "electronics" },
    { name: "Home & Lifestyle", link: "home" },
    { name: "Medicine", link: "medicine" },
    { name: "Sports & Outdoor", link: "sports" },
    { name: "Baby's & Toys", link: "baby" },
    { name: "Groceries & Pets", link: "groceries" },
    { name: "Health & Beauty", link: "health" },
  ];

  return (
    <div className="w-1/2 border-r border-black px-4">
      {categories.map((category, i) => (
        <div key={i} className="flex capitalize pt-2 text-[14px]">
          <Link to={`categories/${category.link}`}>{category.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Category;
