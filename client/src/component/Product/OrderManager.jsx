import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaCheck, FaTruck, FaEye, FaSearch } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

const OrdersManager = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editFormData, setEditFormData] = useState({
        shippingAddress: {
            address: '',
            city: '',
            postalCode: '',
            country: ''
        },
        paymentMethod: '',
        totalPrice: 0,
        isPaid: false,
        isDelivered: false
    });

    // Fetch orders from API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('http://localhost:5000/api/orders', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("authToken")}`
                    }
                });
                setOrders(data);
                console.log(data)
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Filter orders based on search term
    const filteredOrders = orders.filter(order =>
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.shippingAddress.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle view order details
    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setIsViewModalOpen(true);
    };

    // Handle edit order
    const handleEditClick = (order) => {
        setSelectedOrder(order);
        setEditFormData({
            shippingAddress: { ...order.shippingAddress },
            paymentMethod: order.paymentMethod,
            totalPrice: order.totalPrice,
            isPaid: order.isPaid,
            isDelivered: order.isDelivered
        });
        setIsEditModalOpen(true);
    };

    // Handle delete order click
    const handleDeleteClick = (order) => {
        setSelectedOrder(order);
        setIsDeleteModalOpen(true);
    };

    // Handle marking order as paid
    const handleMarkAsPaid = async (orderId) => {
        try {
            await axios.put(`http://localhost:5000/api/orders/${orderId}/pay`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`
                }
            });

            // Update order in state
            setOrders(orders.map(order =>
                order._id === orderId ? { ...order, isPaid: true, paidAt: new Date().toISOString() } : order
            ));
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    // Handle marking order as delivered
    const handleMarkAsDelivered = async (orderId) => {
        try {
            await axios.put(`http://localhost:5000/api/orders/${orderId}/deliver`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`
                }
            });

            // Update order in state
            setOrders(orders.map(order =>
                order._id === orderId ? { ...order, isDelivered: true, deliveredAt: new Date().toISOString() } : order
            ));
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    // Handle edit form change
    const handleEditFormChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setEditFormData({
                ...editFormData,
                [parent]: {
                    ...editFormData[parent],
                    [child]: value
                }
            });
        } else {
            setEditFormData({
                ...editFormData,
                [name]: type === 'checkbox' ? checked : value
            });
        }
    };

    // Handle edit form submit
    const handleEditFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/orders/${selectedOrder._id}`, editFormData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                    'Content-Type': 'application/json'
                }
            });

            // Update order in state
            setOrders(orders.map(order =>
                order._id === selectedOrder._id ? { ...order, ...editFormData } : order
            ));
            toast.success("order placed successfully.")
            navigate("/")
            setIsEditModalOpen(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    // Handle delete order
    const handleDeleteOrder = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/orders/:${selectedOrder._id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`
                }
            });

            // Remove order from state
            setOrders(orders.filter(order => order._id !== selectedOrder._id));
            setIsDeleteModalOpen(false);
            toast.success("order deleted successfully");
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    return (
        <div className="container mx-auto px-12 py-8">
            <h1 className="text-2xl font-bold mb-6">Order Management</h1>

            {/* Search and filter */}
            <div className="mb-6 flex justify-between items-center">
                <div className="relative w-64">
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
                <div className="flex space-x-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        Total: {orders.length}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        Paid: {orders.filter(order => order.isPaid).length}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        Delivered: {orders.filter(order => order.isDelivered).length}
                    </span>
                </div>
            </div>

            {/* Error message */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Orders table */}
            {loading ? (
                <div className="text-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-3 text-gray-600">Loading orders...</p>
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No orders found.</p>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Order ID</th>
                                <th className="py-3 px-6 text-left">Date</th>
                                <th className="py-3 px-6 text-left">Customer</th>
                                <th className="py-3 px-6 text-center">Total</th>
                                <th className="py-3 px-6 text-center">Paid</th>
                                <th className="py-3 px-6 text-center">Delivered</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm">
                            {filteredOrders.map((order) => (
                                <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-6 text-left">
                                        <span className="font-medium">{order._id.substring(0, 8)}...</span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {formatDate(order.createdAt)}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <div className="font-medium">{order.user}</div>
                                        {/* <div className="font-medium">{order.name}</div> */}
                                        <div className="text-xs text-gray-500">{order.shippingAddress.city}, {order.shippingAddress.country}</div>
                                    </td>
                                    <td className="py-3 px-6 text-center font-medium">${order.totalPrice.toFixed(2)}</td>
                                    <td className="py-3 px-6 text-center">
                                        {order.isPaid ? (
                                            <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs">
                                                {formatDate(order.paidAt)}
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => handleMarkAsPaid(order._id)}
                                                className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-xs hover:bg-blue-200"
                                            >
                                                Mark Paid
                                            </button>
                                        )}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        {order.isDelivered ? (
                                            <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs">
                                                {formatDate(order.deliveredAt)}
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => handleMarkAsDelivered(order._id)}
                                                className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-xs hover:bg-blue-200"
                                            >
                                                Mark Delivered
                                            </button>
                                        )}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-center space-x-3">
                                            <button onClick={() => handleViewOrder(order)} className="text-blue-500 hover:text-blue-700">
                                                <FaEye size={16} />
                                            </button>
                                            <button onClick={() => handleEditClick(order)} className="text-yellow-500 hover:text-yellow-700">
                                                <FaEdit size={16} />
                                            </button>
                                            <button onClick={() => handleDeleteClick(order)} className="text-red-500 hover:text-red-700">
                                                <FaTrash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* View Order Modal */}
            {isViewModalOpen && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="border-b px-6 py-4 flex justify-between items-center">
                            <h3 className="text-xl font-bold">Order Details</h3>
                            <button
                                onClick={() => setIsViewModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold text-gray-700 mb-2">Order Information</h4>
                                    <p className="mb-1"><span className="font-medium">ID:</span> {selectedOrder._id}</p>
                                    <p className="mb-1"><span className="font-medium">Date:</span> {formatDate(selectedOrder.createdAt)}</p>
                                    <p className="mb-1"><span className="font-medium">Total:</span> ${selectedOrder.totalPrice.toFixed(2)}</p>
                                    <p className="mb-1">
                                        <span className="font-medium">Payment:</span> {selectedOrder.paymentMethod}
                                        {selectedOrder.isPaid ?
                                            <span className="ml-2 bg-green-100 text-green-800 py-0.5 px-2 rounded-full text-xs">Paid on {formatDate(selectedOrder.paidAt)}</span> :
                                            <span className="ml-2 bg-yellow-100 text-yellow-800 py-0.5 px-2 rounded-full text-xs">Not Paid</span>}
                                    </p>
                                    <p className="mb-3">
                                        <span className="font-medium">Delivery:</span>
                                        {selectedOrder.isDelivered ?
                                            <span className="ml-2 bg-green-100 text-green-800 py-0.5 px-2 rounded-full text-xs">Delivered on {formatDate(selectedOrder.deliveredAt)}</span> :
                                            <span className="ml-2 bg-yellow-100 text-yellow-800 py-0.5 px-2 rounded-full text-xs">Not Delivered</span>}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-700 mb-2">Shipping Information</h4>
                                    <p className="mb-1"><span className="font-medium">Address:</span> {selectedOrder.shippingAddress.address}</p>
                                    <p className="mb-1"><span className="font-medium">City:</span> {selectedOrder.shippingAddress.city}</p>
                                    <p className="mb-1"><span className="font-medium">Postal Code:</span> {selectedOrder.shippingAddress.postalCode}</p>
                                    <p className="mb-1"><span className="font-medium">Country:</span> {selectedOrder.shippingAddress.country}</p>
                                </div>
                            </div>

                            <h4 className="font-bold text-gray-700 mt-6 mb-2">Order Items</h4>
                            <div className="border rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {selectedOrder.orderItems.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 flex-shrink-0 mr-4">
                                                            {item.image && <img className="h-10 w-10 rounded-full object-cover" src={item.image} alt={item.name} />}
                                                        </div>
                                                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{item.qty}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">${item.price.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-gray-50">
                                        <tr>
                                            <td colSpan="2" className="px-6 py-3 text-right font-medium">Total:</td>
                                            <td className="px-6 py-3 text-right font-bold">${selectedOrder.totalPrice.toFixed(2)}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                        <div className="border-t px-6 py-4 flex justify-end">
                            <button
                                onClick={() => setIsViewModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Order Modal */}
            {isEditModalOpen && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-2xl">
                        <div className="border-b px-6 py-4 flex justify-between items-center">
                            <h3 className="text-xl font-bold">Edit Order</h3>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                &times;
                            </button>
                        </div>
                        <form onSubmit={handleEditFormSubmit}>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Street Address
                                        </label>
                                        <input
                                            type="text"
                                            name="shippingAddress.address"
                                            value={editFormData.shippingAddress.address}
                                            onChange={handleEditFormChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            name="shippingAddress.city"
                                            value={editFormData.shippingAddress.city}
                                            onChange={handleEditFormChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Postal Code
                                        </label>
                                        <input
                                            type="text"
                                            name="shippingAddress.postalCode"
                                            value={editFormData.shippingAddress.postalCode}
                                            onChange={handleEditFormChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            name="shippingAddress.country"
                                            value={editFormData.shippingAddress.country}
                                            onChange={handleEditFormChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Payment Method
                                        </label>
                                        <select
                                            name="paymentMethod"
                                            value={editFormData.paymentMethod}
                                            onChange={handleEditFormChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        >
                                            <option value="cash">Cash on Delivery</option>
                                            <option value="bank">Bank Transfer</option>
                                            <option value="card">Credit Card</option>
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Total Price
                                        </label>
                                        <input
                                            type="number"
                                            name="totalPrice"
                                            value={editFormData.totalPrice}
                                            onChange={handleEditFormChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="mb-4">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="isPaid"
                                                checked={editFormData.isPaid}
                                                onChange={handleEditFormChange}
                                                className="mr-2"
                                            />
                                            <span className="text-gray-700">Mark as Paid</span>
                                        </label>
                                    </div>

                                    <div className="mb-4">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="isDelivered"
                                                checked={editFormData.isDelivered}
                                                onChange={handleEditFormChange}
                                                className="mr-2"
                                            />
                                            <span className="text-gray-700">Mark as Delivered</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t px-6 py-4 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleEditFormSubmit()}
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-md">
                        <div className="border-b px-6 py-4">
                            <h3 className="text-xl font-bold text-gray-700">Confirm Delete</h3>
                        </div>
                        <div className="p-6">
                            <p className="mb-4">Are you sure you want to delete this order?</p>
                            <p className="mb-4 font-medium">Order ID: {selectedOrder._id}</p>
                            <p className="mb-4 text-sm text-gray-600">This action cannot be undone.</p>
                        </div>
                        <div className="border-t px-6 py-4 flex justify-end space-x-3">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteOrder}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersManager;