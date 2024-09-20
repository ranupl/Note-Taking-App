import React from 'react'
import { SignUp } from '../component/signUp';

const SignPage = () => {
  return (
<div className="flex items-center justify-center min-h-screen">
  <div className="bg-white p-6 rounded-lg shadow-2xl w-96">
  <h2 className="font-semibold mb-6 text-center">SignUp</h2>
   <SignUp />
  </div>
</div>
  
  )
}

export default SignPage;