import { ChartArea, ChartBar, ChartBarBigIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import protein from '../../public/protein.webp'
import vitamins from '../../public/vitamins.webp'
import fiber from '../../public/fibers.webp'
import minerals from '../../public/minerals.webp'
import antioxidants from '../../public/anti .webp'
import { Button } from '@/components/ui/button'

const SubCategory = () => {
  return (
    <div className='mt-5'>
        <h2 className='text-2xl font-bold text-green-600'>Sub-Categories</h2>
        <div className='flex flex-wrap justify-around items-center gap-4 mt-2'>
            <div className='flex flex-col bg-green-50 gap-10 p-10 h-[350px] rounded-lg w-[250px] justify-center items-center text-green-900 hover:scale-105 hover:bg-green-200 transition-all ease-in cursor-pointer'>
              <Image src={protein} alt='protein' width={100} height={100} className='h-[200px] w-[200px] object-cover' />
              <Button>Protein</Button>
            </div>
            <div className='flex flex-col bg-green-50 gap-10 h-[350px] p-10 rounded-lg w-[250px] items-center text-green-900 hover:scale-105 transition-all hover:bg-green-200 ease-in cursor-pointer'>
            <Image src={vitamins} alt='vitamins' width={100} height={100} className='h-[200px] w-[200px] object-cover' />
              <Button>Vitamins</Button>
            </div>
            <div className='flex flex-col bg-green-50 gap-10 p-10 rounded-lg w-[250px] h-[350px] items-center text-green-900 hover:scale-105 transition-all hover:bg-green-200 ease-in cursor-pointer'>
            <Image src={minerals} alt='minerals' width={100} height={100} className='h-[200px] w-[200px] object-cover' />
              <Button>Minerals</Button>
            </div>
            <div className='flex flex-col bg-green-50 gap-10 p-10 rounded-lg w-[250px] h-[350px] items-center text-green-900 hover:scale-105 transition-all hover:bg-green-200 ease-in cursor-pointer'>
            <Image src={fiber} alt='fiber' width={100} height={300} className='h-[200px] w-[200px] object-cover' />
              <Button>Fiber</Button>
            </div>
            <div className='flex flex-col bg-green-50 gap-10 p-10 rounded-lg w-[250px] h-[350px] items-center text-green-900 hover:scale-105 transition-all hover:bg-green-200 ease-in cursor-pointer'>
            <Image src={antioxidants} alt='antioxidants' width={100} height={300} className='h-[200px] w-[200px] object-cover' />
              <Button>Antioxidants</Button>
            </div>
        </div>


    </div>
  )
}

export default SubCategory