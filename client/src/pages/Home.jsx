import React, { useEffect, useState } from 'react'
import ImageSlider from '../component/Hero/Carousel'
import Category from '../component/Category'
import Model from '../component/Model'
import axios from "axios"
import Phone from '../component/Phone'
import SearchCategory from '../component/SearchCategory'

const Home = () => {
  const [flash, setFlash] = useState([])
  async function flashSale() {
    try {
      const resp = await axios.get("https://fakestoreapi.com/products?limit=8")
      setFlash(resp.data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    flashSale();
  }, [])

  return (
    <div>
      <div className='hero flex h-[270px] w-full px-4'>
        <Category />
        <ImageSlider />
      </div>
      <Model value={"Flash Sales"} timer={true} data={flash} />
      <div className="category px-8 mt-5">
        <Phone type={"Categoires"} />
        <h2 className='mt-5 font-semibold'>Browse By Category</h2>
        <SearchCategory />
      </div>

    </div>
  )
}

export default Home