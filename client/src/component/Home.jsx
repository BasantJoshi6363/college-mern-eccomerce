import React, { useContext, useEffect, useState } from 'react'
import Category from "../component/Hero/Category"
import ImageSlider from "../component/Hero/Carousel"
import Model from './Model'
import axios from 'axios'
import { toast } from 'react-toastify'

const Home = () => {
  const [flash, setFlash] = useState([]);
  const [AllProduct, setAllProduct] = useState([]);
  const fetchFlashSale = async () => {
    try {
      const resp = await axios.get("http://localhost:5000/api/products/flashsale");
      setFlash(resp.data)
    } catch (error) {
      toast.error(error.message)
    }
  }
  const getAllProduct = async () => {
    try {
      const resp = await axios.get("http://localhost:5000/api/products");
      setAllProduct(resp.data)
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchFlashSale();
    getAllProduct();
  }, [1])
  return (
    <div className='flex relative justify-between px-4 pt-2 flex-col'>


      {/* <button onClick={() => logout()}>Logout</button> */}

      <div className='hero flex h-[270px] w-full px-4 relative bottom-2'>
        <Category />
        <ImageSlider />
      </div>


      <div className='relative mt-10'>

        <Model flash={flash} value={"Flash Sales"} />
        <Model flash={AllProduct} value={"All Our Products"} />
      </div>

      {/* <div onClick={handleClick} className="circle size-8 flex items-center cursor-pointer justify-center bg-green-600 rounded-full p-5 ">
        <h2 className='capitalize text-white text-2xl'>{user.output.fullname.split("")[0]}</h2>
      </div> */}
    </div>
  )
}

export default Home