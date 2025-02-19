import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
const BrowseByCategory = () => {
    let message;
    const [output,setOutput] = useState([])
    const { category } = useParams();
    const navigate = useNavigate()
    console.log(category)
    const fetchData = async () => {
        try {
            const resp = await axios.get(`http://localhost:5000/api/products/${category}`)
            setOutput(resp.data.products)
            console.log(resp.data.products.length)
            if(resp.data.products.length===0){

                alert("currently we don't have any products")
                navigate("/")
                
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData();
    }, [category])
    return (
        <div>
            <h1>{message}</h1>
            {
                output.map((val,i)=>{
                    return <div key={i}> hii</div>
                })
            }
        </div>
    )
}

export default BrowseByCategory