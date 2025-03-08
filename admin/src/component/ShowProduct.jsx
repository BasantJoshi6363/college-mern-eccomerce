import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEye, FaSave, FaTimes } from 'react-icons/fa';

// Dummy product data (simulating backend response)
const dummyProducts = [
  {
    _id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality noise-canceling wireless headphones',
    price: 199.99,
    stock: 50,
    category: 'Electronics',
    image: 'https://via.placeholder.com/300x300?text=Headphones',
    isFlash: 'false',
    user: 'user123'
  },
  {
    _id: '2',
    name: 'Smart Watch',
    description: 'Advanced fitness tracking smartwatch',
    price: 249.99,
    stock: 30,
    category: 'Wearables',
    image: 'https://via.placeholder.com/300x300?text=SmartWatch',
    isFlash: 'true',
    user: 'user456'
  },
  {
    _id: '3',
    name: 'Bluetooth Speaker',
    description: 'Portable waterproof bluetooth speaker',
    price: 79.99,
    stock: 75,
    category: 'Electronics',
    image: 'https://via.placeholder.com/300x300?text=Speaker',
    isFlash: 'false',
    user: 'user789'
  }
];

const ShowProduct = () => {
  const [products, setProducts] = useState(dummyProducts);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEdit = (product) => {
    setEditingProduct({...product});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = () => {
    // Validate input
    if (!editingProduct.name || !editingProduct.price) {
      alert('Name and Price are required');
      return;
    }

    // Update products array
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product._id === editingProduct._id ? editingProduct : product
      )
    );

    // Clear editing state
    setEditingProduct(null);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleDelete = (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      setProducts(products.filter(product => product._id !== productId));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Inventory</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          // Check if this product is currently being edited
          if (editingProduct && editingProduct._id === product._id) {
            return (
              <div 
                key={product._id} 
                className="bg-white rounded-lg shadow-md p-4 border-2 border-blue-500"
              >
                <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                
                {/* Name Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editingProduct.name}
                    onChange={handleEditChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                  />
                </div>

                {/* Description Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={editingProduct.description}
                    onChange={handleEditChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                    rows="3"
                  />
                </div>

                {/* Price Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={editingProduct.price}
                    onChange={handleEditChange}
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                  />
                </div>

                {/* Stock Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={editingProduct.stock}
                    onChange={handleEditChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                  />
                </div>

                {/* Category Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={editingProduct.category}
                    onChange={handleEditChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                  />
                </div>

                {/* Flash Sale Toggle */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Flash Sale</label>
                  <select
                    name="isFlash"
                    value={editingProduct.isFlash}
                    onChange={handleEditChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>

                {/* Save and Cancel Buttons */}
                <div className="flex justify-between">
                  <button
                    onClick={handleSaveEdit}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
                  >
                    <FaSave className="mr-2" /> Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center"
                  >
                    <FaTimes className="mr-2" /> Cancel
                  </button>
                </div>
              </div>
            );
          }

          // Normal product card view
          return (
            <div 
              key={product._id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
            >
              {/* Product Image */}
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-cover"
                />
                {product.isFlash === 'true' && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                    Flash Sale
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2 text-sm line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-600 font-bold">${product.price.toFixed(2)}</span>
                  <span className="text-gray-500 text-sm">
                    Stock: {product.stock}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {product.category}
                  </span>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit(product)}
                      className="text-green-500 hover:text-green-700"
                      title="Edit Product"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete Product"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Products Message */}
      {products.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No products found. Add some products to get started!
        </div>
      )}
    </div>
  );
};

export default ShowProduct;