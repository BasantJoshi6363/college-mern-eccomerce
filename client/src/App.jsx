import { memo, Suspense, lazy, useContext } from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./component/layout/Navbar"
import Footer from "./component/layout/Footer"
import ProtectedRoute from "./component/ProtectedRoute"
import PublicRoute from "./component/PublicRoute"

const Home = lazy(() => import("./component/Home"))
const Login = lazy(() => import("./component/Login"))
const Register = lazy(() => import("./component/Register"))
const CreateProduct = lazy(() => import("./component/Product/CreateProduct"))
const ViewProduct = lazy(() => import("./component/Product/ViewProduct"))
const UpdateProduct = lazy(() => import("./component/Product/UpdateProduct"))
const SinglePage = lazy(() => import("./component/SinglePage"))
const Cart = lazy(() => import("./component/cart/Cart"))
const Checkout = lazy(() => import("./component/Checkout"))
const Signout = lazy(() => import("./component/Signout"))
const BrowseByCategory = lazy(() => import("./component/BrowseByCategory"))
const NotFound = lazy(() => import("./component/NotFound"))
const Profile = lazy(() => import("./component/Profile"))
import { AuthContext } from "./context/AuthContext"
import OrdersManager from "./component/Product/OrderManager"
import UserManagement from "./component/Admin/UserManagement"
import Admin from "./component/Admin/Admin"
// Loading fallback component
const LoadingFallback = () => (

  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
)

const App = () => {
  const { admin } = useContext(AuthContext);
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Protected routes */}
            <Route
              path="/"
              element={
                <Home />
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreateProduct />
                </ProtectedRoute>
              }
            />
            {admin && (<Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ViewProduct />
                </ProtectedRoute>
              }
            />)}
            {admin && (<Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrdersManager />
                </ProtectedRoute>
              }
            />)}
            {admin && (<Route
              path="/users"
              element={
                <ProtectedRoute>
                  <UserManagement />
                </ProtectedRoute>
              }
            />)}

            {admin && (<Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />)}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />


            <Route
              path="/categories/:category"
              element={
                <BrowseByCategory />
              }
            />
            <Route
              path="/products/edit/:id"
              element={
                <ProtectedRoute>
                  <UpdateProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            {/* Public routes */}
            <Route path="/products/:id" element={<SinglePage />} />
            <Route path="/:categories/:category/products/:id" element={<SinglePage />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route path="/signout" element={<Signout />} />

            {/* Static pages */}
            <Route path="/contact" element={<h1 className="p-8 text-center text-2xl">Welcome to contact page</h1>} />
            <Route path="/about" element={<h1 className="p-8 text-center text-2xl">Welcome to about page</h1>} />

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default memo(App)

