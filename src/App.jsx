import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductsDetails from './pages/ProductsDetails'
import BgRemove from './pages/BgRemove'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/bg-remove/' element={<BgRemove />}/>
      <Route path='/products/:id' element={<ProductsDetails />}/>
    </Routes>
  )
}

export default App