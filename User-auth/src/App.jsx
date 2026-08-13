import React from 'react'
import LeftCompnent from './component/LeftCompnent'
import RightComponent from './component/RightComponent'

const App = () => {
  return (
    <>
      <div className='flex justify-between'>
        <LeftCompnent/>
        <RightComponent/>
      </div>
    </>
  )
}

export default App