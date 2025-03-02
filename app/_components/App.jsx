"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Apple, ArrowRight, Dumbbell, Salad, Utensils } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  weight: z.string().min(1, { message: "Weight is required" }),
  height: z.string().min(1, { message: "Height is required" }),
  disease: z.string().optional(),
  gender: z.string().min(1, { message: "Gender is required" }),
  bodyType: z.string().min(1, { message: "Body type is required" }),
  age: z.string().min(1, { message: "Age is required" }),
  activityLevel: z.string().min(1, { message: "Activity level is required" }),
  dietaryPreferences: z.string().min(1, { message: "Dietary preference is required" }),
  dietaryRestrictions: z.string().optional(),
  budgetConstraints: z.string().min(1, { message: "Budget constraint is required" }),
  foodAllergies: z.string().optional(),
  fitnessGoals: z.string().min(1, { message: "Fitness goal is required" }),
})

export default function NutriBot() {
  const [dietPlanText, setDietPlanText] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: "",
      height: "",
      disease: "",
      gender: "",
      bodyType: "",
      age: "",
      activityLevel: "",
      dietaryPreferences: "",
      dietaryRestrictions: "",
      budgetConstraints: "",
      foodAllergies: "",
      fitnessGoals: "",
    },
  })

  async function onSubmit(data) {
    setIsLoading(true);
    setDietPlanText("Generating your personalized nutrition plan...");
    setIsDialogOpen(true);
    
    try {
      const queryParams = new URLSearchParams(data).toString();
      const response = await fetch(`http://localhost:3001/dietPlan?${queryParams}`);
      
      if (response.ok) {
        const result = await response.json();
        const plan = result?.dietPlan || "No diet plan generated.";
        setDietPlanText(plan);
        // Store the plan in local storage for later use
        localStorage.setItem("dietPlan", plan);
        localStorage.setItem("gender", data.gender)      // "male" / "female" / ...
        localStorage.setItem("userAge", data.age)        // e.g. "5"
        localStorage.setItem("userHeight", data.height)  // e.g. "110" (cm)
      } else {
        setDietPlanText("Error: Unable to fetch diet plan. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching diet plan:", error);
      setDietPlanText("Error: Unable to fetch diet plan. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }
  

  return (
    <div className="container mx-auto py-10 px-4 ">
      <Card className="border-none shadow-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Utensils className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold">NutriBot</CardTitle>
          </div>
          <CardDescription>
            Get personalized nutrition plans based on your health profile and goals
          </CardDescription>
        </CardHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4 mx-4">
                <TabsTrigger value="personal" className="flex items-center gap-2">
                  <Apple className="h-4 w-4" />
                  <span>Personal</span>
                </TabsTrigger>
                <TabsTrigger value="dietary" className="flex items-center gap-2">
                  <Salad className="h-4 w-4" />
                  <span>Dietary</span>
                </TabsTrigger>
                <TabsTrigger value="goals" className="flex items-center gap-2">
                  <Dumbbell className="h-4 w-4" />
                  <span>Goals</span>
                </TabsTrigger>
              </TabsList>
              
              <CardContent>
                <TabsContent value="personal" className="space-y-4 mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 70kg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 175cm" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter your age" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="others">Others</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="bodyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Body Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select body type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ectomorph">Ectomorph</SelectItem>
                              <SelectItem value="endomorph">Endomorph</SelectItem>
                              <SelectItem value="mesomorph">Mesomorph</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="activityLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Activity Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select activity level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="sedentary">Sedentary</SelectItem>
                              <SelectItem value="moderate">Moderate</SelectItem>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="athlete">Athlete</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="disease"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medical Conditions</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter any medical conditions or diseases (e.g., diabetes, hypertension)" 
                            className="resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          This helps us tailor your nutrition plan to your health needs
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="dietary" className="space-y-4 mt-0">
                  <FormField
                    control={form.control}
                    name="dietaryPreferences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dietary Preferences</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select dietary preference" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="vegetarian">Vegetarian</SelectItem>
                            <SelectItem value="vegan">Vegan</SelectItem>
                            <SelectItem value="keto">Keto</SelectItem>
                            <SelectItem value="paleo">Paleo</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dietaryRestrictions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dietary Restrictions</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter any dietary restrictions" 
                            className="resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Foods you avoid for cultural, religious, or personal reasons
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="foodAllergies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Food Allergies / Intolerances</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., gluten, lactose, nuts" 
                            className="resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="budgetConstraints"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget Constraints</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select budget" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low-cost">Low-cost</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="goals" className="space-y-4 mt-0">
                  <FormField
                    control={form.control}
                    name="fitnessGoals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fitness / Wellness Goals</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a goal" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="weight loss">Weight Loss</SelectItem>
                            <SelectItem value="muscle gain">Muscle Gain</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="rounded-lg bg-primary/5 p-4 border border-primary/10">
                    <h3 className="font-medium text-primary mb-2">How NutriBot Works</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI analyzes your profile to create a personalized nutrition plan that aligns with your health needs and fitness goals. The plan includes meal suggestions, portion guidance, and nutritional information.
                    </p>
                  </div>
                </TabsContent>
              </CardContent>
              
              <CardFooter className="flex justify-end gap-2 pt-2">
                <Button 
                  type="submit" 
                  className="gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Generating..." : "Generate Nutrition Plan"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Tabs>
          </form>
        </Form>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5 text-primary" />
              Your Personalized Nutrition Plan
            </DialogTitle>
            <DialogDescription>
              Based on your health profile and fitness goals
            </DialogDescription>
          </DialogHeader>
          <div className="text-sm text-foreground p-4 border rounded-lg bg-card overflow-y-auto max-h-[60vh]">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-pulse flex flex-col items-center gap-2">
                  <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  <p className="text-muted-foreground">Generating your plan...</p>
                </div>
              </div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: dietPlanText }} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
