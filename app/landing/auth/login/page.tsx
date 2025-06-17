import { Suspense } from "react"
import { ClubBenefits } from "@/components/auth/culb-benefits"
import LoginForm from "@/components/auth/login-form"

function Login() {
  return (
    <main className="p-4 lg:p-16">
      <div className="min-h-screen flex bg-neutral-100 rounded-2xl items-center justify-center p-4">
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <Suspense fallback={<p>Loading login form...</p>}>
              <LoginForm />
            </Suspense>
          </div>
          <div className="w-full md:w-1/2 bg-white rounded-lg p-6">
            <ClubBenefits />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login
