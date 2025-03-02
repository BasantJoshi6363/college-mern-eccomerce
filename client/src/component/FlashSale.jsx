import React from "react";
import Product from "./Product";

const FlashSale = () => {
  return (
    <div className="px-4">
      <h2 className="px-4">Flash Sales</h2>
      <div className="grid flex-col sm:grid-rows-1 lg:grid-cols-4">
        <Product />
        <Product />
        <Product />
        {/* <Product /> */}
      </div>
    </div>
  );
};

export default FlashSale;
