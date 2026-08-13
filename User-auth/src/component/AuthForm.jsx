import React from 'react'

import { Turnstile } from '@marsidev/react-turnstile'
import { useState } from 'react'
import Captcha from './Captcha';
const AuthForm = () => {
     const [token, setToken] = useState(null);
  return (
   
    <div className=''>
        <h1>Create Account</h1>
        <form action="">
            <div className='border-2 border-gray-500 rounded-sm p-2 my-2'>
                <input
                    className='border-none outline-none focus:outline-none focus:ring-0 w-full'
                    type="text" 
                    placeholder='Full Name (As per PAN)'
                />
            </div>
            <div  className='border-2 border-gray-500 rounded-sm p-2 my-2'>
                <input
                    className='border-none outline-none focus:outline-none focus:ring-0 w-full'
                    type="text" 
                    placeholder='Email ID'
                />
            </div>
            <div  className='border-2 border-gray-500 rounded-sm p-2 my-2'>
                <input
                    className='border-none outline-none focus:outline-none focus:ring-0 w-full'
                    type="text" 
                    placeholder='Password'
                />
            </div>
           <Captcha/>
             
            <button className='w-full' type='Sumbit'>
                <p className='px-4 py-3 whitespace-nowrap font-semibold bg-blue-900/70 rounded-sm'>Create Account With Email</p>
            </button>
        </form>
    </div>
  )
}

export default AuthForm