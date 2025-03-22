import React from 'react'
import { Link } from 'react-router-dom'
import OrdersManager from '../Product/OrderManager'

const Admin = () => {
    return (
        <div className='px-12 py-4'>
            <h2 className='text-center'>Welcome to the Admin Page</h2>
            <div className="links float-end flex items-center gap-5">
                <Link className='bg-red-600 text-white px-4 py-2 rounded-md' to={"/users"}>users</Link>
                <Link className='bg-red-600 text-white px-4 py-2 rounded-md' to={"/products"}>products</Link>
                <Link className='bg-red-600 text-white px-4 py-2 rounded-md' to={"/orders"}>orders</Link>
            </div>
            <OrdersManager />
        </div>
    )
}

export default Admin