import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'

const ProductsDetailsComp = () => {
  const [showData, setShowData] = useState(false)
  const [showFeatures, setShowFeatures] = useState(false)
  const data = [
    {
      id: 1,
      title: "SmartHome X2000 – Advanced Home Automation System",
      description: "The SmartHome X2000 is a cutting-edge home automation system designed to make your living space smarter, safer, and more energy-efficient. With a sleek interface and intuitive controls, this system seamlessly integrates lighting, security, climate, and entertainment devices into a single, easy-to-use platform. Its intelligent AI-powered algorithms learn your daily habits and adjust settings automatically, ensuring maximum comfort while minimizing energy consumption. The SmartHome X2000 supports voice control, remote management via mobile app, and is compatible with major smart home ecosystems including Alexa, Google Home, and Apple HomeKit. Whether you are at home or away, you can monitor and control your home in real-time, receiving instant alerts in case of unusual activity or emergencies.",
      briefDetails: "The SmartHome X2000 is a cutting-edge solution designed to elevate the way you live by combining convenience, efficiency, and intelligence. Equipped with advanced automation features, it allows you to control lighting, climate, security, and entertainment systems effortlessly through a single, user-friendly interface. Its AI learning capabilities adapt to your routines and preferences, ensuring your home environment is always optimized for comfort and efficiency. The system’s energy management tools monitor and reduce unnecessary power consumption, helping you save on utility costs while promoting a sustainable lifestyle. Beyond individual device control, the SmartHome X2000 seamlessly integrates with a wide range of smart devices, from thermostats and cameras to appliances and voice assistants, creating a truly interconnected ecosystem. Reliable, intuitive, and forward-thinking, the SmartHome X2000 is more than just technology—it’s an essential choice for modern homes, providing peace of mind, convenience, and intelligent living.",
      features: [
        "AI-powered learning adjusts settings automatically for comfort and efficiency.",
        "Remote access via mobile app to monitor and control devices anywhere.",
        "Voice control compatible with Alexa, Google Home, and Apple HomeKit.",
        "Energy management system tracks usage and optimizes consumption.",
        "Smart security alerts for unusual activities or emergencies.",
        "Customizable automation schedules for lighting, climate, and entertainment.",
        "Sleek and intuitive interface for easy installation and use."
      ]
    }
  ]
  return (
    <div className='h-screen overflow-y-auto'>
      <div className=''>
        <div className=" bg-base-100  shadow-sm mb-6 py-4 px-2 shrink-0 border border-gray-100 hover:border hover:border-gray-400 hover:shadow-md flex flex-col md:flex-row card w-full min-h-[300px]">
          <figure className='w-full md:w-1/2 lg:min-w-[600px]'>
            <img
              src={`https://placehold.co/600x400?text=Image`}
              alt="Shoes"
              className='w-full object-contain'
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-green-400 text-2xl mb-4">{data[0].title}</h2>
            <p className='text-lg md:text-xl'>{data[0].description}</p>
          </div>
        </div>
        <div className='border  border-gray-400 h-full w-full px-2 py-1'>
          <div>
            <h1 className='text-4xl font-bold text-black text-center'>Product Brief Detail And Features</h1>
          </div>
          <div className='mt-4  border border-gray-300 px-2 rounded-md'>
            <div className='flex justify-between items-center'>
              <h4 className='text-lg font-semibold'>Breif Detail</h4>
              <div>
                {showData ? (
                  <ChevronUp onClick={() => setShowData(false)} className='size-8 text-black cursor-pointer' />
                ) : (
                  <ChevronDown onClick={() => setShowData(true)} className='size-8 text-black cursor-pointer' />
                )}
              </div>
            </div>
          </div>
          {showData && (
            <div className='border border-gray-400 mt-1 rounded-b-md'>
              <p className='px-2 py-3'>{data[0].briefDetails}</p>
            </div>
          )}
          <div className='mt-4  border border-gray-300 px-2 rounded-md'>
            <div className='flex justify-between items-center'>
              <h4 className='text-lg font-semibold'>Features</h4>
              <div>
                {showFeatures ? (
                  <ChevronUp onClick={() => setShowFeatures(false)} className='size-8 text-black cursor-pointer' />
                ) : (
                  <ChevronDown onClick={() => setShowFeatures(true)} className='size-8 text-black cursor-pointer' />
                )}
              </div>
            </div>
          </div>
          {showFeatures && (
            <div className='border border-gray-400 mt-1 rounded-b-md px-2 py-1'>
              <ul className='list-disc ml-5'>
                {data[0].features.map((v,i)=>(
                  <li key={i} className='text-base md:text-lg font-medium'>{v}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductsDetailsComp