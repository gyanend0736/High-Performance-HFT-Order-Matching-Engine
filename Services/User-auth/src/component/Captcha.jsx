import React, { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'

const Captcha = () => {
   const [token, settoken] = useState(null)
   const handleSubmit= async (token)=>{
    if(!token){
      console.log("no token ");
      return;
    }
    const res= await fetch('api/login', {
      mathod: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: 'user@example.com', 
        turnstileToken: token 
      }),
    })
    const data = await res.json();
    console.log(data);
   }
  return (
    
        <Turnstile
        siteKey="0x4AAAAAAEJ9yIR5bQdSLWxk"
        onSuccess={(token) => setToken(token)}
        onError={() => setToken(null)}
        onExpire={() => setToken(null)}
      />
   
  )
}

export default Captcha