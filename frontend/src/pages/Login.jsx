import React from 'react'
import { Login } from '../component/Login'

const LoginPage = () => {
  return (
<div className="flex items-center justify-center min-h-screen">
  <div className="bg-white p-6 rounded-lg shadow-2xl w-96">
    <h2 className="font-semibold mb-6 text-center">Login</h2>
   <Login />
  </div>
</div>
  
  )
}

export default LoginPage;