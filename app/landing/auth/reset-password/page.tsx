import ResetPasswordForm from '@/components/auth/reset-password'
import React from 'react'
const ResetPassword =()=> {
  return (
    <main className='p-4 lg:p-16'>
      <div className='bg-neutral-100 rounded-3xl p-4'>
      <ResetPasswordForm/>
      </div>
    </main>
  )
}

export default ResetPassword
