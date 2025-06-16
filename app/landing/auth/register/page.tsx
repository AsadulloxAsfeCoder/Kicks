import { ClubBenefits } from '@/components/auth/culb-benefits'
import RegisterForm from '@/components/auth/register-form'

import React from 'react'

function Register() {
  return (
    <main className='p-4 lg:p-16'>
        <div className="min-h-screen rounded-3xl bg-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <RegisterForm />
        </div>
        <div className="w-full md:w-1/2 bg-white rounded-lg p-6">
          <ClubBenefits />
        </div>
      </div>
    </div>
    </main>
  )
}

export default Register
