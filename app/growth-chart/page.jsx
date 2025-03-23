"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GrowthChartDisplay } from "./GrowthChartDisplay"
import UserDetailsForm from "./UserDetailsForm"

export default function GrowthChartPage() {
  const router = useRouter()
  const [userData, setUserData] = useState({
    height: "",
    weight: "",
    role: "child-male",
    date: new Date().toISOString().split("T")[0],
    age: "",
  })

  const [chartData, setChartData] = useState(null)
  const [activeTab, setActiveTab] = useState("form")

  // Load any existing data from localStorage on initial render
  useEffect(() => {
    const storedData = localStorage.getItem("growthChartUserData")
    if (storedData) {
      setUserData(JSON.parse(storedData))
    }
  }, [])

  const handleFormSubmit = (formData) => {
    // Save the data to localStorage
    localStorage.setItem("growthChartUserData", JSON.stringify(formData))

    // Update state
    setUserData(formData)

    // Generate chart data based on the role and measurements
    generateChartData(formData)

    // Switch to chart tab
    setActiveTab("chart")
  }

  const generateChartData = (data) => {
    // In a real application, this would use actual growth chart data
    // For this example, we'll create some sample data based on the role

    let chartData

    switch (data.role) {
      case "child-male":
        chartData = generateMaleChildChartData(
          Number.parseFloat(data.age),
          Number.parseFloat(data.height),
          Number.parseFloat(data.weight),
        )
        break
      case "child-female":
        chartData = generateFemaleChildChartData(
          Number.parseFloat(data.age),
          Number.parseFloat(data.height),
          Number.parseFloat(data.weight),
        )
        break
      case "adult-male":
        chartData = generateAdultMaleChartData(Number.parseFloat(data.height), Number.parseFloat(data.weight))
        break
      case "adult-female":
        chartData = generateAdultFemaleChartData(Number.parseFloat(data.height), Number.parseFloat(data.weight))
        break
      default:
        chartData = []
    }

    setChartData(chartData)
  }

  // Sample data generators for different roles
  const generateMaleChildChartData = (age, height, weight) => {
    // WHO growth chart data for boys (simplified)
    const agePoints = Array.from({ length: 19 }, (_, i) => i + 2)

    return {
      heightData: agePoints.map((a) => ({
        age: a,
        p3: 80 + a * 5.2,
        p50: 85 + a * 6,
        p97: 90 + a * 6.8,
        user: a === age ? height : null,
      })),
      weightData: agePoints.map((a) => ({
        age: a,
        p3: 10 + a * 2,
        p50: 13 + a * 2.5,
        p97: 16 + a * 3,
        user: a === age ? weight : null,
      })),
      userAge: age,
      userHeight: height,
      userWeight: weight,
      role: "child-male",
    }
  }

  const generateFemaleChildChartData = (age, height, weight) => {
    // WHO growth chart data for girls (simplified)
    const agePoints = Array.from({ length: 19 }, (_, i) => i + 2)

    return {
      heightData: agePoints.map((a) => ({
        age: a,
        p3: 78 + a * 5,
        p50: 82 + a * 5.8,
        p97: 88 + a * 6.5,
        user: a === age ? height : null,
      })),
      weightData: agePoints.map((a) => ({
        age: a,
        p3: 9 + a * 1.8,
        p50: 12 + a * 2.3,
        p97: 15 + a * 2.8,
        user: a === age ? weight : null,
      })),
      userAge: age,
      userHeight: height,
      userWeight: weight,
      role: "child-female",
    }
  }

  const generateAdultMaleChartData = (height, weight) => {
    // BMI chart for adult males
    const bmi = weight / ((height / 100) * (height / 100))

    return {
      bmiData: [
        { category: "Underweight", range: "< 18.5", user: bmi < 18.5 ? bmi : null },
        { category: "Normal", range: "18.5 - 24.9", user: bmi >= 18.5 && bmi <= 24.9 ? bmi : null },
        { category: "Overweight", range: "25 - 29.9", user: bmi >= 25 && bmi <= 29.9 ? bmi : null },
        { category: "Obese", range: "> 30", user: bmi >= 30 ? bmi : null },
      ],
      height,
      weight,
      bmi,
      role: "adult-male",
    }
  }

  const generateAdultFemaleChartData = (height, weight) => {
    // BMI chart for adult females (same as males but kept separate for potential customization)
    const bmi = weight / ((height / 100) * (height / 100))

    return {
      bmiData: [
        { category: "Underweight", range: "< 18.5", user: bmi < 18.5 ? bmi : null },
        { category: "Normal", range: "18.5 - 24.9", user: bmi >= 18.5 && bmi <= 24.9 ? bmi : null },
        { category: "Overweight", range: "25 - 29.9", user: bmi >= 25 && bmi <= 29.9 ? bmi : null },
        { category: "Obese", range: "> 30", user: bmi >= 30 ? bmi : null },
      ],
      height,
      weight,
      bmi,
      role: "adult-female",
    }
  }

  return (
    <div className="w-11/12 mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Growth Chart</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="form">User Details</TabsTrigger>
          <TabsTrigger value="chart" disabled={!chartData}>
            Growth Chart
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="mt-0">
          <Card className="p-6">
            <UserDetailsForm initialData={userData} onSubmit={handleFormSubmit} />
          </Card>
        </TabsContent>

        <TabsContent value="chart" className="mt-0">
          <Card className="p-6">{chartData && <GrowthChartDisplay data={chartData} />}</Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

