"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { CheckCircle2, Loader2, RotateCw } from "lucide-react"

import AxiosInstance from "@/lib/axios"
import { cn } from "@/lib/utils"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

// ======= SCHEMA ========
const formSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "OTP must be exactly 6 digits." }),
})

const VerifOtpForm = () => {
  const [time, setTime] = useState(300)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [hasError, setHasError] = useState(false)

  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: "" },
  })

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime(t => t - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [time])

  const handleResendOTP = async () => {
    setIsResending(true)
    setHasError(false)

    try {
      const email = JSON.parse(localStorage.getItem("email") || "null")
      if (!email) throw new Error("Email not found")

      await AxiosInstance.post("/accounts/resend-otp/", { email })
      toast.success("New OTP code sent!")
      setTime(120)
    } catch (error: any) {
      const message = error?.message || "OTP resend failed"
      setError(message)
      setHasError(true)
      toast.error(message)
    } finally {
      setIsResending(false)
    }
  }

  const onSubmit = async (data: { otp: string }) => {
    setIsLoading(true)
    setHasError(false)
    setError(null)

    try {
      const email = JSON.parse(localStorage.getItem("email") || "null")
      const verifyType = localStorage.getItem("resetPassword") ?? "register"
      if (!email) throw new Error("Email not found. Please try again.")

      const response = await AxiosInstance.post("/accounts/verify-otp/", {
        otp: data.otp,
        verify_type: verifyType,
    email,
      })

      localStorage.setItem("verification", JSON.stringify(response.data.verification))
      localStorage.removeItem("resetPassword")

      if (verifyType === "reset_password") {
        router.push("/auth/reset-password")
      } else {
        localStorage.removeItem("email")
        router.push("/landing/auth/login")
      }

      setIsSuccess(true)
    } catch (error: any) {
      const message = error?.message || "Verification failed. Please try again."
      setError(message)
      setHasError(true)
      toast.error("Validation error", {
        description: `Entered code: ${data.otp}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto animate-fadeIn">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-3">
            <CheckCircle2 className="h-12 w-12 text-green-500 animate-pulse" />
            <h2 className="text-xl font-semibold">Verification is successful</h2>
            <p className="text-muted-foreground">Your account has been successfully verified.</p>
            <Button onClick={() => router.push("/landing/auth/login")}>Go to the login page</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto animate-fadeIn">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Kicks</CardTitle>
        <CardDescription className={cn("text-muted-foreground", hasError && "text-red-500 font-medium")}>  
          {hasError ? "Please enter the verification code again" : "Enter the 6-digit verification code"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="text-center">
                  <FormControl>
                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value)
                          setHasError(false)
                          if (value.length === 6) form.handleSubmit(onSubmit)()
                        }}
                        disabled={isLoading}
                      >
                        <InputOTPGroup>
                          {[0, 1, 2].map((i) => (
                            <InputOTPSlot key={i} index={i} className={hasError ? "border-red-500 text-red-500" : "border-input"} />
                          ))}
                        </InputOTPGroup>
                        <InputOTPSeparator className={hasError ? "text-red-500" : ""} />
                        <InputOTPGroup>
                          {[3, 4, 5].map((i) => (
                            <InputOTPSlot key={i} index={i} className={hasError ? "border-red-500 text-red-500" : "border-input"} />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex flex-col items-center gap-2">
              {time > 0 ? (
                <div className="text-sm font-medium text-muted-foreground">
                  Code Validity: <span className="text-primary">{Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}</span>
                </div>
              ) : (
                <Button
                  variant="link"
                  size="sm"
                  onClick={handleResendOTP}
                  disabled={isResending}
                >
                  {isResending ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <RotateCw className="mr-2 h-4 w-4" /> Resend Code
                    </span>
                  )}
                </Button>
              )}
            </div>

            <Button
              type="submit"
              className="w-full max-w-xs mx-auto"
              disabled={isLoading || form.getValues("otp").length !== 6}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Confirming...
                </span>
              ) : (
                "Verify Account"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default VerifOtpForm