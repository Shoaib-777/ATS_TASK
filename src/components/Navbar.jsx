import { Menu } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='w-full h-15 bg-white max-h-16'>
            <div className='flex justify-between  items-center gap-x-2 container mx-auto border border-black px-4 py-2'>
                <div>
                    <Link to={"/"}><img src="https://aspireths.com/wp-content/uploads/2023/06/Blue-Modern-School-Logo-1.png" alt="icon" className='rounded-full size-16 object-contain' /></Link>
                </div>
                <div className='hidden md:flex flex-1 ml-[5rem]'>
                    <ul className='flex gap-x-4 items-center w-full justify-start font-bold'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Products</li>
                        <li>Services</li>
                    </ul>
                </div>
                <div className="drawer drawer-end md:hidden flex flex-col justify-end items-end">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary"><Menu/></label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                            <li>Home</li>
                            <li>About Us</li>
                            <li>Products</li>
                            <li>Services</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar