import React from 'react'
import Phone from './Phone'
import Timer from './Timer'
import Product from './Product'
import SearchCategory from './SearchCategory'

const Model = ({ value, timer, data }) => {
  return (
    <div className='px-8 py-2'>
      <Phone type={"Today's"} />
      <div className="upper flex justify-between items-center mt-4">
        <h2>{value}</h2>
        {timer && (
          <div><Timer /></div>
        )}
      </div>

      {data && (
        <div className='grid lg:grid-cols-4 gap-4 w-full'>
          {data.map((val, i) => {
            return <Product className="mt-3" key={i} image={val.image} id={val.id} name={val.title} price={val.price} description={val.description} />
          })}
        </div>
      )}



    </div>
  )
}

export default Model
