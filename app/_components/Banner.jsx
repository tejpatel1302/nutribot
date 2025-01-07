import { ChartArea, ChartBar, ChartBarBigIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import banner from '../../public/banner.jpg'

import { Button } from '@/components/ui/button'

const Banner = () => {
  return (
    <div className='mt-5'>
      
            <div className='w-full flex items-center justify-center bg-green-200 h-[200px]'>
            <Button >Generate Plan</Button>
            </div>
       

    </div>
  )
}

export default Banner