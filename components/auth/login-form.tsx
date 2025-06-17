"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import Image from "next/image"

// Auth response tipini aniqlaymiz
type AuthResponse = {
  error?: string
  ok: boolean
  status: number
  url?: string | null
}

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Iltimos, to'g'ri email manzil kiriting" }),
  password: z
    .string()
    .min(6, { message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" }),
  rememberMe: z.boolean().optional(),
})

type FormValues = z.infer<typeof formSchema>

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl,
      }) as AuthResponse | undefined

      if (!result) {
        throw new Error("No response from the server.")
      }

      if (result.error) {
        form.setError("email", {
          type: "manual",
          message: "Incorrect email or password.",
        })
        form.setError("password", {
          type: "manual",
          message: "Incorrect email or password.",
        })
      } else if (result.ok) {
        router.push(callbackUrl)
      } else {
        throw new Error("Authentication failed.")
      }
    } catch (error) {
      console.error("Login error:", error)
      form.setError("root", {
        type: "manual",
        message: "A system error has occurred. Please try again later.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignIn = (provider: string) => {
    signIn(provider, { callbackUrl })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Login to the system</h1>
        <Link
          href="/landing/auth/forget-password"
          className="text-sm text-neutral-800 hover:underline block"
        >
          Forgot your password?
        </Link>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {form.formState.errors.root && (
            <p className="text-sm text-red-500">
              {form.formState.errors.root.message}
            </p>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    disabled={isLoading}
                    className="h-12 border-neutral-300 bg-white rounded-md"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500 mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Parol"
                    disabled={isLoading}
                    className="h-12 border-neutral-300 bg-white rounded-md"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500 mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-start gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    id="rememberMe"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-1"
                  />
                </FormControl>
                <div>
                  <Label htmlFor="rememberMe" className="text-sm font-normal">
                   remember me
                  </Label>
                  <p className="text-sm text-neutral-600">Additional Information</p>
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-neutral-900 hover:bg-black text-white flex justify-between items-center"
          >
            <span className="sr-only">Login to the system</span>
            <span className="mx-auto font-medium">
              {isLoading ? "ENTERING..." : "LOGIN BY EMAIL"}
            </span>
            <ArrowRight className="h-4 w-4" />
          </Button>

          <div className="grid grid-cols-3 gap-4">
            {["google", "apple", "facebook"].map((provider) => (
              <Button
                key={provider}
                type="button"
                variant="outline"
                disabled={isLoading}
                className="h-12 border-neutral-300 flex justify-center"
                onClick={() => handleSocialSignIn(provider)}
              >
                <Image
                  src={`/images/icons/${provider}.svg`}
                  alt={`${provider} logotipi`}
                  className="h-6 w-6"
                  width={24}
                  height={24}
                />
              </Button>
            ))}
          </div>

          <Link
            href="/landing/auth/register"
            className="text-sm text-neutral-800 hover:underline block"
          >Don't have an account? Sign up
          </Link>

          <p className="text-xs text-neutral-700 mt-4">
         By clicking "Sign In", you agree to our Terms of Use, Privacy Policy, and 
          Terms & Conditions.
          </p>
        </form>
      </Form>
    </div>
  )
}

export default LoginForm