import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Footer from "./component/layout/Footer"
import Navbar from './component/layout/Navbar'
import Home from './pages/Home'
import PageNot from './component/PageNot'
import BrowseByCategory from './component/BrowseByCategory'
import SinglePage from './component/SinglePage'
import Cart from './component/cart/Cart'
import { useAuth0 } from '@auth0/auth0-react'
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/' element={<Home />}></Route>
        {/* <Route path='/cat/:category' element={<BrowseByCategory />}></Route>
        
        <Route path='/register' element={<SignUp />}></Route>
        <Route path='/about' element={<SignUp />}></Route>
        <Route path='/contact' element={<SignUp />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/*' element={<PageNot />}></Route>
        <Route path='/products/:id' element={<SinglePage />}></Route>
        <Route path='/cart' element={<Cart />}></Route> */}
      </Routes>
      {/* <Footer /> */}
    </div>
  )
}

export default App