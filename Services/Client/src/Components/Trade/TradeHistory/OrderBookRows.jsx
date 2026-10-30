import React from 'react'



const TradeSummaryRow = ({idx, item, type }) => {
  // Clamp percent between 0 and 100 to prevent overflow bugs
  const percent = Math.min(Math.max(item * 10, 0), 100);

  return (
    <div className="relative w-full grid grid-cols-[1fr_1fr_1fr] text-[70%] items-center overflow-hidden">
      {/* Background Percentage Fill Bar */}
      <div 
        style={{ width: `${percent}%` }}
        className={`absolute inset-y-0 ${
          type === "Buy" ? 'left-0 bg-green-500/20' : 'right-0 bg-red-500/20'
        } pointer-events-none transition-all duration-200`}
      />

      {/* Row Data (z-10 ensures text renders above the background bar) */}
      <div className={`text-end p-1  ${type === "Buy" ? "text-green-500" : "text-red-500"}`}>
        {item}
      </div>
      <div className='text-end p-1 '>{item}</div>
      <div className='text-end p-1 '>{item}</div>
    </div>
  );
};

const OrderBookRows = ({type}) => {
  const data = [1,2,3,4,5,6,7,8,9,10]
  return (
    <div>
      {data.map((idx,item)=>{
        return <TradeSummaryRow key={idx} item={item} type={type}/>

      })}
    </div>
  )
}

export default OrderBookRows