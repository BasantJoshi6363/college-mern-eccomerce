import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Footer from "./component/layout/Footer"
import Navbar from './component/layout/Navbar'
import SignUp from './pages/Auth/SignUp'
import Home from './pages/Home'
import PageNot from './component/PageNot'
import BrowseByCategory from './component/BrowseByCategory'
import SinglePage from './component/SinglePage'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/cat/:category' element={<BrowseByCategory/>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<SignUp />}></Route>
        <Route path='/about' element={<SignUp />}></Route>
        <Route path='/contact' element={<SignUp />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/*' element={<PageNot />}></Route>
        <Route path='/products/:id' element={<SinglePage />}></Route>
      </Routes>
      {/* <Footer /> */}
    </div>
  )
}

export default App