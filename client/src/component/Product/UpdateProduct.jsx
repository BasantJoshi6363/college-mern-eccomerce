import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import  {AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { FaCloudUploadAlt, FaCamera, FaTimes } from 'react-icons/fa';
import { toast } from "react-toastify";

const UpdateProduct = () => {
    const { id: userId } = useContext(AuthContext);
    const { id: productId } = useParams();

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
    const fileInputRef = useRef(null);

    // Fetch product details
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });
                setProduct({
                    ...response.data,
                    flash: !!response.data.flash, // Convert to boolean
                });
                setImgUrl(response.data.image);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [productId]);

    // Handle text input changes
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    // Handle image selection
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

    // Remove selected image
    const clearImg = (e) => {
        e.preventDefault();
        setFile(null);
        setImgUrl("");
    };

    // Open file input
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    // Submit form data
    const submitImg = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (file) formData.append("image", file);
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("stock", product.stock);
        formData.append("category", product.category);
        formData.append("flash", JSON.stringify(product.flash)); // Convert boolean to string
        formData.append("user", userId);

        // Debugging: Log formData
        for (let pair of formData.entries()) {
            console.log(pair[0] + ':', pair[1]);
        }

        try {
            await axios.put(
                `http://localhost:5000/api/products/${productId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                }
            );

            toast.success("Product Updated Successfully");
            window.location.href = "/products"; // Redirect after success
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating product");
            console.error("Error updating product:", error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Product</h2>
            <form onSubmit={submitImg} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name*</label>
                            <input type="text" id="name" name="name" value={product.name} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)*</label>
                            <input type="number" id="price" name="price" value={product.price} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category*</label>
                            <input type="text" id="category" name="category" value={product.category} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Quantity in Stock*</label>
                            <input type="number" id="stock" name="stock" value={product.stock} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="flash" name="flash" checked={product.flash} onChange={(e) => setProduct({ ...product, flash: e.target.checked })} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                            <label htmlFor="flash" className="ml-2 text-sm text-gray-700">Mark as Flash Sale</label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product Image</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer relative" onClick={triggerFileInput}>
                            <input ref={fileInputRef} id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImage} />
                            {imgUrl ? (
                                <div className="relative">
                                    <img src={imgUrl} alt="Preview" className="h-40 object-contain mx-auto" />
                                    <button onClick={clearImg} className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full">
                                        <FaTimes />
                                    </button>
                                </div>
                            ) : (
                                <FaCamera className="h-12 w-12 text-gray-400" />
                            )}
                        </div>
                    </div>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center">
                    <FaCloudUploadAlt className="w-4 h-4 mr-2" /> Update Product
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;
