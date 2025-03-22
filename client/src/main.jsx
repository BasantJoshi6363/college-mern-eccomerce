import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext"
import { ToastContainer } from "react-toastify"
import { ProductProvider } from './context/ProductContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ToastContainer />
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </BrowserRouter>
)
