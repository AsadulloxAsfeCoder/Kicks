"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import AxiosInstance from "@/lib/axios"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

type FormValues = z.infer<typeof formSchema>

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    try {
      await AxiosInstance.post("/accounts/forget-password", {
        email: data.email,
      })

      if (typeof window !== "undefined") {
        localStorage.setItem("email", JSON.stringify(data.email))
        localStorage.setItem("resetPassword", "reset_password")
      }

      setIsSubmitted(true)
      router.push("/landing/auth/verify-otp")
    } catch (error) {
      form.setError("email", {
        type: "manual",
        message: "Failed to send reset link. Please try again later.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="space-y-6 max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold">KICKS</h1>
        <div className="p-6 bg-green-50 rounded-lg">
          <p className="text-green-700 font-medium">
            A password reset link has been sent to your email.
          </p>
          <p className="text-sm text-green-600 mt-2">
            Please check your inbox and follow the instructions.
          </p>
        </div>
        <Link
          href={`/landing/auth/login`}
          className="text-sm text-blue-600 hover:underline"
        >
          Back to login
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">KICKS</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email to reset your password
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    type="email"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full h-12"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Submit
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ForgotPasswordForm
