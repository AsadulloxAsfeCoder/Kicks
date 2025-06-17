"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useCookies } from "react-cookie"
import { useToast } from "@/components/common/toast-provider"
import AxiosInstance from "@/lib/axios"

// UI Components
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

const formSchema = z.object({
  firstName: z.string().min(1, { message: "Ism kiritilishi shart" }),
  lastName: z.string().min(1, { message: "Familiya kiritilishi shart" }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Jinsni tanlang",
  }),
  email: z.string().email({ message: "To'g'ri email kiriting" }),
  password: z
    .string()
    .min(8, { message: "Parol kamida 8 belgidan iborat bo'lishi kerak" })
    .regex(/[A-Z]/, { message: "Kamida 1 ta katta harf bo'lishi kerak" })
    .regex(/[a-z]/, { message: "Kamida 1 ta kichik harf bo'lishi kerak" })
    .regex(/[0-9]/, { message: "Kamida 1 ta raqam bo'lishi kerak" })
    .regex(/[^A-Za-z0-9]/, { message: "Kamida 1 ta maxsus belgi bo'lishi kerak" }),
  agreeTerms: z.boolean().refine((val) => val, {
    message: "Foydalanish shartlariga rozilik berishingiz kerak",
  }),
  rememberMe: z.boolean().optional(),
})

type FormValues = z.infer<typeof formSchema>

const RegisterForm = () => {
  const [cookies, setCookie] = useCookies(["email"])
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: undefined,
      email: cookies.email || "",
      password: "",
      agreeTerms: false,
      rememberMe: false,
    },
  })

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true)
    setApiError(null)

    try {
      const response = await AxiosInstance.post("/accounts/signup/", values)
      setCookie("email", values.email, { path: "/" })

      toast.success("Registration successful", {
        description: "Welcome to Kicks! Your account has been created.",
      })

      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      })

      if (result?.ok) {
        router.push("/dashboard")
      } else {
        toast.error("Login failed", {
          description: "Login failed after registration",
        })
      }
    } catch (error: any) {
      console.error("API Error:", error)
      setApiError("Registration failed. Please try again..")
      toast.error("Registration failed.", {
        description: error.response?.data?.message || "There was an error creating the account.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sign up</h1>
        <Link href="/auth/login" className="hover:underline text-sm text-neutral-800">
        Do you have an account? Log in
        </Link>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <fieldset disabled={isLoading} className="space-y-6">
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Surname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <h2 className="text-base font-medium mb-2">Jins</h2>
                  <div className="flex gap-6">
                    {["male", "female", "other"].map((gender) => (
                      <div key={gender} className="flex items-center">
                        <input
                          type="radio"
                          id={gender}
                          checked={field.value === gender}
                          onChange={() => field.onChange(gender)}
                          className="mr-2 h-4 w-4"
                        />
                        <Label htmlFor={gender} className="text-sm capitalize">
                          {gender === "male" ? "Erkak" : gender === "female" ? "Ayol" : "Boshqa"}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="password" placeholder="Parol" {...field} />
                    </FormControl>
                    <p className="text-xs text-neutral-500 mt-1">
                    Must be at least 8 characters, uppercase and lowercase letters, numbers, and special characters.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="agreeTerms"
              render={({ field }) => (
                <FormItem className="flex items-start gap-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <Label className="text-sm">
                  I agree to the Terms of Use and Privacy Policy.
                  </Label>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-start gap-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <Label className="text-sm">remember me</Label>
                </FormItem>
              )}
            />

            {apiError && <p className="text-xs text-red-500 mt-1">{apiError}</p>}

            <Button type="submit" className="w-full h-12" disabled={isLoading}>
              <span className="mx-auto font-medium">
                {isLoading ? "Ro'yxatdan o'tilmoqda..." : "Ro'yxatdan o'tish"}
              </span>
            </Button>
          </fieldset>
        </form>
      </Form>
    </div>
  )
}

export default RegisterForm