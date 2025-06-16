import React from 'react'
import ForgotPasswordForm from '@/components/auth/forget-password'

const ForgotPassword =()=> {
  return (
    <main className=' p-4 lg:p-16 rounded-2xl '>
        <div className='bg-neutral-100 p-4 rounded-2xl'>
      <ForgotPasswordForm/>
      </div>
    </main>
  )
}

export default ForgotPassword
