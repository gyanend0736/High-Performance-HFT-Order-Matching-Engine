
import AnnouncementBanner from './AnnouncementBanner'
import NavBar from './NavBar'


const Header = () => {
   
  return (
    <header className='px-[1%] h-[15%] z-1 fixed w-full'>
        <AnnouncementBanner/>
        <NavBar  />
    </header>
  )
}

export default Header