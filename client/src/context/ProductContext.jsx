import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const { id } = useContext(AuthContext);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_BASE_URL = "http://localhost:5000";

    // Fetch Products
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/products/flashsale`);
            setProducts(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    const flashSale = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${API_BASE_URL}/api/products/flashsale`);
            setProducts(response.data)
        } catch (error) {
            setError(err.message)
        }
        finally {
            setLoading(false)
        }
    }

    // Add Product
    const addProduct = async (product) => {
        try {
            const data = {
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category: product.category,
                image: product.image,
                isFlash: product.isFlash,
                user: id


            }
            const response = await axios.post(`${API_BASE_URL}/api/products/create`, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                },
            });
            setProducts((prev) => [...prev, response.data]);
        } catch (err) {
            setError(err.message);
        }
    };

    // Edit Product
    const editProduct = async (id, updatedProduct) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${id}`, updatedProduct, {
                headers: { "Content-Type": "application/json" },
            });
            setProducts((prev) =>
                prev.map((product) => (product.id === id ? response.data : product))
            );
        } catch (err) {
            setError(err.message);
        }
    };

    // Delete Product
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/${id}`);
            setProducts((prev) => prev.filter((product) => product.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    // Fetch on mount
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider
            value={{
                products,
                loading,
                error,
                fetchProducts,
                addProduct,
                editProduct,
                deleteProduct,
                flashSale
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
