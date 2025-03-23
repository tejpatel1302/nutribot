import { ChartArea, ChartBar, ChartBarBigIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import banner from '../../public/banner.jpg'

import { Button } from '@/components/ui/button'

const Banner = () => {
   const [dietPlan, setDietPlan] = useState("")
    const [gender, setGender] = useState("")
    const [userAge, setUserAge] = useState(null)
    const [userHeight, setUserHeight] = useState(null)
  
    useEffect(() => {
      const storedPlan = localStorage.getItem("dietPlan")
     
      const storedGender = localStorage.getItem("gender")
      console.log(storedGender,'gender')
      const storedAge = localStorage.getItem("userAge")
      const storedHeight = localStorage.getItem("userHeight")
  
      // If a plan was generated, store it in state
      if (storedPlan) {
        setDietPlan(storedPlan)
      }
      if (storedGender) {
        setGender(storedGender)
      }
      if (storedAge) {
        setUserAge(parseFloat(storedAge))
      }
      if (storedHeight) {
        setUserHeight(parseFloat(storedHeight))
      }
    }, [])
  return (
    <div className='mt-5'>
      
          {!dietPlan &&  <div className='w-full flex items-center justify-center bg-green-200 h-[200px]'>
            <Button >Generate Plan</Button>
            </div>
       }

    </div>
  )
}

export default Banner