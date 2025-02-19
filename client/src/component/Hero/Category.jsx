import React from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const categories = [
    "Woman's Fashion",
    "Men's Fashion",
    "Electronics",
    "Home & Lifestyle",
    "Medicine",
    "Sports & Outdoor",
    "Baby's & Toys",
    "Groceries & Pets",
    "Health & Beauty",
  ];

  return (
    <div className="w-1/5 border-r border-black px-4">
      {categories.map((val,i) => {
        return (
          <div key={i} className="flex  pt-2">
            <Link to={`/${val.toLowerCase().split(" ")[0]}`}>{val}</Link>{" "}
          </div>
        );
      })}
    </div>
  );
};

export default Category;
