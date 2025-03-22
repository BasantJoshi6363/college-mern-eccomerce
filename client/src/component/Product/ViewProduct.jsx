import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye, FaSave, FaTimes, FaVideoSlash } from 'react-icons/fa';
import axios from 'axios';
import { Link, Navigate } from "react-router-dom"
import CreateProduct from './CreateProduct';
import { toast } from 'react-toastify';

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [flag, setFlags] = useState(false)

  // API base URL
  const API_URL = 'http://localhost:5000/api/products';

  // Fetch all products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // GET - Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setProducts(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // POST - Create a new product
  const createProduct = async (productData) => {
    try {
      setLoading(true);
      const response = await axios.post(API_URL, productData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      });
      setProducts([...products, response.data]);
      setError('');
      return true;
    } catch (err) {
      console.error('Error creating product:', err);
      setError('Failed to create product. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // PUT - Update existing product
  const updateProduct = async (productId, productData) => {
    try {
      setLoading(true);
      const response = await axios.put(`${API_URL}/${productId}`, productData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      });
      console.log(productId)
      location.reload()
      // Update products array with updated product
      // setProducts(prevProducts =>
      //   prevProducts.map(product =>
      //     product._id === productId ? response.data : product
      //   )
      // );
      setError('');
      return true;
    } catch (err) {
      console.log(error.response.data.message)
      toast.error(error.message)
      console.error('Error updating product:', err);
      setError('Failed to update product. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // DELETE - Remove a product
  const deleteProduct = async (productId) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      });

      // Remove deleted product from state
      setProducts(products.filter(product => product._id !== productId));
      toast.success("product deleted successfully")
      setError('');
      return true;
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // UI Handlers
  const handleEdit = (product) => {
    setEditingProduct({ ...product });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = async () => {
    // Validate input
    if (!editingProduct.name || !editingProduct.price) {
      alert('Name and Price are required');
      return;
    }

    // Send update request to backend
    const success = await updateProduct(editingProduct._id, editingProduct);

    if (success) {
      // Clear editing state
      setEditingProduct(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      await deleteProduct(productId);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Inventory</h1>
      <button className='mb-5' onClick={() => setFlags(true)}>Add Product + </button>

      {flag && (<CreateProduct />)}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-2">Loading products...</p>
        </div>
      )}


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
                    disabled={loading}
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
                  src={product.image || "https://via.placeholder.com/300x300?text=Product"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x300?text=Product";
                  }}
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
                  <span className="text-green-600 font-bold">${parseFloat(product.price).toFixed(2)}</span>
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
                    {/* <Link to={`edit/${product._id}`}> */}
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-green-500 hover:text-green-700"
                      title="Edit Product"
                      disabled={loading}
                    >
                      <FaEdit />
                    </button>
                    {/* </Link> */}
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete Product"
                      disabled={loading}
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
      {!loading && products.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No products found. Add some products to get started!
        </div>
      )}
    </div>
  );
};

export default ViewProduct;