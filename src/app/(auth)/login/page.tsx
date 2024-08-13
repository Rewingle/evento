import LoginCard from '@/components/loginCard'
import React from 'react'

type Props = {}

function LoginPage({}: Props) {
  return (
    <div className='flex justify-center items-center'>
            <LoginCard/>
    </div>
  )
}

export default LoginPage