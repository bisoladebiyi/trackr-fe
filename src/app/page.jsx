"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes';

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(ROUTES.DASHBOARD);
  },[])

  return (
    <div></div>
  )
}

export default Home