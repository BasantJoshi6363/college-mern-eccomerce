import React, { useState, useRef } from 'react';
import { FaBox, FaDollarSign, FaImage, FaTag, FaList, FaUser, FaFlask, FaTimes } from 'react-icons/fa';

const CreateProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image: null,
    user: '', // Assuming you'll get user ID from authentication
    isFlash: 'false'
  });

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setImagePreview(reader.result);
        
        setProductData(prevState => ({
          ...prevState,
          image: file
        }));
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImagePreview(null);
    setProductData(prevState => ({
      ...prevState,
      image: null
    }));
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('stock', productData.stock);
    formData.append('category', productData.category);
    formData.append('user', productData.user);
    formData.append('isFlash', productData.isFlash);
    
    if (productData.image) {
      formData.append('image', productData.image);
    }

    try {
      const response = await fetch('/api/products/create', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      
      if (response.ok) {
        alert('Product created successfully!');
        // Reset form
        setProductData({
          name: '',
          description: '',
          price: '',
          stock: '',
          category: '',
          image: null,
          user: '',
          isFlash: 'false'
        });
        setImagePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload and Preview */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              <FaImage className="inline-block mr-2 text-pink-500" /> Product Image
            </label>
            
            {/* Image Preview */}
            {imagePreview && (
              <div className="relative mb-4">
                <img 
                  src={imagePreview} 
                  alt="Product Preview" 
                  className="w-full h-48 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={handleImageRemove}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                >
                  <FaTimes />
                </button>
              </div>
            )}
            
            {/* File Input */}
            <input
              type="file"
              id="image"
              name="image"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Product Name */}
          <div className="relative">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
              <FaBox className="inline-block mr-2 text-blue-500" /> Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={productData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>

          {/* Description */}
          <div className="relative">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">
              <FaTag className="inline-block mr-2 text-green-500" /> Description
            </label>
            <textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
              rows="3"
            />
          </div>

          {/* Price */}
          <div className="relative">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-700">
              <FaDollarSign className="inline-block mr-2 text-green-600" /> Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
            />
          </div>

          {/* Stock */}
          <div className="relative">
            <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-700">
              <FaList className="inline-block mr-2 text-purple-500" /> Stock Quantity
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter stock quantity"
            />
          </div>

          {/* Category */}
          <div className="relative">
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">
              <FaList className="inline-block mr-2 text-indigo-500" /> Product Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={productData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product category"
            />
          </div>

          {/* User ID */}
          <div className="relative">
            <label htmlFor="user" className="block mb-2 text-sm font-medium text-gray-700">
              <FaUser className="inline-block mr-2 text-red-500" /> User ID
            </label>
            <input
              type="text"
              id="user"
              name="user"
              value={productData.user}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter user ID"
            />
          </div>

          {/* Flash Sale Toggle */}
          <div className="relative">
            <label htmlFor="isFlash" className="block mb-2 text-sm font-medium text-gray-700">
              <FaFlask className="inline-block mr-2 text-yellow-500" /> Flash Sale
            </label>
            <select
              id="isFlash"
              name="isFlash"
              value={productData.isFlash}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;