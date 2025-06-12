'use client';
import Button from '@/components/Button'
import Input from '@/components/Input'
import Logo from '@/components/Logo'
import { ROUTES } from '@/constants/routes'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Login = () => {
  const router = useRouter();

  const onLogIn = () => {
    router.push(ROUTES.DASHBOARD)
  };
  return (
    <div className='h-full grid place-items-center relative'>
      <Logo className={"absolute top-4 left-10"} />
      <div className="w-1/3">
        <h2 className='text-blue-950 text-2xl font-semibold mb-1'>Log In</h2>
        <p className="text-base text-blue-900 mb-5">Log in to your account</p>
        <form action="" className='flex flex-col gap-y-4'>
          <Input label="Email" type="email" />
          <Input label="Password" type="password" />
          <Button text="Log In" className="w-full" onClick={onLogIn} />
        </form>

        <p className='font-semibold text-blue-900 text-sm mt-8'>Don't have an account? <Link href={ROUTES.SIGNUP} className='text-primary'>Sign up</Link></p>
      </div>
    </div>
  )
}

export default Login