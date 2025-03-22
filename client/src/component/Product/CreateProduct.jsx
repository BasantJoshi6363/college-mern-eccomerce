import React, { useContext, useState } from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import { FaTag, FaDollarSign, FaBox, FaCloudUploadAlt, FaTimes, FaCamera } from 'react-icons/fa';
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const CreateProduct = () => {
    const { id } = useContext(AuthContext);

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        flash: false,
    });

    const [file, setFile] = useState(null);
    const [imgUrl, setImgUrl] = useState("");
    const fileInputRef = React.useRef(null);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImgUrl(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const clearImg = (e) => {
        e.preventDefault();
        setFile(null);
        setImgUrl("");
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const submitImg = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", file);
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("stock", product.stock);
        formData.append("category", product.category);
        formData.append("flash", product.flash);
        formData.append("user", id);

        try {
            const resp = await axios.post("http://localhost:5000/api/products/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
            console.log("Product created", resp);
            toast.success("Product Created Successfully");
            <Navigate to={"/products"} />
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Product</h2>
            <form onSubmit={submitImg} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left column */}
                    <div className="space-y-4">
                        {/* Product Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Product Name*
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={product.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter product name"
                                />
                                <FaTag className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            </div>
                        </div>

                        {/* Price */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                Price ($)*
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={product.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="0.01"
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="0.00"
                                />
                                <FaDollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                Category*
                            </label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter product category"
                            />
                        </div>

                        {/* Stock */}
                        <div>
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                                Quantity in Stock*
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    value={product.stock}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter available quantity"
                                />
                                <FaBox className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            </div>
                        </div>

                        {/* Flash Sale */}
                        <div className="flex items-center pt-2">
                            <input
                                type="checkbox"
                                id="flash"
                                name="flash"
                                checked={product.flash}
                                onChange={(e) => setProduct({ ...product, flash: e.target.checked })}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="flash" className="ml-2 block text-sm text-gray-700">
                                Mark as Flash Sale
                            </label>
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="space-y-4">
                        {/* Product Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Product Image
                            </label>
                            <div
                                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"
                                onClick={triggerFileInput}
                            >
                                <input
                                    ref={fileInputRef}
                                    id="image-upload"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImage}
                                />

                                {imgUrl ? (
                                    <div className="relative w-full h-40" onClick={(e) => e.stopPropagation()}>
                                        <img
                                            src={imgUrl}
                                            alt="Product preview"
                                            className="h-full mx-auto object-contain"
                                        />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                clearImg(e);
                                            }}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                                        >
                                            <FaTimes className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-1 text-center">
                                        <div className="flex flex-col items-center">
                                            <FaCamera className="mx-auto h-12 w-12 text-gray-400" />
                                            <p className="text-sm text-gray-600 mt-2">
                                                Click to upload an image
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Product Description*
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter product description"
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8">
                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors duration-200"
                    >
                        <FaCloudUploadAlt className="w-4 h-4 mr-2" />
                        Create Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;