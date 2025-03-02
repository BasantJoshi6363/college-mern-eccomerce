import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { Auth0Provider } from "@auth0/auth0-react"

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-imw5hyyzgcdlfmlr.us.auth0.com"
    clientId="YRACc08ZXgXnOC0QYCj5jIPNqMTe9PFr"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    cacheLocation='localstorage'
    >
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </Auth0Provider>
)
