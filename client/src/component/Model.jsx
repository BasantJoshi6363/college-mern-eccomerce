import React from 'react'
import Phone from './Phone'
import Timer from './Timer'
import Product from './Product'
// import SearchCategory from './SearchCategory'

const Model = ({ value, timer,flash }) => {
  return (
    <div className='px-8 py-2'>
      <Phone type={value} />
      <div className="upper flex justify-between items-center mt-4">
        <h2>{value}</h2>
        {timer && (
          <div><Timer /></div>
        )}
      </div>
        <div className='grid lg:grid-cols-4 gap-4 w-full'>
          <Product className="mt-3" data={flash} />
        </div>
    </div>
  )
}

export default Model
