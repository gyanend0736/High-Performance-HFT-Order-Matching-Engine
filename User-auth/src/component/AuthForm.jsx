import React from 'react'

import { Turnstile } from '@marsidev/react-turnstile'
import { useState } from 'react'
import Captcha from './Captcha';
const AuthForm = () => {
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [Login, setLogin] = useState(true)
    function handleFormSumbit(e){
        e.preventDefault()
        console.log(Name)
        console.log(Email)
        console.log(Password)
    }
  return (
   
    <div className=''>
        <h1>Create Account</h1>
        <form action="">
            {!Login &&
            <div className={`border-2 border-gray-500 rounded-sm p-2 my-2 ${(Login)?'none':''}`}>
                <input
                    className='border-none outline-none focus:outline-none focus:ring-0 w-full'
                    type="text" 
                    required
                    placeholder='Full Name (As per PAN)'
                    value={Name}
                    onChange={(e)=>{
                        setName(e.target.value)   
                    }}
                />
            </div>
            }
            <div  className='border-2 border-gray-500 rounded-sm p-2 my-2'>
                <input
                    className='border-none outline-none focus:outline-none focus:ring-0 w-full'
                    type="text" 
                    placeholder='Email ID'
                     value={Email}
                     required
                    onChange={(e)=>{
                        setEmail(e.target.value)    
                    }}
                />
            </div>
            <div  className='border-2 border-gray-500 rounded-sm p-2 my-2'>
                <input
                    className='border-none outline-none focus:outline-none focus:ring-0 w-full'
                    type="text" 
                    placeholder='Password'
                     value={Password}
                     required
                    onChange={(e)=>{
                        setPassword(e.target.value)   
                    }}
                />
            </div>
           <Captcha/>
             
            <button className='w-full' 
            type='Sumbit' 
            onClick={(e)=>{
                handleFormSumbit(e)
                }}>
                <p className={`px-4 py-3 whitespace-nowrap font-semibold rounded-sm ${(Name==''|| Email==''||Password=='')?'bg-blue-900/50':'bg-blue-900/70'}`}>Create Account With Email</p>
            </button>
        </form>
        <hr className="border-t border-gray-300 my-4" />

        <p className='text-gray-500'>Already have an Account <button className='text-blue-500/90' onClick={()=>{
            setLogin(Login => !Login)
            console.log(Login)
        }}>Login</button></p>
    </div>
  )
}

export default AuthForm