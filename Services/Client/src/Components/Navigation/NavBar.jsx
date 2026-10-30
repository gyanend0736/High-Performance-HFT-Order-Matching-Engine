
import NavItem from './NavItem'

import Logo from './Logo'
import AuthButtons from './AuthButtons'

const NavBar = () => {
     const navitems= [
        "Trade",
        "Future",
        "Options",
        "Learn",
        "Business", 
        "About us",
        "Support"
    ]
  return (
    <div className='w-full h-2/3 bg-white/30 backdrop-blur-md justify-between flex items-center px-[2%] py-[1%] '>
        <div className='flex  font-semibold'>
            <Logo/>
            
                {navitems.map((item,idx)=>{
                return <NavItem key={idx} item={item}/>
            })}
            
            
        </div>
        <div className='flex  font-light'>
            <AuthButtons type={"Create Account"} color={"blue"}/>
            <AuthButtons type={"Login"} />
        </div>
        
        
    </div>
  )
}

export default NavBar