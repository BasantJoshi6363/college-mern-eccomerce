import { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiPlus, FiMinus, FiHeart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import axios from "axios"
import { useCart } from "../context/CartContext";
function SinglePage() {
    const [product, setProduct] = useState([])
    const { addToCart } = useCart();
    const { id } = useParams()
    const fetchById = async () => {
        try {
            let resp = await axios.get(`http://localhost:5000/api/products/:${id}`)
            setProduct(resp.data)
            console.log(resp.data)

        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        fetchById();
    }, [])
    const [quantity, setQuantity] = useState(1);
    const handleIncrease = () => setQuantity(quantity + 1);
    const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6 max-w-[1240px] mx-auto ">
            {/* Image Section */}
            <div className=" flex items-center bg-gray-200 shadow-gray-300 rounded-lg shadow-2xl">
                <img
                    src={product.image}
                    alt="Gamepad"
                    className="w-[400px] h-[300px] object-contain"
                />
            </div>

            <div className="w-[500px]">
                <div className="flex-1">
                    <h2 className="text-2xl font-semibold">{product.title}</h2>
                    
                    <p className="text-xl font-semibold mt-2">{product.name}</p>
                    <p className="text-gray-600 text-sm mt-2">{product.description}
                    </p>

                    {/* Quantity & Buy Now */}
                    <div className="mt-6 flex items-center space-x-4">
                        <div className="flex items-center border rounded-lg overflow-hidden">
                            <button className="px-4 py-3 bg-gray-200" onClick={handleDecrease}><FiMinus /></button>
                            <span className="px-4 py-2">{quantity}</span>
                            <button className="px-4 py-3 bg-gray-200" onClick={handleIncrease}><FiPlus /></button>
                        </div>
                        <button onClick={() => addToCart(product)} className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600">Buy Now</button>
                        <button className="text-gray-600"><FiHeart size={24} /></button>
                    </div>

                    {/* Delivery Info */}
                    <div className="mt-6 border rounded-lg">
                        <p className="flex items-center text-gray-600 border-b pl-5 pb-8 mt-8 "><span className="mr-2  ">🚚</span> <span>Free Delivery <a href="#" className="text-blue-500">Enter your postal code</a></span></p>
                        <p className="flex items-center text-gray-600 pl-5 mt-8 mb-8"><span className="mr-2">🔄</span> <span>Free 30 Days Delivery Returns. <a href="#" className="text-blue-500">Details</a></span></p>
                    </div>
                </div>

            </div>
        </div>
    );
}


export default SinglePage