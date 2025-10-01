import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom';

const Home = () => {
  const productsData = [
    {
      id: 1,
      title: "Wireless Headphones",
      category: "frontend",
      description: "High-quality wireless headphones with noise-cancellation feature."
    },
    {
      id: 2,
      title: "Smart Watch",
      category: "backend",
      description: "A sleek smart watch that tracks your fitness and notifications."
    },
    {
      id: 3,
      title: "Gaming Laptop",
      category: "full stack",
      description: "Powerful gaming laptop with high refresh rate display and RGB keyboard."
    },
    {
      id: 4,
      title: "Bluetooth Speaker",
      category: "frontend",
      description: "Portable Bluetooth speaker with deep bass and long battery life."
    },
    {
      id: 5,
      title: "4K Action Camera",
      category: "backend",
      description: "Compact 4K action camera for capturing adventures and extreme sports."
    },
    {
      id: 6,
      title: "Bg Remove Webpage",
      category: "full stack",
      description: "Remove Your Background of images free with a Click and Free of cost"
    }
  ];

  // state for filter
  const [filter, setFilter] = useState("all");

  // filter logic
  const filteredProducts =
    filter === "all"
      ? productsData
      : productsData.filter((item) => item.category.toLowerCase() === filter);

  return (
    <div className=''>
      <Navbar />
      <div className='py-6 container mx-auto max-w-7xl px-2'>
        <div className='mb-4'>
          <h1 className='text-3xl text-center font-medium'>Our Products</h1>
          <p className='text-center'>Especially favourable compliment but thoroughly unreserved saw she themselves.</p>
        </div>

        <div className='w-full h-20 flex justify-end items-center'>
          <select
            onChange={(e) => setFilter(e.target.value)}
            className='outline-none border border-gray-300 rounded-md px-2 py-1 min-w-[200px]'
          >
            <option value="all">All</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="full stack">Full Stack</option>
          </select>
        </div>

        <div className='flex flex-wrap justify-center items-center gap-4'>
          {filteredProducts.map((v) => (
            <div
              key={v.id}
              className="card bg-base-100 w-96 shadow-sm mb-6 shrink-0 border border-gray-100 hover:border hover:border-gray-400 hover:shadow-md"
            >
              <figure>
                <img
                  src={`https://placehold.co/600x400?text=${v.title}`}
                  alt={v.title}
                  className='hover:scale-125'
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{v.title}</h2>
                <p className='line-clamp-2'>{v.description}</p>
                <div className="card-actions justify-end">
                  <Link to={v.id === 6 ? "/bg-remove" : `/products/${v.id}`}>
                    <button className="btn btn-primary">View Details</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
