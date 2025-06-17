"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import AxiosInstance from "@/lib/axios"

const formSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Must contain at least one number" }),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  })

type FormValues = z.infer<typeof formSchema>

const ResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    try {
      const email = JSON.parse(localStorage.getItem("email") || "null")
      const verification = JSON.parse(localStorage.getItem("verification") || "null")

      if (!email || !verification) throw new Error("Missing email or verification token")

      const response = await AxiosInstance.put("accounts/reset-password/", {
        password: data.password,
        confirm_password: data.confirm_password,
        email,
        verification,
      })

      if (response.status === 200) {
        localStorage.removeItem("email")
        localStorage.removeItem("verification")
        router.push("/landing/auth/login")
      }
    } catch (error) {
      console.error("Password reset failed:", error)
      form.setError("password", {
        type: "manual",
        message: "Password reset failed. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">KICKS</h1>
        <p className="text-sm text-gray-600">Enter your new password below</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* New Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Label>New Password</Label>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      className="h-12 pr-10"
                      disabled={isLoading}
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <Label>Confirm Password</Label>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      className="h-12 pr-10"
                      disabled={isLoading}
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full h-12" disabled={isLoading}>
            {isLoading ? "Resetting..." : (
              <span className="flex items-center justify-center gap-2">
                Reset Password <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>

          {/* Links */}
          <div className="text-center pt-4 space-y-1">
            <Link href={`/landing/auth/forget-password`} className="text-sm hover:underline block">
              Forgot your password?
            </Link>
            <Link href={`/landing/auth/login`} className="text-sm hover:underline block">
              Remember your password? Sign in
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ResetPasswordForm
