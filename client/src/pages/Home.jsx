import React, { useEffect, useState } from 'react'
import ImageSlider from '../component/Hero/Carousel'
import Category from '../component/Category'
import Model from '../component/Model'
import axios from "axios"
import Phone from '../component/Phone'
import SearchCategory from '../component/SearchCategory'
import { useAuth0 } from '@auth0/auth0-react'

const Home = () => {
  return (
    <div>
      <div className='hero flex h-[270px] w-full px-4'>
        <Category />
        <ImageSlider />
      </div>

      {/* <Model value={"Flash Sales"} timer={true} data={flash} /> */}
      {/* <div className="category px-8 mt-5">
        <Phone type={"Categoires"} />
        <h2 className='mt-5 font-semibold'>Browse By Category</h2>
        <SearchCategory />
      </div> */}

    </div>
  )
}

export default Home