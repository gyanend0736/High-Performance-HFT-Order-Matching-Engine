import React from 'react'

import { Turnstile } from '@marsidev/react-turnstile'
import { useState } from 'react'
import Captcha from './Captcha';

const AuthForm = () => {
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    
    const [Login, setLogin] = useState(false)
    function handleFormSumbit(e){
        e.preventDefault()
        console.log(Name)
        console.log(Email)
        console.log(Password)
        setName('')
        setEmail('')
        setPassword('')
    }
  return (
   
    <div className=''>
        <h1 className='text-2xl'>{!Login?("Create Account"):("Welcome Back!")}</h1>
        <form action="">

            {/*--------------------------- input 1 full name------------------------------- */}
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

            {/*--------------------- input 2 email id--------------------------- */}
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

        {/*--------------- input 3 Password-------------------------------- */}
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

            {/*-------------- Catcha --------------------------*/}
           <Captcha/>
             
             {/*-------------- form sumbit button -----------------*/}
            <button className='w-full' 
            type='Sumbit' 
            onClick={(e)=>{
                handleFormSumbit(e)
                }}>
                <p className={`px-4 py-3 whitespace-nowrap font-semibold rounded-sm ${(Name==''|| Email==''||Password=='')?'bg-blue-900/50':'bg-blue-700/70'}`}>{!Login?("Create Account With Email"):("Login")}</p>
            </button>
        </form>

        <hr className="border-t border-gray-300 my-4" />

        <p className='text-gray-500'>{!Login?("Already have an Account "):("Don't have a account ") }<button className='text-blue-500/90' onClick={()=>{
            setLogin(Login => !Login)
            console.log(Login)
        }}>{!Login?("Login"):("SignUp")}</button></p>
    </div>
  )
}

export default AuthForm