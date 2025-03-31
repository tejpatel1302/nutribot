"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"
import { Loader2, Save, Trash2 } from 'lucide-react'

// Helper function to decode a JWT token
function decodeJWT(token) {
  try {
    // JWT tokens are split into three parts: header, payload, and signature
    // We only need the payload part which is the second part
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    )

    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}

export function MealPlanManager({ dietPlan, onSaveMealPlan }) {
  const [open, setOpen] = useState(false)
  const [mealPlans, setMealPlans] = useState([])
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState()
  const [deleting, setDeleting] = useState(null)

  // Fetch all meal plans when dialog opens
  useEffect(() => {
    if (open) {
      fetchMealPlans()
    }
  }, [open])

  // Decode the token and set the userId on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (token) {
      const decodedToken = decodeJWT(token)
      console.log(decodedToken, 'fix')
      if (decodedToken && decodedToken.email) {
        setUserId(decodedToken.id)
      }
    }
  }, [])

  // Create a new meal plan using Axios
  const createMealPlan = async () => {
    console.log('func called')
    try {
      setLoading(true)

      // Create payload with the required fields and include the userId from the token
      // Note: Ensure that `mealData` is defined or adjust it to the correct variable if needed.
      const payload = {
        title: 'no',
        description: "no",
        mealData: dietPlan, // using dietPlan as mealData
        userId: userId
      }

      const response = await axios.post("http://localhost:8080/api/v1/user/mealPlan", payload)
      toast.success('Meal plan saved successfully')

      // Call the parent component's save function if needed
      if (onSaveMealPlan) {
        onSaveMealPlan()
      }

      return response.data
    } catch (error) {
      console.error('Error saving meal plan:', error)
      toast.error('Failed to save meal plan')
    } finally {
      setLoading(false)
    }
  }

  // Fetch all meal plans using Axios
  const fetchMealPlans = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/v1/user/mealPlan`);
      console.log(response, 'check');
      // Filter the meal plans where the meal plan's userId matches the given userId
      const userMealPlans = response.data.data.filter(plan => plan.userId === userId);
      setMealPlans(userMealPlans);
    } catch (error) {
      console.error('Error fetching meal plans:', error);
      toast.error('Failed to fetch meal plans');
    } finally {
      setLoading(false);
    }
  }
  
  console.log(mealPlans,'result')
  // Delete a meal plan using Axios
  const deleteMealPlan = async (id) => {
    console.log(id,'idcheck')
    try {
      setDeleting(id)
      await axios.delete(`http://localhost:8080/api/v1/user/mealPlan/${id}`)

      // Remove the deleted meal plan from state
      setMealPlans(mealPlans.filter(plan => plan._id !== id))
      toast.success('Meal plan deleted successfully')
    } catch (error) {
      console.error('Error deleting meal plan:', error)
      toast.error('Failed to delete meal plan')
    } finally {
      setDeleting(null)
    }
  }

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Calculate total calories for a meal plan
  const calculateTotalCalories = (mealPlan) => {
    if (!mealPlan) return 0

    const breakfastCals = mealPlan.breakfast.reduce((sum, meal) => sum + meal.calories, 0)
    const lunchCals = mealPlan.lunch.reduce((sum, meal) => sum + meal.calories, 0)
    const dinnerCals = mealPlan.dinner.reduce((sum, meal) => sum + meal.calories, 0)
    const snackCals = mealPlan.snacks.reduce((sum, meal) => sum + meal.calories, 0)

    return breakfastCals + lunchCals + dinnerCals + snackCals
  }

  return (
    <>
      <div className="flex gap-4">
        <Button 
          onClick={createMealPlan} 
          disabled={loading || !dietPlan}
          className="flex items-center gap-2"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Plan
        </Button>
        <Button 
          variant="outline" 
          onClick={() => setOpen(true)}
          className="flex items-center gap-2"
        >
          Manage All Meal Plans
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Manage Meal Plans</DialogTitle>
          </DialogHeader>
          
          {loading && !deleting ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : mealPlans.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No meal plans found. Save a plan to see it here.
            </div>
          ) : (
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Created</TableHead>
                <TableHead>Calories</TableHead>
                <TableHead>Breakfast</TableHead>
                <TableHead>Lunch</TableHead>
                <TableHead>Dinner</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mealPlans?.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">
                    {formatDate(plan.createdAt)} 
                    {/* Adjust as needed if your object uses a different date field */}
                  </TableCell>
                  <TableCell>
                    {plan?.mealData?.calorieNeeds?.target} cal
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate">
                    {plan?.mealData?.mealPlan?.breakfast
                      ?.map((meal) => meal.title)
                      .join(', ')}
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate">
                    {plan?.mealData?.mealPlan?.lunch
                      ?.map((meal) => meal.title)
                      .join(', ')}
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate">
                    {plan?.mealData?.mealPlan?.dinner
                      ?.map((meal) => meal.title)
                      .join(', ')}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteMealPlan(plan?.id)}
                      disabled={deleting === plan.id}
                    >
                      {deleting === plan.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4 text-destructive" />
                      )}
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
