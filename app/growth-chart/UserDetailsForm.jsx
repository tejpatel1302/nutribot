"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

const formSchema = z.object({
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
  role: z.string().min(1, "Role is required"),
  date: z.date(),
  age: z.string().optional(),
})

export default function UserDetailsForm({ initialData, onSubmit }) {
  const [showAgeField, setShowAgeField] = useState(
    initialData?.role === "child-male" || initialData?.role === "child-female",
  )

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: initialData?.height || "",
      weight: initialData?.weight || "",
      role: initialData?.role || "child-male",
      date: initialData?.date ? new Date(initialData.date) : new Date(),
      age: initialData?.age || "",
    },
  })

  const handleRoleChange = (value) => {
    form.setValue("role", value)
    setShowAgeField(value === "child-male" || value === "child-female")
  }

  const handleSubmit = (values) => {
    // Convert the date to string format for storage
    const formattedValues = {
      ...values,
      date: values.date.toISOString().split("T")[0],
    }
    onSubmit(formattedValues)
  }

  return (
    <div className="w-6/12 mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6">Enter Your Details</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height (cm)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter height in cm" {...field} />
                  </FormControl>
                  <FormDescription>Enter your height in centimeters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter weight in kg" {...field} />
                  </FormControl>
                  <FormDescription>Enter your weight in kilograms</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={handleRoleChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="child-male">Child (Male)</SelectItem>
                    <SelectItem value="child-female">Child (Female)</SelectItem>
                    <SelectItem value="adult-male">Adult (Male)</SelectItem>
                    <SelectItem value="adult-female">Adult (Female)</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Select your role to see the appropriate growth chart</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {showAgeField && (
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age (years)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter age in years" {...field} />
                  </FormControl>
                  <FormDescription>Enter age in years (required for children)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of Measurement</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>The date when measurements were taken</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            Generate Growth Chart
          </Button>
        </form>
      </Form>
    </div>
  )
}

