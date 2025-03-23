"use client"

import React, { useState, useEffect } from "react"
import {
  AlertCircle,
  Beef,
  Droplets,
  HeartPulse,
  Info,
  ListChecks,
  Moon,
  ShoppingBag,
  Utensils,
  Save,
  Edit,
  Check,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { toast,Toaster } from "sonner"

export default function WeightLossPlan() {
  // User profile state
  const [profile, setProfile] = useState({
    weight: 80,
    height: 178,
    bodyType: "endomorph",
    activityLevel: "sedentary",
    gender: "male",
    age: 30,
    diet: "vegetarian",
    budget: "low",
  })

  // Editable profile state
  const [isEditing, setIsEditing] = useState(false)
  const [editableProfile, setEditableProfile] = useState({ ...profile })
  const [dietPlan, setDietPlan] = useState(null)

  // Calculated values
  const [calorieNeeds, setCalorieNeeds] = useState({
    bmr: 0,
    maintenance: 0,
    target: 0,
  })

  // Meal plan state
  const [mealPreferences, setMealPreferences] = useState({
    excludeGluten: false,
    excludeDairy: false,
    spicyFood: "medium",
    mealCount: 3,
  })
  useEffect(() => {
    const storedPlan = localStorage.getItem("dietPlan")

    // const storedGender = localStorage.getItem("gender")
    // console.log(storedGender,'gender')
    // const storedAge = localStorage.getItem("userAge")
    // const storedHeight = localStorage.getItem("userHeight")

    // If a plan was generated, store it in state
    if (storedPlan) {
      try {
        const parsedPlan = JSON.parse(storedPlan)
        setDietPlan(parsedPlan)
      } catch (error) {
        console.error("Error parsing JSON:", error)
      }
    }
  }, [])
  // Recipe database (in a real app, this would come from an API)
  console.log(dietPlan, "kok")
  const recipes = {
    breakfast: [
      {
        id: 1,
        title: "Oatmeal with Fruit and Nuts",
        calories: 320,
        ingredients:
          "1/2 cup rolled oats (dry), cooked with water or unsweetened almond milk, 1/2 cup berries, 1 tbsp chopped nuts (almonds, walnuts).",
        isGlutenFree: false,
        isDairyFree: true,
      },
      {
        id: 2,
        title: "Scrambled Tofu with Whole Wheat Toast",
        calories: 340,
        ingredients:
          "1/2 cup crumbled tofu scrambled with vegetables (spinach, onions, peppers), 1 slice whole wheat toast.",
        isGlutenFree: false,
        isDairyFree: true,
      },
      {
        id: 3,
        title: "Greek Yogurt with Granola and Fruit",
        calories: 310,
        ingredients:
          "1 cup plain Greek yogurt (non-fat or low-fat), 1/4 cup low-sugar granola, 1/2 cup chopped fruit (apple, banana).",
        isGlutenFree: false,
        isDairyFree: false,
      },
    ],
    lunch: [
      {
        id: 1,
        title: "Lentil Soup with Whole Wheat Bread",
        calories: 420,
        ingredients: "1.5 cups homemade or canned lentil soup (low sodium), 1 slice whole wheat bread.",
        isGlutenFree: false,
        isDairyFree: true,
      },
      {
        id: 2,
        title: "Chickpea Salad Sandwich on Whole Wheat",
        calories: 440,
        ingredients:
          "1/2 can mashed chickpeas mixed with celery, onion, mustard, and a little light mayonnaise or Greek yogurt, served on two slices of whole wheat bread with lettuce and tomato.",
        isGlutenFree: false,
        isDairyFree: false,
      },
      {
        id: 3,
        title: "Quinoa Salad",
        calories: 410,
        ingredients:
          "1 cup cooked quinoa mixed with chopped vegetables (cucumber, bell peppers, tomatoes), a lemon-tahini dressing (lemon juice, tahini, water, garlic).",
        isGlutenFree: true,
        isDairyFree: true,
      },
    ],
    dinner: [
      {
        id: 1,
        title: "Vegetable Curry with Brown Rice",
        calories: 480,
        ingredients:
          "1.5 cups vegetable curry (chickpeas, lentils, spinach, cauliflower) made with coconut milk (use sparingly), served with 1/2 cup cooked brown rice.",
        isGlutenFree: true,
        isDairyFree: true,
        spicyLevel: "high",
      },
      {
        id: 2,
        title: "Black Bean Burgers on Whole Wheat Buns",
        calories: 490,
        ingredients:
          "Homemade black bean burgers, served on whole wheat buns with lettuce, tomato, and avocado (1/4 avocado).",
        isGlutenFree: false,
        isDairyFree: true,
        spicyLevel: "low",
      },
      {
        id: 3,
        title: "Baked Sweet Potato with Toppings",
        calories: 460,
        ingredients:
          "1 medium baked sweet potato topped with black beans, salsa, corn, and a dollop of plain Greek yogurt.",
        isGlutenFree: true,
        isDairyFree: false,
        spicyLevel: "medium",
      },
    ],
    snacks: [
      {
        id: 1,
        title: "Apple slices with peanut butter",
        calories: 120,
        ingredients: "1 medium apple, sliced, with 2 tbsp peanut butter",
        isGlutenFree: true,
        isDairyFree: true,
      },
      {
        id: 2,
        title: "Carrot sticks with hummus",
        calories: 130,
        ingredients: "1 cup carrot sticks with 1/4 cup hummus",
        isGlutenFree: true,
        isDairyFree: true,
      },
      {
        id: 3,
        title: "Small handful of almonds",
        calories: 110,
        ingredients: "1/4 cup almonds",
        isGlutenFree: true,
        isDairyFree: true,
      },
      {
        id: 4,
        title: "Hard-boiled egg",
        calories: 80,
        ingredients: "1 hard-boiled egg",
        isGlutenFree: true,
        isDairyFree: true,
      },
      {
        id: 5,
        title: "Greek yogurt with berries",
        calories: 140,
        ingredients: "1/2 cup Greek yogurt with 1/4 cup berries",
        isGlutenFree: true,
        isDairyFree: false,
      },
      {
        id: 6,
        title: "Rice cakes with avocado",
        calories: 150,
        ingredients: "2 rice cakes with 1/4 avocado and a pinch of salt and pepper",
        isGlutenFree: true,
        isDairyFree: true,
      },
    ],
  }

  // Filtered recipes based on preferences
  const [filteredRecipes, setFilteredRecipes] = useState({ ...recipes })

  // Selected meals
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: null,
    lunch: null,
    dinner: null,
    snacks: [],
  })

  // Calculate BMR using Mifflin-St Jeor Equation
  const calculateBMR = () => {
    const { weight, height, gender, age } = profile
    let bmr = 0

    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161
    }

    return Math.round(bmr)
  }

  // Calculate maintenance calories
  const calculateMaintenance = (bmr) => {
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    }

    return Math.round(bmr * activityMultipliers[profile.activityLevel])
  }

  // Calculate target calories (500 calorie deficit)
  const calculateTarget = (maintenance) => {
    return Math.max(1200, maintenance - 500) // Ensure minimum 1200 calories
  }

  // Update calorie calculations when profile changes
  useEffect(() => {
    const bmr = calculateBMR()
    const maintenance = calculateMaintenance(bmr)
    const target = calculateTarget(maintenance)

    setCalorieNeeds({
      bmr,
      maintenance,
      target,
    })
  }, [profile])

  // Filter recipes based on preferences
  useEffect(() => {
    const filtered = {
      breakfast: recipes.breakfast.filter(
        (recipe) =>
          (!mealPreferences.excludeGluten || recipe.isGlutenFree) &&
          (!mealPreferences.excludeDairy || recipe.isDairyFree),
      ),
      lunch: recipes.lunch.filter(
        (recipe) =>
          (!mealPreferences.excludeGluten || recipe.isGlutenFree) &&
          (!mealPreferences.excludeDairy || recipe.isDairyFree),
      ),
      dinner: recipes.dinner.filter(
        (recipe) =>
          (!mealPreferences.excludeGluten || recipe.isGlutenFree) &&
          (!mealPreferences.excludeDairy || recipe.isDairyFree) &&
          (!recipe.spicyLevel ||
            recipe.spicyLevel === mealPreferences.spicyFood ||
            mealPreferences.spicyFood === "any"),
      ),
      snacks: recipes.snacks.filter(
        (recipe) =>
          (!mealPreferences.excludeGluten || recipe.isGlutenFree) &&
          (!mealPreferences.excludeDairy || recipe.isDairyFree),
      ),
    }

    setFilteredRecipes(filtered)

    // Reset selected meals if they're no longer valid
    const newSelectedMeals = { ...selectedMeals }

    if (selectedMeals.breakfast && !filtered.breakfast.find((r) => r.id === selectedMeals.breakfast.id)) {
      newSelectedMeals.breakfast = filtered.breakfast.length > 0 ? filtered.breakfast[0] : null
    }

    if (selectedMeals.lunch && !filtered.lunch.find((r) => r.id === selectedMeals.lunch.id)) {
      newSelectedMeals.lunch = filtered.lunch.length > 0 ? filtered.lunch[0] : null
    }

    if (selectedMeals.dinner && !filtered.dinner.find((r) => r.id === selectedMeals.dinner.id)) {
      newSelectedMeals.dinner = filtered.dinner.length > 0 ? filtered.dinner[0] : null
    }

    setSelectedMeals(newSelectedMeals)
  }, [mealPreferences])

  // Initialize selected meals
  useEffect(() => {
    const initialSelectedMeals = {
      breakfast: filteredRecipes.breakfast.length > 0 ? filteredRecipes.breakfast[0] : null,
      lunch: filteredRecipes.lunch.length > 0 ? filteredRecipes.lunch[0] : null,
      dinner: filteredRecipes.dinner.length > 0 ? filteredRecipes.dinner[0] : null,
      snacks: filteredRecipes.snacks.slice(0, 2),
    }

    setSelectedMeals(initialSelectedMeals)
  }, [])

  // Handle profile edit
  const handleEditProfile = () => {
    if (isEditing) {
      setProfile(editableProfile)
      setIsEditing(false)
      toast("Profile updated")
    } else {
      setEditableProfile({ ...profile })
      setIsEditing(true)
    }
  }

  // Handle profile field change
  const handleProfileChange = (field, value) => {
    setEditableProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle meal selection
  const handleMealSelection = (mealType, meal) => {
    setSelectedMeals((prev) => ({
      ...prev,
      [mealType]: meal,
    }))
  }

  // Handle snack selection
  const handleSnackSelection = (snack) => {
    setSelectedMeals((prev) => {
      const snacks = [...prev.snacks]
      const index = snacks.findIndex((s) => s.id === snack.id)

      if (index >= 0) {
        // Remove if already selected
        snacks.splice(index, 1)
      } else if (snacks.length < 2) {
        // Add if less than 2 snacks selected
        snacks.push(snack)
      }

      return {
        ...prev,
        snacks,
      }
    })
  }

  // Calculate total daily calories
  const calculateTotalCalories = () => {
    let total = 0

    if (selectedMeals.breakfast) total += selectedMeals.breakfast.calories
    if (selectedMeals.lunch) total += selectedMeals.lunch.calories
    if (selectedMeals.dinner) total += selectedMeals.dinner.calories

    selectedMeals.snacks.forEach((snack) => {
      total += snack.calories
    })

    return total
  }

  // Save meal plan
  const saveMealPlan = () => {
    // In a real app, this would save to a database
    toast("Meal plan saved")
  }

  // Generate meal plan
  const generateMealPlan = () => {
    const newSelectedMeals = {
      breakfast:
        filteredRecipes.breakfast.length > 0
          ? filteredRecipes.breakfast[Math.floor(Math.random() * filteredRecipes.breakfast.length)]
          : null,
      lunch:
        filteredRecipes.lunch.length > 0
          ? filteredRecipes.lunch[Math.floor(Math.random() * filteredRecipes.lunch.length)]
          : null,
      dinner:
        filteredRecipes.dinner.length > 0
          ? filteredRecipes.dinner[Math.floor(Math.random() * filteredRecipes.dinner.length)]
          : null,
      snacks: [],
    }

    // Select 2 random snacks
    if (filteredRecipes.snacks.length > 0) {
      const shuffled = [...filteredRecipes.snacks].sort(() => 0.5 - Math.random())
      newSelectedMeals.snacks = shuffled.slice(0, 2)
    }

    setSelectedMeals(newSelectedMeals)

    toast("New meal plan generated")
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
         <Toaster />
      <h1 className="text-3xl font-bold text-center mb-8">Personalized Weight Loss Plan</h1>

      {/* Disclaimer */}
      <Alert className="mb-8 border-amber-200 bg-amber-50 dark:bg-amber-950/20">
        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertTitle className="text-amber-800 dark:text-amber-300">Important Disclaimer</AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-400">
          This is a general guideline and should not replace advice from a registered dietitian or doctor. It&apos;s
          crucial to consult a healthcare professional before making significant dietary changes, especially for weight
          loss. They can assess your individual needs and monitor your progress.
        </AlertDescription>
      </Alert>

      {/* Profile Card */}
      <Card className="mb-8">
        <CardHeader className="bg-muted/50 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            <CardTitle>Your Profile</CardTitle>
          </div>
          <Button variant="outline" size="sm" onClick={handleEditProfile} className="flex items-center gap-1">
            {isEditing ? (
              <React.Fragment>
                <Check className="h-4 w-4" />
                Save
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Edit className="h-4 w-4" />
                Edit
              </React.Fragment>
            )}
          </Button>
        </CardHeader>
        <CardContent className="pt-6">
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={editableProfile.weight}
                    onChange={(e) => handleProfileChange("weight", Number.parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={editableProfile.height}
                    onChange={(e) => handleProfileChange("height", Number.parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={editableProfile.age}
                    onChange={(e) => handleProfileChange("age", Number.parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={editableProfile.gender}
                    onValueChange={(value) => handleProfileChange("gender", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bodyType">Body Type</Label>
                  <Select
                    value={editableProfile.bodyType}
                    onValueChange={(value) => handleProfileChange("bodyType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select body type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ectomorph">Ectomorph (Slim)</SelectItem>
                      <SelectItem value="mesomorph">Mesomorph (Athletic)</SelectItem>
                      <SelectItem value="endomorph">Endomorph (Rounded)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activityLevel">Activity Level</Label>
                  <Select
                    value={editableProfile.activityLevel}
                    onValueChange={(value) => handleProfileChange("activityLevel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary (Office job, little exercise)</SelectItem>
                      <SelectItem value="light">Light (Light exercise 1-3 days/week)</SelectItem>
                      <SelectItem value="moderate">Moderate (Exercise 3-5 days/week)</SelectItem>
                      <SelectItem value="active">Active (Exercise 6-7 days/week)</SelectItem>
                      <SelectItem value="veryActive">Very Active (Physical job or 2x training)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="px-2 py-1 text-xs">
                  Weight
                </Badge>
                <span>{profile.weight} kg</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="px-2 py-1 text-xs">
                  Height
                </Badge>
                <span>{profile.height} cm</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="px-2 py-1 text-xs">
                  Body Type
                </Badge>
                <span className="capitalize">{profile.bodyType}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="px-2 py-1 text-xs">
                  Activity Level
                </Badge>
                <span className="capitalize">{profile.activityLevel}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="px-2 py-1 text-xs">
                  Gender
                </Badge>
                <span className="capitalize">{profile.gender}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="px-2 py-1 text-xs">
                  Age
                </Badge>
                <span>{profile.age}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="px-2 py-1 text-xs">
                  Diet
                </Badge>
                <span className="capitalize">{profile.diet}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="px-2 py-1 text-xs">
                  Budget
                </Badge>
                <span className="capitalize">{profile.budget}-Cost</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="px-2 py-1 text-xs">
                  Goal
                </Badge>
                <span>Weight Loss</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Calorie Needs */}
      <Card className="mb-8">
        <CardHeader className="bg-muted/50">
          <CardTitle className="flex items-center gap-2">
            <HeartPulse className="h-5 w-5" />
            Estimated Calorie Needs
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-muted/30 rounded-lg text-center">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Basal Metabolic Rate</h3>
              <p className="text-2xl font-bold">{dietPlan?.calorieNeeds?.bmr || calorieNeeds.bmr} cal</p>
              <p className="text-xs text-muted-foreground mt-1">Calories burned at rest</p>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg text-center">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Maintenance Calories</h3>
              <p className="text-2xl font-bold">
                {dietPlan?.calorieNeeds?.maintenance || calorieNeeds.maintenance} cal
              </p>
              <p className="text-xs text-muted-foreground mt-1">Daily calories to maintain weight</p>
            </div>

            <div className="p-4 bg-primary/10 rounded-lg text-center">
              <h3 className="text-sm font-medium mb-1">Target Calories</h3>
              <p className="text-2xl font-bold">{dietPlan?.calorieNeeds?.target || calorieNeeds.target} cal</p>
              <p className="text-xs text-muted-foreground mt-1">Daily calories for weight loss</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Based on your profile, we've calculated your daily calorie needs. To lose weight at a rate of 0.5-1kg (1-2
            pounds) per week, we've created a 500 calorie deficit from your maintenance calories.
          </p>
        </CardContent>
      </Card>

      {/* Meal Preferences */}
      <Card className="mb-8">
        <CardHeader className="bg-muted/50">
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            Meal Preferences
          </CardTitle>
          <CardDescription>
            Customize your meal plan based on your dietary preferences and restrictions.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="gluten-free">Gluten-Free</Label>
                  <p className="text-sm text-muted-foreground">Exclude meals containing gluten</p>
                </div>
                <Switch
                  id="gluten-free"
                  checked={mealPreferences.excludeGluten}
                  onCheckedChange={(checked) => setMealPreferences((prev) => ({ ...prev, excludeGluten: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dairy-free">Dairy-Free</Label>
                  <p className="text-sm text-muted-foreground">Exclude meals containing dairy</p>
                </div>
                <Switch
                  id="dairy-free"
                  checked={mealPreferences.excludeDairy}
                  onCheckedChange={(checked) => setMealPreferences((prev) => ({ ...prev, excludeDairy: checked }))}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Spicy Food Preference</Label>
                <RadioGroup
                  value={mealPreferences.spicyFood}
                  onValueChange={(value) => setMealPreferences((prev) => ({ ...prev, spicyFood: value }))}
                  className="flex space-x-2"
                >
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low" className="cursor-pointer">
                      Mild
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium" className="cursor-pointer">
                      Medium
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high" className="cursor-pointer">
                      Spicy
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="any" id="any" />
                    <Label htmlFor="any" className="cursor-pointer">
                      Any
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label htmlFor="meal-count">Number of Meals</Label>
                  <span className="text-sm text-muted-foreground">{mealPreferences.mealCount}</span>
                </div>
                <Slider
                  id="meal-count"
                  min={0}
                  max={3}
                  step={1}
                  value={[mealPreferences.mealCount]}
                  onValueChange={(value) => setMealPreferences((prev) => ({ ...prev, mealCount: value[0] }))}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={generateMealPlan}>
            Regenerate Meal Plan
          </Button>
        </CardFooter>
      </Card>

      {/* Meal Plan */}
      <Card className="mb-8">
        <CardHeader className="bg-muted/50">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5" />
              Your Meal Plan
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Total Daily Calories:</span>
              <Badge variant="outline" className="text-base font-bold">
                {calculateTotalCalories()} / {calorieNeeds.target} cal
              </Badge>
            </div>
          </div>
          <CardDescription>
            This meal plan is customized based on your profile and preferences. You can adjust it as needed.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="breakfast" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
              <TabsTrigger value="lunch">Lunch</TabsTrigger>
              <TabsTrigger value="dinner">Dinner</TabsTrigger>
              <TabsTrigger value="snacks">Snacks</TabsTrigger>
            </TabsList>

            <TabsContent value="breakfast" className="space-y-4">
              <div className="text-sm text-muted-foreground mb-2">300-350 calories</div>
              <div className="grid gap-4">
                {filteredRecipes.breakfast.map((meal) => (
                  <Card key={meal.id} className={selectedMeals.breakfast?.id === meal.id ? "border-primary" : ""}>
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-base">{meal.title}</CardTitle>
                      <Badge>{meal.calories} cal</Badge>
                    </CardHeader>
                    <CardContent>
                      <p>{meal.ingredients}</p>
                      <div className="flex gap-2 mt-2">
                        {meal.isGlutenFree && (
                          <Badge variant="outline" className="text-xs">
                            Gluten-Free
                          </Badge>
                        )}
                        {meal.isDairyFree && (
                          <Badge variant="outline" className="text-xs">
                            Dairy-Free
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant={selectedMeals.breakfast?.id === meal.id ? "default" : "outline"}
                        size="sm"
                        className="w-full"
                        onClick={() => handleMealSelection("breakfast", meal)}
                      >
                        {selectedMeals.breakfast?.id === meal.id ? "Selected" : "Select"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="lunch" className="space-y-4">
              <div className="text-sm text-muted-foreground mb-2">400-450 calories</div>
              <div className="grid gap-4">
                {filteredRecipes.lunch.map((meal) => (
                  <Card key={meal.id} className={selectedMeals.lunch?.id === meal.id ? "border-primary" : ""}>
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-base">{meal.title}</CardTitle>
                      <Badge>{meal.calories} cal</Badge>
                    </CardHeader>
                    <CardContent>
                      <p>{meal.ingredients}</p>
                      <div className="flex gap-2 mt-2">
                        {meal.isGlutenFree && (
                          <Badge variant="outline" className="text-xs">
                            Gluten-Free
                          </Badge>
                        )}
                        {meal.isDairyFree && (
                          <Badge variant="outline" className="text-xs">
                            Dairy-Free
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant={selectedMeals.lunch?.id === meal.id ? "default" : "outline"}
                        size="sm"
                        className="w-full"
                        onClick={() => handleMealSelection("lunch", meal)}
                      >
                        {selectedMeals.lunch?.id === meal.id ? "Selected" : "Select"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="dinner" className="space-y-4">
              <div className="text-sm text-muted-foreground mb-2">450-500 calories</div>
              <div className="grid gap-4">
                {filteredRecipes.dinner.map((meal) => (
                  <Card key={meal.id} className={selectedMeals.dinner?.id === meal.id ? "border-primary" : ""}>
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-base">{meal.title}</CardTitle>
                      <Badge>{meal.calories} cal</Badge>
                    </CardHeader>
                    <CardContent>
                      <p>{meal.ingredients}</p>
                      <div className="flex gap-2 mt-2">
                        {meal.isGlutenFree && (
                          <Badge variant="outline" className="text-xs">
                            Gluten-Free
                          </Badge>
                        )}
                        {meal.isDairyFree && (
                          <Badge variant="outline" className="text-xs">
                            Dairy-Free
                          </Badge>
                        )}
                        {meal.spicyLevel && (
                          <Badge variant="outline" className="text-xs capitalize">
                            {meal.spicyLevel === "low" ? "Mild" : meal.spicyLevel === "medium" ? "Medium" : "Spicy"}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant={selectedMeals.dinner?.id === meal.id ? "default" : "outline"}
                        size="sm"
                        className="w-full"
                        onClick={() => handleMealSelection("dinner", meal)}
                      >
                        {selectedMeals.dinner?.id === meal.id ? "Selected" : "Select"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="snacks" className="space-y-4">
              <div className="text-sm text-muted-foreground mb-2">
                100-150 calories each - choose up to {mealPreferences.mealCount}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRecipes.snacks.map((snack) => {
                  const isSelected = selectedMeals.snacks.some((s) => s.id === snack.id)
                  const isDisabled = !isSelected && selectedMeals.snacks.length >= mealPreferences.mealCount

                  return (
                    <Card key={snack.id} className={isSelected ? "border-primary" : ""}>
                      <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle className="text-base">{snack.title}</CardTitle>
                        <Badge>{snack.calories} cal</Badge>
                      </CardHeader>
                      <CardContent>
                        <p>{snack.ingredients}</p>
                        <div className="flex gap-2 mt-2">
                          {snack.isGlutenFree && (
                            <Badge variant="outline" className="text-xs">
                              Gluten-Free
                            </Badge>
                          )}
                          {snack.isDairyFree && (
                            <Badge variant="outline" className="text-xs">
                              Dairy-Free
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          className="w-full"
                          disabled={isDisabled && !isSelected}
                          onClick={() => handleSnackSelection(snack)}
                        >
                          {isSelected ? "Selected" : "Select"}
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={saveMealPlan} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Meal Plan
          </Button>
        </CardFooter>
      </Card>

      {/* Shopping List */}
      <Card className="mb-8">
        <CardHeader className="bg-muted/50">
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping List
          </CardTitle>
          <CardDescription>Based on your selected meals, here's what you'll need to buy.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Produce</h3>
              <ul className="list-disc pl-5 space-y-1">
                {dietPlan?.shoppingList
                  ?.filter((item) =>
                    [
                      "Onions",
                      "Carrots",
                      "Celery",
                      "Spinach",
                      "Bell peppers",
                      "Tomatoes",
                      "Cucumber",
                      "Sweet potatoes",
                      "Apples",
                      "Berries",
                      "Bananas",
                    ].includes(item),
                  )
                  .map((item, index) => <li key={index}>{item}</li>) || (
                  <>
                    <li>Onions</li>
                    <li>Carrots</li>
                    <li>Celery</li>
                    <li>Spinach</li>
                    <li>Bell peppers</li>
                    <li>Tomatoes</li>
                    <li>Cucumber</li>
                    <li>Sweet potatoes</li>
                    <li>Apples</li>
                    <li>Berries</li>
                    <li>Bananas</li>
                  </>
                )}
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Pantry Items</h3>
              <ul className="list-disc pl-5 space-y-1">
                {dietPlan?.shoppingList
                  ?.filter((item) =>
                    [
                      "Rolled oats",
                      "Brown rice",
                      "Quinoa",
                      "Whole wheat bread",
                      "Lentils",
                      "Chickpeas",
                      "Black beans",
                      "Vegetable broth",
                      "Coconut milk",
                      "Nuts",
                      "Almonds",
                      "Walnuts",
                      "Nut butter",
                    ].includes(item),
                  )
                  .map((item, index) => <li key={index}>{item}</li>) || (
                  <>
                    <li>Rolled oats</li>
                    <li>Brown rice</li>
                    <li>Quinoa</li>
                    <li>Whole wheat bread</li>
                    <li>Lentils</li>
                    <li>Chickpeas</li>
                    <li>Black beans</li>
                    <li>Vegetable broth (low sodium)</li>
                    <li>Coconut milk</li>
                    <li>Nuts (almonds, walnuts)</li>
                    <li>Nut butter (peanut, almond)</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <h3 className="font-medium mb-2">Budget-Friendly Tips</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Buy in bulk when possible (especially grains, legumes, and nuts)</li>
              <li>Choose seasonal produce for better prices</li>
              <li>Use frozen vegetables and fruits when fresh are expensive</li>
              <li>Prepare meals in batches to save time and money</li>
              <li>Check for sales and discounts at your local grocery store</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="mb-8">
        <CardHeader className="bg-muted/50">
          <CardTitle className="flex items-center gap-2">
            <ListChecks className="h-5 w-5" />
            Tips for Success
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dietPlan?.tips?.length > 0 ? (
              dietPlan.tips.slice(0, 4).map((tip, index) => {
                const icons = [
                  <Droplets key="droplets" className="h-5 w-5 text-primary shrink-0 mt-0.5" />,
                  <HeartPulse key="heartpulse" className="h-5 w-5 text-primary shrink-0 mt-0.5" />,
                  <Moon key="moon" className="h-5 w-5 text-primary shrink-0 mt-0.5" />,
                  <Beef key="beef" className="h-5 w-5 text-primary shrink-0 mt-0.5" />,
                ]
                const titles = ["Hydration", "Exercise", "Sleep", "Cook at Home"]

                return (
                  <div key={index} className="flex gap-3 p-4 rounded-lg bg-muted/30">
                    {icons[index % icons.length]}
                    <div>
                      <h3 className="font-medium mb-1">{titles[index % titles.length]}</h3>
                      <p className="text-sm">{tip}</p>
                    </div>
                  </div>
                )
              })
            ) : (
              <>
                <div className="flex gap-3 p-4 rounded-lg bg-muted/30">
                  <Droplets className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Hydration</h3>
                    <p className="text-sm">
                      Drink plenty of water throughout the day (at least 8 glasses). Water helps with digestion and can
                      reduce hunger.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 p-4 rounded-lg bg-muted/30">
                  <HeartPulse className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Exercise</h3>
                    <p className="text-sm">
                      Even light exercise, like walking, can boost your metabolism. Aim for at least 30 minutes most
                      days.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 p-4 rounded-lg bg-muted/30">
                  <Moon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Sleep</h3>
                    <p className="text-sm">
                      Get 7-9 hours of sleep per night. Lack of sleep can disrupt hormones that regulate appetite.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 p-4 rounded-lg bg-muted/30">
                  <Beef className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Cook at Home</h3>
                    <p className="text-sm">
                      Eating out is generally more expensive and makes it harder to control portions and ingredients.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-3">Progress Tracking</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Weigh yourself once a week at the same time of day.</li>
              <li>Take measurements of your waist and hips.</li>
              <li>Track your calorie intake and exercise.</li>
              <li>Pay attention to how you feel. Are you feeling more energetic? Are your clothes fitting better?</li>
              <li>Be patient and consistent. Weight loss takes time.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-8 gap-4">
        <Button variant="outline" onClick={generateMealPlan} className="px-8">
          Regenerate Plan
        </Button>
        <Button className="px-8" onClick={saveMealPlan}>
          Save Plan
        </Button>
      </div>
    </div>
  )
}

