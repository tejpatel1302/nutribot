"use client";

import { useState, useEffect } from "react";
import {
  Beef,
  Droplets,
  HeartPulse,
  Info,
  ListChecks,
  Moon,
  ShoppingBag,
  Utensils,
  Edit,
  Check,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { MealPlanManager } from "./meal-plan-manager";
import { Checkbox } from "@/components/ui/checkbox";

export default function WeightLossPlan() {
  // User profile state

  const [profile, setProfile] = useState({});
  console.log(profile, "test");
  // API-generated diet plan state
  const [dietPlan, setDietPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Editable profile state
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState({
    ...profile,
    dietaryPreferences: profile.dietaryPreferences || [],
  });

  // Dialog state
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const storedPlan = localStorage.getItem("dietPlan");
    const storedProfile =
      typeof window !== "undefined" ? localStorage.getItem("profile") : null;
    if (storedPlan) {
      try {
        const parsedPlan = JSON.parse(storedPlan);
        const parsedProfile = JSON.parse(storedProfile);
        setDietPlan(parsedPlan);
        setProfile(parsedProfile);
      } catch (error) {
        console.error("Error parsing stored diet plan:", error);
      }
    }
  }, []);
  // Calorie needs state (fallback in case API isn’t loaded yet)
  const [calorieNeeds, setCalorieNeeds] = useState({
    bmr: 0,
    maintenance: 0,
    target: 0,
  });

  // Calculate BMR using Mifflin-St Jeor Equation
  const calculateBMR = () => {
    const { weight, height, gender, age } = profile;
    let bmr = 0;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    return Math.round(bmr);
  };

  // Calculate maintenance calories
  const calculateMaintenance = (bmr) => {
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };
    return Math.round(bmr * activityMultipliers[profile.activityLevel]);
  };

  // Calculate target calories (e.g. 500 calorie deficit)
  const calculateTarget = (maintenance) => {
    return Math.max(1200, maintenance - 500); // Ensure minimum of 1200 calories
  };

  // Update calorie calculations when profile changes
  useEffect(() => {
    const bmr = calculateBMR();
    const maintenance = calculateMaintenance(bmr);
    const target = calculateTarget(maintenance);
    setCalorieNeeds({ bmr, maintenance, target });
  }, [profile]);

  // Handle profile edit
  const handleEditProfile = () => {
    if (isEditing) {
      setProfile(editableProfile);
      setIsEditing(false);
      // Save to localStorage when profile is updated
      localStorage.setItem("profile", JSON.stringify(editableProfile));
      toast("Profile updated");
    } else {
      setEditableProfile({ ...profile });
      setIsEditing(true);
    }
  };

  // Handle profile field change
  const handleProfileChange = (field, value) => {
    setEditableProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Fetch diet plan from API based on user profile
  const fetchDietPlan = async () => {
    setIsLoading(true);
    // Build query parameters from profile state.
    // Note: converting units if needed (here we assume the API expects kg/cm for weight/height)
    const queryParams = new URLSearchParams({
      weight: profile.weight,
      height: profile.height,
      age: profile.age,
      gender: profile.gender,
      bodyType: profile.bodyType,
      activityLevel: profile.activityLevel,
      dietaryPreferences: profile.diet,
      dietaryRestrictions: "", // if any
      budgetConstraints: profile.budget,
      foodAllergies: "", // if any
      fitnessGoals: "weight loss", // default goal
      disease: "", // if any
    });
    try {
      const res = await fetch(
        `http://localhost:3001/dietPlan?${queryParams.toString()}`
      );
      if (!res.ok) throw new Error("API request failed");
      const data = await res.json();
      setDietPlan(data);
      // Also update calorieNeeds if available from API response
      if (data?.calorieNeeds) setCalorieNeeds(data.calorieNeeds);
      toast("Diet plan generated!");
    } catch (error) {
      console.error("Error fetching diet plan:", error);
      toast.error("Failed to generate diet plan.");
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect to load plan from localStorage on mount (optional)

  // Save plan to localStorage (simulate saving to a database)
  const saveMealPlan = () => {
    if (dietPlan) {
      localStorage.setItem("dietPlan", JSON.stringify(dietPlan));
      toast("Meal plan saved");
    }
  };
  console.log(profile.dietaryPreferences, "testdeit");
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* <Toaster />
      <h1 className="text-3xl font-bold text-center mb-8">Personalized Weight Loss Plan</h1> */}

      {/* Profile Card */}
      <Card className="mb-8">
        <CardHeader className="bg-muted/50 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            <CardTitle>Your Profile</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleEditProfile}
            className="flex items-center gap-1"
          >
            {isEditing ? (
              <>
                <Check className="h-4 w-4" />
                Save
              </>
            ) : (
              <>
                <Edit className="h-4 w-4" />
                Edit
              </>
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
                    onChange={(e) =>
                      handleProfileChange("weight", Number(e.target.value))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={editableProfile.height}
                    onChange={(e) =>
                      handleProfileChange("height", Number(e.target.value))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={editableProfile.age}
                    onChange={(e) =>
                      handleProfileChange("age", Number(e.target.value))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budgetConstraints">Budget Constraints</Label>
                  <Select
                    value={editableProfile.budgetConstraints}
                    onValueChange={(value) =>
                      handleProfileChange("budgetConstraints", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low-cost">Low-cost</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="religiousRestrictions">
                    Religious Restrictions
                  </Label>
                  <Input
                    id="religiousRestrictions"
                    value={editableProfile.religiousRestrictions || ""}
                    onChange={(e) =>
                      handleProfileChange(
                        "religiousRestrictions",
                        e.target.value
                      )
                    }
                    placeholder="Any religious dietary restrictions"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={editableProfile.gender}
                    onValueChange={(value) =>
                      handleProfileChange("gender", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="others">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bodyType">Body Type</Label>
                  <Select
                    value={editableProfile.bodyType}
                    onValueChange={(value) =>
                      handleProfileChange("bodyType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select body type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ectomorph">
                        Ectomorph (Slim)
                      </SelectItem>
                      <SelectItem value="mesomorph">
                        Mesomorph (Athletic)
                      </SelectItem>
                      <SelectItem value="endomorph">
                        Endomorph (Rounded)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="activityLevel">Activity Level</Label>
                  <Select
                    value={editableProfile.activityLevel}
                    onValueChange={(value) =>
                      handleProfileChange("activityLevel", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="veryActive">Very Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dietaryPreferences">
                    Dietary Preferences
                  </Label>
                  <div className="grid grid-cols-1 gap-2 mt-1">
                    {[
                      { id: "vegetarian", label: "Vegetarian" },
                      { id: "non-vegetarian", label: "Non-Vegetarian" },
                      { id: "vegan", label: "Vegan" },
                      { id: "keto", label: "Keto" },
                      { id: "paleo", label: "Paleo" },
                      { id: "mediterranean", label: "Mediterranean" },
                      { id: "glutenfree", label: "Gluten-Free" },
                      { id: "dairyfree", label: "Dairy-Free" },
                    ].map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`diet-${item.id}`}
                          checked={editableProfile.dietaryPreferences?.includes(
                            item.id
                          )}
                          onCheckedChange={(checked) => {
                            const currentPrefs =
                              editableProfile.dietaryPreferences || [];
                            if (checked) {
                              handleProfileChange("dietaryPreferences", [
                                ...currentPrefs,
                                item.id,
                              ]);
                            } else {
                              handleProfileChange(
                                "dietaryPreferences",
                                currentPrefs.filter((pref) => pref !== item.id)
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={`diet-${item.id}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fitnessGoals">Fitness Goals</Label>
                  <Select
                    value={editableProfile.fitnessGoals || "weight loss"}
                    onValueChange={(value) =>
                      handleProfileChange("fitnessGoals", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight loss">Weight Loss</SelectItem>
                      <SelectItem value="muscle gain">Muscle Gain</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback</Label>
                  <Input
                    id="feedback"
                    value={editableProfile.feedback || ""}
                    onChange={(e) =>
                      handleProfileChange("feedback", e.target.value)
                    }
                    placeholder="Any feedback on your current plan"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  Dietary Preferences
                </Badge>
                <span className="capitalize">
                  {profile.dietaryPreferences?.[0]}
                  {profile.dietaryPreferences?.length > 1 && "..."}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="px-2 py-1 text-xs">
                  Budget
                </Badge>
                <span className="capitalize">{profile.budgetConstraints}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="px-2 py-1 text-xs">
                  Fitness Goals
                </Badge>
                <span className="capitalize">
                  {profile.fitnessGoals || "Weight Loss"}
                </span>
              </div>
              {profile.religiousRestrictions && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="px-2 py-1 text-xs">
                    Religious Restrictions
                  </Badge>
                  <span>{profile.religiousRestrictions}</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Calorie Needs Card */}
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
              <h3 className="text-sm font-medium mb-1">BMR</h3>
              <p className="text-2xl font-bold">
                {dietPlan?.calorieNeeds?.bmr || calorieNeeds.bmr} cal
              </p>
              <p className="text-xs mt-1">At Rest</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg text-center">
              <h3 className="text-sm font-medium mb-1">Maintenance</h3>
              <p className="text-2xl font-bold">
                {dietPlan?.calorieNeeds?.maintenance ||
                  calorieNeeds.maintenance}{" "}
                cal
              </p>
              <p className="text-xs mt-1">To Maintain Weight</p>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg text-center">
              <h3 className="text-sm font-medium mb-1">Target</h3>
              <p className="text-2xl font-bold">
                {dietPlan?.calorieNeeds?.target || calorieNeeds.target} cal
              </p>
              <p className="text-xs mt-1">For Weight Loss</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            A 500-calorie deficit from your maintenance calories is recommended
            for gradual weight loss.
          </p>
        </CardContent>
      </Card>

      {/* Generate Diet Plan Button */}
      {/* <div className="flex justify-center mb-8">
        <Button onClick={fetchDietPlan} disabled={isLoading} className="px-8">
          {isLoading ? "Generating..." : "Generate Diet Plan"}
        </Button>
      </div> */}

      {/* Display Diet Plan if available */}
      {dietPlan && (
        <>
          {/* Meal Plan Tabs */}
          <Card className="mb-8">
            <CardHeader className="bg-muted/50">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-5 w-5" />
                  Your Meal Plan
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    Total Daily Calories:
                  </span>
                  <Badge variant="outline" className="text-base font-bold">
                    {dietPlan.mealPlan.breakfast[0]?.calories +
                      dietPlan.mealPlan.lunch[0]?.calories +
                      dietPlan.mealPlan.dinner[0]?.calories +
                      dietPlan.mealPlan.snacks.reduce(
                        (acc, snack) => acc + snack.calories,
                        0
                      )}{" "}
                    / {dietPlan.calorieNeeds.target} cal
                  </Badge>
                </div>
              </div>
              <CardDescription>
                This plan is generated based on your profile and preferences.
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
                  {dietPlan.mealPlan.breakfast.map((meal) => (
                    <Card key={meal.id} className="border">
                      <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle className="text-base">
                          {meal.title}
                        </CardTitle>
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
                      <CardFooter className="flex justify-end"></CardFooter>
                    </Card>
                  ))}
                </TabsContent>
                <TabsContent value="lunch" className="space-y-4">
                  {dietPlan.mealPlan.lunch.map((meal) => (
                    <Card key={meal.id} className="border">
                      <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle className="text-base">
                          {meal.title}
                        </CardTitle>
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
                    </Card>
                  ))}
                </TabsContent>
                <TabsContent value="dinner" className="space-y-4">
                  {dietPlan.mealPlan.dinner.map((meal) => (
                    <Card key={meal.id} className="border">
                      <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle className="text-base">
                          {meal.title}
                        </CardTitle>
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
                            <Badge
                              variant="outline"
                              className="text-xs capitalize"
                            >
                              {meal.spicyLevel === "low"
                                ? "Mild"
                                : meal.spicyLevel === "medium"
                                ? "Medium"
                                : "Spicy"}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                <TabsContent value="snacks" className="space-y-4">
                  {dietPlan.mealPlan.snacks.map((snack) => (
                    <Card key={snack.id} className="border">
                      <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle className="text-base">
                          {snack.title}
                        </CardTitle>
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
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-end">
              {dietPlan && (
                <MealPlanManager
                  dietPlan={dietPlan}
                  onSaveMealPlan={saveMealPlan}
                />
              )}
            </CardFooter>
          </Card>

          {/* Shopping List */}
          <Card className="mb-8">
            <CardHeader className="bg-muted/50">
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Shopping List
              </CardTitle>
              <CardDescription>
                Based on your plan, here are the items you need.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {dietPlan && (
                <ShoppingListGenerator mealPlan={dietPlan.mealPlan} />
              )}
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
                {dietPlan.tips && dietPlan.tips.length > 0 ? (
                  dietPlan.tips.slice(0, 4).map((tip, index) => {
                    const icons = [
                      <Droplets
                        key="droplets"
                        className="h-5 w-5 text-primary shrink-0 mt-0.5"
                      />,
                      <HeartPulse
                        key="heartpulse"
                        className="h-5 w-5 text-primary shrink-0 mt-0.5"
                      />,
                      <Moon
                        key="moon"
                        className="h-5 w-5 text-primary shrink-0 mt-0.5"
                      />,
                      <Beef
                        key="beef"
                        className="h-5 w-5 text-primary shrink-0 mt-0.5"
                      />,
                    ];
                    const titles = [
                      "Hydration",
                      "Exercise",
                      "Sleep",
                      "Cook at Home",
                    ];
                    return (
                      <div
                        key={index}
                        className="flex gap-3 p-4 rounded-lg bg-muted/30"
                      >
                        {icons[index % icons.length]}
                        <div>
                          <h3 className="font-medium mb-1">
                            {titles[index % titles.length]}
                          </h3>
                          <p className="text-sm">{tip}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div className="flex gap-3 p-4 rounded-lg bg-muted/30">
                      <Droplets className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium mb-1">Hydration</h3>
                        <p className="text-sm">
                          Drink plenty of water throughout the day.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-4 rounded-lg bg-muted/30">
                      <HeartPulse className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium mb-1">Exercise</h3>
                        <p className="text-sm">
                          Aim for at least 30 minutes of activity most days.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recipe Videos */}
          <Card className="mb-8">
            <CardHeader className="bg-muted/50">
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5" />
                Recipe Videos
              </CardTitle>
              <CardDescription>
                Watch videos to learn how to prepare meals from your plan
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
                <TabsContent value="breakfast">
                  <RecipeVideoList
                    mealType="breakfast"
                    meals={dietPlan.mealPlan.breakfast}
                  />
                </TabsContent>
                <TabsContent value="lunch">
                  <RecipeVideoList
                    mealType="lunch"
                    meals={dietPlan.mealPlan.lunch}
                  />
                </TabsContent>
                <TabsContent value="dinner">
                  <RecipeVideoList
                    mealType="dinner"
                    meals={dietPlan.mealPlan.dinner}
                  />
                </TabsContent>
                <TabsContent value="snacks">
                  <RecipeVideoList
                    mealType="snacks"
                    meals={dietPlan.mealPlan.snacks}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </>
      )}

      {/* Generate/Save Controls */}
      <div className="flex justify-center mt-8 gap-4">
        <Button onClick={fetchDietPlan} className="px-8">
          {isLoading ? "Generating..." : "Regenerate Plan"}
        </Button>
        <Button className="px-8" onClick={saveMealPlan}>
          Save Plan
        </Button>
      </div>
    </div>
  );
}

const RecipeVideoList = ({ mealType, meals }) => {
  console.log(meals, "meals cjec");
  return (
    <div className="space-y-4">
      {meals.map((meal) => (
        <Card key={meal.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">{meal.title}</CardTitle>
              <Badge>{meal.calories} cal</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-md overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed?search=how+to+make+${encodeURIComponent(
                  meal.title
                )}&color=white`}
                title={`${meal.title} Recipe Video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Watch how to prepare {meal.title}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const ShoppingListGenerator = ({ mealPlan }) => {
  // Extract all ingredients from the meal plan
  const extractIngredients = () => {
    const allIngredients = [];

    // Process breakfast meals
    mealPlan.breakfast.forEach((meal) => {
      if (meal.ingredients) {
        const ingredients = meal.ingredients
          .split(",")
          .map((item) => item.trim());
        allIngredients.push(...ingredients);
      }
    });

    // Process lunch meals
    mealPlan.lunch.forEach((meal) => {
      if (meal.ingredients) {
        const ingredients = meal.ingredients
          .split(",")
          .map((item) => item.trim());
        allIngredients.push(...ingredients);
      }
    });

    // Process dinner meals
    mealPlan.dinner.forEach((meal) => {
      if (meal.ingredients) {
        const ingredients = meal.ingredients
          .split(",")
          .map((item) => item.trim());
        allIngredients.push(...ingredients);
      }
    });

    // Process snacks
    mealPlan.snacks.forEach((snack) => {
      if (snack.ingredients) {
        const ingredients = snack.ingredients
          .split(",")
          .map((item) => item.trim());
        allIngredients.push(...ingredients);
      }
    });

    return allIngredients;
  };

  // Categorize ingredients
  const categorizeIngredients = (ingredients) => {
    const categories = {
      produce: [],
      protein: [],
      dairy: [],
      grains: [],
      pantry: [],
      spices: [],
      other: [],
    };

    // Define category keywords
    const categoryKeywords = {
      produce: [
        "apple",
        "banana",
        "berry",
        "berries",
        "orange",
        "lemon",
        "lime",
        "avocado",
        "tomato",
        "potato",
        "onion",
        "garlic",
        "carrot",
        "broccoli",
        "spinach",
        "kale",
        "lettuce",
        "cucumber",
        "pepper",
        "zucchini",
        "squash",
        "pumpkin",
        "eggplant",
        "mushroom",
        "celery",
        "asparagus",
        "cabbage",
        "cauliflower",
        "green",
        "fruit",
        "vegetable",
      ],
      protein: [
        "chicken",
        "beef",
        "pork",
        "lamb",
        "turkey",
        "fish",
        "salmon",
        "tuna",
        "shrimp",
        "tofu",
        "tempeh",
        "seitan",
        "egg",
        "eggs",
        "meat",
        "protein",
      ],
      dairy: [
        "milk",
        "cheese",
        "yogurt",
        "butter",
        "cream",
        "yoghurt",
        "curd",
        "dairy",
      ],
      grains: [
        "rice",
        "pasta",
        "bread",
        "oat",
        "oats",
        "cereal",
        "quinoa",
        "barley",
        "wheat",
        "flour",
        "grain",
        "noodle",
      ],
      pantry: [
        "oil",
        "vinegar",
        "sauce",
        "can",
        "canned",
        "bean",
        "beans",
        "lentil",
        "chickpea",
        "pea",
        "nut",
        "seed",
        "almond",
        "walnut",
        "peanut",
        "cashew",
        "honey",
        "syrup",
        "sugar",
        "chocolate",
        "cocoa",
        "broth",
        "stock",
      ],
      spices: [
        "salt",
        "pepper",
        "spice",
        "herb",
        "basil",
        "oregano",
        "thyme",
        "rosemary",
        "cinnamon",
        "cumin",
        "paprika",
        "turmeric",
        "curry",
        "chili",
        "powder",
        "seasoning",
      ],
    };

    // Categorize each ingredient
    ingredients.forEach((ingredient) => {
      const lowerIngredient = ingredient.toLowerCase();
      let categorized = false;

      for (const [category, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some((keyword) => lowerIngredient.includes(keyword))) {
          categories[category].push(ingredient);
          categorized = true;
          break;
        }
      }

      if (!categorized) {
        categories.other.push(ingredient);
      }
    });

    return categories;
  };

  // Get unique ingredients (remove duplicates)
  const getUniqueIngredients = (ingredients) => {
    const uniqueIngredients = {};

    ingredients.forEach((ingredient) => {
      // Skip very short ingredients (likely not valid)
      if (ingredient.length < 2) return;

      // Check if this ingredient is already in our list
      const key = ingredient.toLowerCase();
      if (!uniqueIngredients[key]) {
        uniqueIngredients[key] = ingredient;
      }
    });

    return Object.values(uniqueIngredients);
  };

  // Main processing
  const allIngredients = extractIngredients();
  const uniqueIngredients = getUniqueIngredients(allIngredients);
  const categorizedIngredients = categorizeIngredients(uniqueIngredients);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.entries(categorizedIngredients).map(([category, items]) => {
        if (items.length === 0) return null;

        return (
          <div key={category}>
            <h3 className="font-medium mb-2 capitalize">{category}</h3>
            <ul className="list-disc pl-5 space-y-1">
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
