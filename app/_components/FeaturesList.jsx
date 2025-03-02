// FeaturesList.jsx

import React, { useState, useEffect } from "react"
import { ChartArea, ChartBarBigIcon } from "lucide-react"

// If you're using @/components/ui/dialog from a specific library, adjust these imports
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"

import GrowthChartBoys from "./GrowthChartBoys"
import GrowthChartGirls from "./GrowthChartGirls"

export default function FeaturesList() {
  // For the Customized Diet Plan modal
  const [isDietPlanModalOpen, setIsDietPlanModalOpen] = useState(false)
  const [dietPlan, setDietPlan] = useState("")

  // For the Growth Chart modal
  const [isGrowthChartModalOpen, setIsGrowthChartModalOpen] = useState(false)

  // Retrieve user data from localStorage
  const [gender, setGender] = useState("")
  const [userAge, setUserAge] = useState(null)
  const [userHeight, setUserHeight] = useState(null)

  // On initial render, load data from localStorage
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

  // Handle "Customized Diet Plan" click
  const handleDietPlanClick = () => {
    if (!dietPlan) {
      alert("No diet plan found. Please generate one in NutriBot first.")
      return
    }
    setIsDietPlanModalOpen(true)
  }

  // Handle "Growth Chart" click
  const handleGrowthChartClick = () => {
    if (!gender) {
      alert("Gender not found. Please fill out NutriBot form first.")
      return
    }
    setIsGrowthChartModalOpen(true)
  }

  return (
    <div className="mt-5">
      <h2 className="text-2xl font-bold text-green-600">Features</h2>
      <div className="flex flex-wrap justify-around items-center gap-10 mt-2">
        {/* 1) Customized Diet Plan Card */}
        <h2
          onClick={handleDietPlanClick}
          className="flex bg-green-50 gap-2 p-10 border border-green-600 
                     rounded-lg w-[300px] items-center text-green-900 
                     hover:scale-105 hover:bg-green-200 transition-all 
                     ease-in cursor-pointer"
        >
          <ChartBarBigIcon />
          Customized Diet Plan
        </h2>

        {/* 2) Growth Chart Card */}
        <h2
          onClick={handleGrowthChartClick}
          className="flex bg-green-50 gap-2 p-10 border border-green-600 
                     rounded-lg w-[300px] items-center text-green-900 
                     hover:scale-105 hover:bg-green-200 transition-all 
                     ease-in cursor-pointer"
        >
          <ChartArea />
          Growth Chart
        </h2>
      </div>

      {/* Modal for the Customized Diet Plan */}
      <Dialog open={isDietPlanModalOpen} onOpenChange={setIsDietPlanModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Your Customized Diet Plan</DialogTitle>
          </DialogHeader>
          <div className="p-4 border rounded-lg bg-card overflow-y-auto max-h-[60vh] text-sm text-foreground">
            { <div dangerouslySetInnerHTML={{ __html: dietPlan }} /> || "No diet plan found."}
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal for the Growth Chart */}
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
