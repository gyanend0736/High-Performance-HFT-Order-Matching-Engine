import React from 'react'

const OrderButton = ({type}) => {
  return (
    <div className='text-sm sm:text-base md:text-lg lg:text-xl  text-center p-1 bg-green-500 m-1 '>
        <button>
            {type}
        </button>
    </div>
  )
}

const BuySellToggle = ()=>{
  return (
     <div className='relative h-full'>
        <div className='w-full absolute top-0  '>
          <OrderButton type={"Buy"}/>
          <OrderButton type={"Sell"}/>
        </div>
      </div>
  )
}

export default BuySellToggle