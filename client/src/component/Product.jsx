"use client"

import { useState } from "react"
import { Link } from "react-router-dom"


export default function ProductCard({id,name,image,description,price}) {

  return (
    <div className="w-1/5 lg:w-full bg-white rounded-lg shadow-sm">
     <Link to={`/products/${id}`}>
      <div className="p-4">
        <div className="relative">
          {/* Product Image Container */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group">
            <img
              src={image}
              alt="The North Coat"
              className="object-cover w-full h-full"
            />
            {/* Discount Label */}
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">-28%</div>
            {/* Action Buttons */}
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-50 group-hover:opacity-100 transition-opacity duration-400">
            </div>
            {/* Add to Cart Overlay */}
          </div>

          {/* Product Info */}
          <div className="mt-4 space-y-2">
            <h3 className="text-lg font-medium text-gray-900 truncate">{name}</h3>
            <p className="truncate">{description}</p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-red-500">{price}$</span>
              <span className="text-sm text-gray-500 line-through">$360</span>
            </div>
            <button className="bg-red-400 cursor-pointer w-[200px] py-2 text-white">Add to Cart</button>
          </div>
        </div>
      </div>
      </Link>
    </div>
  )
}
