import React from 'react'
import { Link } from "react-router-dom"

import { FaAngleDown } from "react-icons/fa";
const UpperNavbar = () => {
  return (
    <div className='h-10 bg-black text-white flex items-center justify-around gap-3'>
      <div className="leftUpperNavbar flex gap-2 items-center">
        <p className='font-light text-[11px]'>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</p>
        <Link className='text-light text-[12px] font-sans' to={"/"}>ShopNow</Link>
      </div>
      <div className="rightUpperNavbar flex items-center gap-2">
        <p className='font-extralight text-[11px]'>English</p>
        <FaAngleDown className="text-[12px]  text-center" />
      </div>
    </div>
  )
}

export default UpperNavbar