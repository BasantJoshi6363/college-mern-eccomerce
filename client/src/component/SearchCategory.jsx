import { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
    { name: "Phone", icon: "📱" },
    { name: "Computer", icon: "🖥️" },
    { name: "SmartWatch", icon: "⌚" },
    { name: "Camera", icon: "📷" },
    { name: "HeadPhone", icon: "🎧" },
    { name: "Gaming", icon: "🎮" },
];

const SearchCategory = () => {
    const [selected, setSelected] = useState("Camera");

    return (
        <div className="flex justify-evenly mt-6">
            {categories.map((category) => (
                <Link key={category.name} to={`/cat/${category.name.toLowerCase()}`}>
                    <div
                        onClick={() => setSelected(category.name)}
                        className={`flex flex-col items-center justify-center w-24 h-24 border rounded-lg cursor-pointer transition-all duration-300 
            ${selected === category.name ? "bg-red-500 text-white" : "bg-white text-black border-gray-300"}
          `}
                    >
                        <span className="text-2xl">{category.icon}</span>
                        <span className="mt-2 text-sm">{category.name}</span>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default SearchCategory;