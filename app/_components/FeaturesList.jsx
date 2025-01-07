import { ChartArea, ChartBar, ChartBarBigIcon } from 'lucide-react'
import React from 'react'

const FeaturesList = () => {
  return (
    <div className='mt-5'>
        <h2 className='text-2xl font-bold text-green-600'>Features</h2>
        <div className='flex flex-wrap justify-around items-center gap-10 mt-2'>
            <h2 className='flex bg-green-50 gap-2 p-10 border border-green-600 rounded-lg w-[300px] items-center text-green-900 hover:scale-105 hover:bg-green-200 transition-all ease-in cursor-pointer'><ChartBarBigIcon/> Customized Diet Plan</h2>
            <h2 className='flex bg-green-50 gap-2 p-10 border border-green-600 rounded-lg   w-[300px] items-center text-green-900 hover:scale-105 transition-all hover:bg-green-200 ease-in cursor-pointer'><ChartBar/>Customized Recipes Plan</h2>
            <h2 className='flex bg-green-50 gap-2 p-10 border border-green-600 rounded-lg  w-[300px] items-center text-green-900 hover:scale-105 transition-all hover:bg-green-200 ease-in cursor-pointer'><ChartArea/> Growth Chart</h2>
        </div>

    </div>
  )
}

export default FeaturesList