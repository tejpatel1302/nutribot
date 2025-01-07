import { ChartArea, ChartBar, ChartBarBigIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import mocktail from '../../public/mocktail.webp'
import cocktail from '../../public/cocktail.jpg'
import softdrink from '../../public/SoftDrinks.jpg'
import juice from '../../public/juice.jpg'
import shakes from '../../public/shake.jpg'
import { Button } from '@/components/ui/button'

const SubCategory = () => {
  return (
    <div className='mt-5'>
        <h2 className='text-2xl font-bold text-green-600'>Sub-Categories For Drinks</h2>
        <div className='flex flex-wrap justify-around items-center gap-4 mt-2'>
            <div className='flex flex-col bg-green-50 gap-10 p-10 h-[350px]   rounded-lg w-[250px] justify-center items-center text-green-900 hover:scale-105 hover:bg-green-200 transition-all ease-in cursor-pointer'>
              <Image src={mocktail} alt='mt' width={100} height={100} className='h-[200px] w-[200px] object-cover' />
              
              <Button>MockTail</Button>

            </div>
            <div className='flex flex-col bg-green-50 gap-10 h-[350px]  p-10   rounded-lg   w-[250px] items-center text-green-900 hover:scale-105 transition-all hover:bg-green-200 ease-in cursor-pointer'>
            <Image src={cocktail} alt='mt' width={100} height={100} className='h-[200px] w-[200px] object-cover' />
              
              <Button>CockTail</Button>
            </div>
            <div className='flex flex-col bg-green-50 gap-10  p-10   rounded-lg   w-[250px] h-[350px] items-center text-green-900 hover:scale-105 transition-all hover:bg-green-200 ease-in cursor-pointer'>
            <Image src={softdrink} alt='mt' width={100} height={100} className='h-[200px] w-[200px] object-cover' />
              
              <Button>Soft Drinks</Button>
            </div>
            <div className='flex flex-col bg-green-50 gap-10  p-10   rounded-lg   w-[250px] h-[350px] items-center text-green-900 hover:scale-105 transition-all hover:bg-green-200 ease-in cursor-pointer'>
            <Image src={juice} alt='mt' width={100} height={300} className='h-[200px] w-[200px] object-cover' />
              
              <Button>Juices</Button>
            </div>
            <div className='flex flex-col bg-green-50 gap-10  p-10   rounded-lg   w-[250px] h-[350px] items-center text-green-900 hover:scale-105 transition-all hover:bg-green-200 ease-in cursor-pointer'>
            <Image src={shakes} alt='mt' width={100} height={300} className='h-[200px] w-[200px] object-cover' />
              
              <Button>Shakes</Button>
            </div>
        </div>

    </div>
  )
}

export default SubCategory