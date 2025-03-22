
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { memo } from "react";

export default function ProductCard(flash) {

    const { addToCart } = useCart();

    return (
        <>
            {flash.data.map((item) => {

                return <div key={item._id} className="w-1/6 lg:w-[220px] bg-white rounded-lg shadow-sm">
                    <div className="p-2">
                        <div className="relative">
                            {/* Product Image Container */}
                            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group">

                                <Link to={`products/${item._id}`}>
                                    <div className="flex items-center justify-center size-full">
                                        <img
                                        loading="lazy"
                                            src={item.image}
                                            alt="The North Coat"
                                            className="object-cover size-[70%]"
                                        />
                                    </div>
                                </Link>
                                {/* Discount Label */}
                                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">-28%</div>
                                {/* Action Buttons */}
                                <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-50 group-hover:opacity-100 transition-opacity duration-400">
                                </div>
                                {/* Add to Cart Overlay */}
                            </div>

                            {/* Product Info */}
                            <div className="mt-2 space-y-1">
                                <h3 className="text-lg font-medium text-gray-900 truncate">{item.name}</h3>
                                <p className="truncate">{item.description}</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold text-red-500">{item.price}$</span>
                                    <span className="text-sm text-gray-500 line-through">$360</span>
                                </div>
                                {/* <button onClick={() => addToCart(id)} className="bg-red-400 cursor-pointer w-[200px] py-2 text-white">Add to Cart</button> */}
                                <button className="bg-red-400 cursor-pointer w-[200px] py-2 text-white" onClick={() => addToCart(item)}>Add to Cart</button>
                            </div>
                        </div>
                    </div>

                </div>


            })}
        </>
    )

}
