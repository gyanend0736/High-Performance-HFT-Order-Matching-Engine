import React from 'react'
import AuthForm from './AuthForm'

const RightComponent = () => {
  return (
    <>
        <div className='relative w-2/3 h-screen'>
            <div className='h-1/2 w-1/2 absolute left-1/2 right-1/2 -translate-x-1/2 translate-y-1/2'>
                <AuthForm/>
            </div>

        </div>
    </>
  )
}

export default RightComponent