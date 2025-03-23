"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function GrowthChartDisplay({ data }) {
  const [activeMetric, setActiveMetric] = useState("height")

  // Render different charts based on the role
  const renderChart = () => {
    if (data.role === "child-male" || data.role === "child-female") {
      return renderChildChart()
    } else {
      return renderAdultChart()
    }
  }

  // Render growth charts for children
  const renderChildChart = () => {
    const chartData = activeMetric === "height" ? data.heightData : data.weightData
    const metric = activeMetric === "height" ? "Height (cm)" : "Weight (kg)"
    const userValue = activeMetric === "height" ? data.userHeight : data.userWeight

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">{data.role === "child-male" ? "Boys" : "Girls"} Growth Chart</h3>
            <p className="text-sm text-muted-foreground">
              Age: {data.userAge} years | {metric}: {userValue}
            </p>
          </div>

          <Tabs value={activeMetric} onValueChange={setActiveMetric}>
            <TabsList>
              <TabsTrigger value="height">Height</TabsTrigger>
              <TabsTrigger value="weight">Weight</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <ChartContainer
          config={{
            p3: {
              label: "3rd Percentile",
              color: "hsl(var(--chart-1))",
            },
            p50: {
              label: "50th Percentile",
              color: "hsl(var(--chart-2))",
            },
            p97: {
              label: "97th Percentile",
              color: "hsl(var(--chart-3))",
            },
            user: {
              label: "Your Measurement",
              color: "hsl(var(--chart-4))",
            },
          }}
          className="h-[400px]"
        >
          <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="age" label={{ value: "Age (years)", position: "bottom", offset: 0 }} />
            <YAxis
              label={{
                value: metric,
                angle: -90,
                position: "left",
                offset: -5,
              }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area type="monotone" dataKey="p3" stroke="var(--color-p3)" fill="var(--color-p3)" fillOpacity={0.1} />
            <Area type="monotone" dataKey="p50" stroke="var(--color-p50)" fill="var(--color-p50)" fillOpacity={0.1} />
            <Area type="monotone" dataKey="p97" stroke="var(--color-p97)" fill="var(--color-p97)" fillOpacity={0.1} />
            <Line type="monotone" dataKey="user" stroke="var(--color-user)" strokeWidth={3} dot={{ r: 6 }} />
          </AreaChart>
        </ChartContainer>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Your Percentile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculatePercentile(userValue, chartData)}</div>
              <p className="text-xs text-muted-foreground mt-1">Based on WHO growth standards</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getGrowthStatus(calculatePercentile(userValue, chartData))}</div>
              <p className="text-xs text-muted-foreground mt-1">Growth assessment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Recommendation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">{getRecommendation(calculatePercentile(userValue, chartData))}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Render BMI chart for adults
  const renderAdultChart = () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">{data.role === "adult-male" ? "Male" : "Female"} BMI Chart</h3>
          <p className="text-sm text-muted-foreground">
            Height: {data.height} cm | Weight: {data.weight} kg | BMI: {data.bmi.toFixed(1)}
          </p>
        </div>

        <ChartContainer
          config={{
            category: {
              label: "BMI Category",
            },
            user: {
              label: "Your BMI",
              color: "hsl(var(--chart-4))",
            },
          }}
          className="h-[300px]"
        >
          <BarChart data={data.bmiData} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="category" type="category" tick={{ fontSize: 14 }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="user" fill="var(--color-user)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ChartContainer>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Your BMI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.bmi.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground mt-1">Body Mass Index</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getBmiCategory(data.bmi)}</div>
              <p className="text-xs text-muted-foreground mt-1">Based on WHO standards</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Recommendation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">{getBmiRecommendation(data.bmi)}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Helper function to calculate percentile (simplified)
  const calculatePercentile = (value, chartData) => {
    // Find the data point for the user's age
    const ageData = chartData.find((d) => d.user !== null)

    if (!ageData) return "Unknown"

    if (value < ageData.p3) return "< 3rd"
    if (value < ageData.p50) return "3rd-50th"
    if (value < ageData.p97) return "50th-97th"
    return "> 97th"
  }

  // Helper function to get growth status
  const getGrowthStatus = (percentile) => {
    switch (percentile) {
      case "< 3rd":
        return "Below Average"
      case "3rd-50th":
        return "Normal"
      case "50th-97th":
        return "Normal"
      case "> 97th":
        return "Above Average"
      default:
        return "Unknown"
    }
  }

  // Helper function to get recommendation
  const getRecommendation = (percentile) => {
    switch (percentile) {
      case "< 3rd":
        return "Consider consulting with a healthcare provider about growth and nutrition."
      case "3rd-50th":
        return "Growth is within normal range. Continue with regular check-ups."
      case "50th-97th":
        return "Growth is within normal range. Continue with regular check-ups."
      case "> 97th":
        return "Consider consulting with a healthcare provider to ensure healthy growth."
      default:
        return "Insufficient data to provide a recommendation."
    }
  }

  // Helper function to get BMI category
  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return "Underweight"
    if (bmi < 25) return "Normal"
    if (bmi < 30) return "Overweight"
    return "Obese"
  }

  // Helper function to get BMI recommendation
  const getBmiRecommendation = (bmi) => {
    if (bmi < 18.5) {
      return "Consider consulting with a healthcare provider about nutrition and weight gain strategies."
    } else if (bmi < 25) {
      return "Your BMI is within the healthy range. Maintain a balanced diet and regular physical activity."
    } else if (bmi < 30) {
      return "Consider lifestyle modifications including diet and exercise to achieve a healthier weight."
    } else {
      return "Consider consulting with a healthcare provider about weight management strategies."
    }
  }

  return <div className="space-y-6">{renderChart()}</div>
}

