"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Validation schemas
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
    role: z.enum(["adult", "kid"], { message: "Please select a role" }),
    // Kid profile fields (optional based on role)
    kidName: z.string().optional(),
    kidDob: z.string().optional(),
    kidBirthWeight: z.string().optional(),
    kidBirthHeight: z.string().optional(),
    kidHealthCondition: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      // If role is kid, kid profile fields are required
      if (data.role === "kid") {
        return !!data.kidName && !!data.kidDob
      }
      return true
    },
    {
      message: "Kid name and date of birth are required for kid profiles",
      path: ["kidName"],
    },
  )

// Function to decode JWT token
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
        .join(""),
    )

    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}

export default function AuthDialog() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [userInitial, setUserInitial] = useState("")
  const [selectedRole, setSelectedRole] = useState("adult")
  //   const { toast } = useToast()

  // Check if user is already logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (token) {
      const decodedToken = decodeJWT(token)
      if (decodedToken && decodedToken.email) {
        setIsLoggedIn(true)
        setUserEmail(decodedToken.email)
        setUserInitial(decodedToken.email.charAt(0).toUpperCase())
      }
    }
  }, [])

  // Login form
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Register form
  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "adult",
      kidName: "",
      kidDob: "",
      kidBirthWeight: "",
      kidBirthHeight: "",
      kidHealthCondition: "",
    },
  })

  // Handle login submission
  async function onLoginSubmit(data) {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:8080/api/v1/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Login failed")
      }

      // Store token in localStorage
      // Note: For better security in production, consider using httpOnly cookies
      localStorage.setItem("authToken", result.data)

      // Decode token to get user info
      const decodedToken = decodeJWT(result.data)
      if (decodedToken && decodedToken.email) {
        setIsLoggedIn(true)
        setUserEmail(decodedToken.email)
        setUserInitial(decodedToken.email.charAt(0).toUpperCase())
      }

      toast({
        title: "Login successful",
        description: "You have been logged in successfully.",
      })

      setOpen(false)
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle role change:
  const handleRoleChange = (value) => {
    setSelectedRole(value)
    registerForm.setValue("role", value)
  }

  // Handle registration submission
  async function onRegisterSubmit(data) {
    setIsLoading(true)
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registerData } = data

      // If role is not kid, remove kid profile fields
      if (registerData.role !== "kid") {
        delete registerData.kidName
        delete registerData.kidDob
        delete registerData.kidBirthWeight
        delete registerData.kidBirthHeight
        delete registerData.kidHealthCondition
      }

      const response = await fetch("http://localhost:8080/api/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Registration failed")
      }

      toast({
        title: "Registration successful",
        description: "Your account has been created successfully.",
      })

      // Switch to login tab after successful registration
      setActiveTab("login")
      registerForm.reset()
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle logout
  function handleLogout() {
    localStorage.removeItem("authToken")
    setIsLoggedIn(false)
    setUserEmail("")
    setUserInitial("")

    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })
  }
  console.log(isLoggedIn, "hi")
  return (
    <>
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline">{userEmail}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Login</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Account</DialogTitle>
              <DialogDescription>Login to your account or create a new one.</DialogDescription>
            </DialogHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-h-96 overflow-y-scroll">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4 py-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                        </>
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              {/* Register Form */}
              <TabsContent value="register" >
                <Form {...registerForm} >
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4 py-4 ">
                    <FormField
                      control={registerForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <Select onValueChange={(value) => handleRoleChange(value)} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="adult">Adult</SelectItem>
                              <SelectItem value="kid">Kid</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {selectedRole === "kid" && (
                      <div className="space-y-4 border p-4 rounded-md">
                        <h3 className="font-medium">Kid Profile</h3>
                        <FormField
                          control={registerForm.control}
                          name="kidName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Kid's Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Kid's name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="kidDob"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date of Birth</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="kidBirthWeight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Birth Weight (kg)</FormLabel>
                              <FormControl>
                                <Input type="number" step="0.01" placeholder="3.5" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="kidBirthHeight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Birth Height (cm)</FormLabel>
                              <FormControl>
                                <Input type="number" step="0.1" placeholder="50" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="kidHealthCondition"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Health Conditions (if any)</FormLabel>
                              <FormControl>
                                <Input placeholder="Any health conditions" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                        </>
                      ) : (
                        "Register"
                      )}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

