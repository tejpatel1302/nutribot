"use client"
import { useState, useEffect } from "react"
import { AreaChartIcon as ChartArea, BarChartBigIcon as ChartBarBigIcon } from "lucide-react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import GrowthChartBoys from "./GrowthChartBoys"
import GrowthChartGirls from "./GrowthChartGirls"
import { useRouter } from "next/navigation"
import { toast, Toaster } from "sonner"

export default function FeaturesList() {
  const router = useRouter()
  const [isDietPlanModalOpen, setIsDietPlanModalOpen] = useState(false)
  const [dietPlan, setDietPlan] = useState("")
  const [isGrowthChartModalOpen, setIsGrowthChartModalOpen] = useState(false)
  const [gender, setGender] = useState("")
  const [userAge, setUserAge] = useState(null)
  const [userHeight, setUserHeight] = useState(null)

  useEffect(() => {
    const storedPlan = localStorage.getItem("dietPlan")
    const storedGender = localStorage.getItem("gender")
    const storedAge = localStorage.getItem("userAge")
    const storedHeight = localStorage.getItem("userHeight")

    if (storedPlan) {
      setDietPlan(storedPlan)
    }
    if (storedGender) {
      setGender(storedGender)
    }
    if (storedAge) {
      setUserAge(Number.parseFloat(storedAge))
    }
    if (storedHeight) {
      setUserHeight(Number.parseFloat(storedHeight))
    }
  }, [])

 

  const handleDietPlanClick = () => {
    if (!dietPlan) {
      toast.error('Please generate a diet plan in NutriBot first.')
      return
    }
    router.push("/diet-plan")
  }

  const handleGrowthChartClick = () => {
   
    router.push("/growth-chart")
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <div className="mt-12 py-8">
      <Toaster position="top-center" richColors />  
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-green-700 inline-block relative">
          Features
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-200 rounded-full"></span>
        </h2>
        <p className="text-green-600 mt-2">Discover tools designed to support your nutritional journey</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-wrap justify-around items-center gap-10 mt-8"
      >
        <motion.div variants={item} className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <motion.div
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            onClick={handleDietPlanClick}
            className="relative flex flex-col bg-gradient-to-br from-green-50 to-green-100 gap-4 p-8 border border-green-200 
                      rounded-xl w-[320px] h-[220px] items-center justify-center text-green-800 
                      transition-all ease-in cursor-pointer shadow-md"
          >
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gradient-to-br from-green-100 to-green-200 p-5 rounded-full shadow-inner"
            >
              <ChartBarBigIcon className="h-10 w-10 text-green-600" />
            </motion.div>
            <h3 className="text-xl font-semibold mt-2">Customized Diet Plan</h3>
            <p className="text-sm text-center text-green-700">
              Personalized nutrition plans based on your health profile
            </p>
            <div className="absolute bottom-3 right-3">
              <motion.div
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  duration: 1.5,
                }}
                className="text-green-600 text-xs font-medium"
              >
                {dietPlan ? "View Your Plan →" : "Create Plan →"}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={item} className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <motion.div
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            onClick={handleGrowthChartClick}
            className="relative flex flex-col bg-gradient-to-br from-green-50 to-green-100 gap-4 p-8 border border-green-200 
                      rounded-xl w-[320px] h-[220px] items-center justify-center text-green-800 
                      transition-all ease-in cursor-pointer shadow-md"
          >
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: -15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gradient-to-br from-green-100 to-green-200 p-5 rounded-full shadow-inner"
            >
              <ChartArea className="h-10 w-10 text-green-600" />
            </motion.div>
            <h3 className="text-xl font-semibold mt-2">Growth Chart</h3>
            <p className="text-sm text-center text-green-700">
              Track and visualize growth patterns with interactive charts
            </p>
            <div className="absolute bottom-3 right-3">
              <motion.div
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  duration: 1.5,
                }}
                className="text-green-600 text-xs font-medium"
              >
                {gender ? "View Your Chart →" : "Create Chart →"}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Status indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-10 flex justify-center"
      >
        <div className="bg-green-50 border border-green-200 rounded-full px-6 py-2 flex items-center gap-2 shadow-sm">
          <div
            className={`h-3 w-3 rounded-full ${dietPlan && gender ? "bg-green-500" : "bg-amber-500"} animate-pulse`}
          ></div>
          <span className="text-sm text-green-800">
            {dietPlan && gender ? "Your nutrition profile is complete" : "Complete your profile in NutriBot"}
          </span>
        </div>
      </motion.div>

      {/* Modals - keeping the same functionality */}
      <Dialog open={isDietPlanModalOpen} onOpenChange={setIsDietPlanModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Your Customized Diet Plan</DialogTitle>
          </DialogHeader>
          <div className="p-4 border rounded-lg bg-card overflow-y-auto max-h-[60vh] text-sm text-foreground">
            {dietPlan}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isGrowthChartModalOpen} onOpenChange={setIsGrowthChartModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Growth Chart</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            {gender === "male" ? (
              <GrowthChartBoys userAge={userAge} userHeight={userHeight} />
            ) : gender === "female" ? (
              <GrowthChartGirls userAge={userAge} userHeight={userHeight} />
            ) : (
              <p className="text-sm">
                Growth chart not available for gender: <strong>{gender}</strong>.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
