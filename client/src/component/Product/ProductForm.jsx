import React, { useState } from 'react';

const ProductCreationForm = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        flashsale: false,
        image: null
    });

    const [preview, setPreview] = useState(null);

    const categories = ['Men', 'Women', 'Electronics', 'Health'];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct({
            ...product,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setProduct({
                    ...product,
                    image: file
                });
                setPreview(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Product submitted:', product);
        // Here you would typically send the data to your backend
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">Add New Product</h1>
                <div className="text-sm text-gray-500">* Required fields</div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        {preview && (
                            <div className="mb-6">
                                <p className="text-sm text-gray-600 mb-2">Product Image Preview:</p>
                                <div className="border border-gray-200 rounded-lg p-4 flex justify-center">
                                    <img
                                        src={preview}
                                        alt="Product preview"
                                        className="max-h-64 object-contain"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                            Product Name *
                        </label>
                        <input
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="name"
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter product name"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="price">
                            Price ($) *
                        </label>
                        <input
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="price"
                            type="number"
                            name="price"
                            min="0"
                            step="0.01"
                            value={product.price}
                            onChange={handleChange}
                            required
                            placeholder="0.00"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="stock">
                            Stock Quantity
                        </label>
                        <input
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="stock"
                            type="text"
                            name="stock"
                            value={product.stock}
                            onChange={handleChange}
                            placeholder="Available quantity"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="category">
                            Category
                        </label>
                        <select
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="category"
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="description"
                            name="description"
                            rows="4"
                            value={product.description}
                            onChange={handleChange}
                            placeholder="Enter product description"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="image">
                            Product Image *
                        </label>
                        <input
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            id="image"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                    </div>

                    <div className="flex items-center">
                        <label className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    name="flashsale"
                                    checked={product.flashsale}
                                    onChange={handleChange}
                                    className="sr-only"
                                />
                                <div className={`block w-14 h-8 rounded-full ${product.flashsale ? 'bg-blue-500' : 'bg-gray-300'} transition`}></div>
                                <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${product.flashsale ? 'translate-x-6' : ''}`}></div>
                            </div>
                            <span className="ml-3 text-gray-700 text-sm font-medium">Flash Sale</span>
                        </label>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        type="button"
                        className="px-6 py-3 mr-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Create Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductCreationForm;