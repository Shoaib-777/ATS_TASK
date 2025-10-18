import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductsDetails from './pages/ProductsDetails'
import BgRemove from './pages/BgRemove'
// import Test from './pages/test'

const App = () => {
  return (
     <Routes>
        {/* static routes */}
        <Route path="/" element={<Home />} />
        <Route path="/bg-remove" element={<BgRemove />} />
        {/* <Route path="/test" element={<Test />} /> */}

        {/* dynamic route */}
        <Route path="/products/:id" element={<ProductsDetails />} />
      </Routes>
  )
}

export default App