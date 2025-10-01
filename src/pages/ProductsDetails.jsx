import React from 'react'
import Navbar from '../components/Navbar'
import ProductsDetailsComp from '../components/ProductsDetailsComp'

const ProductsDetails = () => {
  return (
    <div className='container mx-auto'>
        <Navbar/>
        <div className='mt-6 border border-black w-full px-4 py-6'>
            <ProductsDetailsComp/>
        </div>
    </div>
  )
}

export default ProductsDetails