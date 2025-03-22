import React, { useEffect, useState } from 'react'
import Model from './Model'
import axios from "axios"
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ProductCard from './Product'
const BrowseByCategory = () => {
    const { category } = useParams()
    const [cate, setCate] = useState([])
    const getByCatgory = async () => {
        try {
            const resp = await axios.get(`http://localhost:5000/api/products/categories/${category}`)
            setCate(resp.data.products)
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        getByCatgory();
    }, [category])
    return (
        <div className='px-12 mt-3'>
            <span className=' opacity-60 text-[13px]'>categories/{category}</span>
            <div className='mt-2 grid lg:grid-cols-4 md:grid-col-2 sm:grid-cols-1 space-y-4'>
                <ProductCard data={cate} />
            </div>
        </div>
    )
}

export default BrowseByCategory