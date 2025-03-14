import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { Auth0Provider } from "@auth0/auth0-react"

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-imw5hyyzgcdlfmlr.us.auth0.com"
    clientId="tVDBpofv9HsUA67sBHj3E6gJB2HhLUVN"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    cacheLocation='localstorage'
  >
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </Auth0Provider>
)
