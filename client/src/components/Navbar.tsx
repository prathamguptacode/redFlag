import mystyle from './navbar.module.css'
import { Flag, UserRoundPlus, } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Input } from './ui/input'
import { Button } from './ui/button'



function Navbar() {

  const navigate = useNavigate()
  return (
    <div className={mystyle.navbar}>
      <button className={mystyle.logoBox} onClick={() => navigate("/")} >
        <div><Flag fill='#FF645C' size={32} /></div>
        <div className={mystyle.logo}>Red Flags</div>
      </button>
      <div className={mystyle.searchBox}>
        <Input placeholder='search...' type='text' />
      </div>
      <div>
        <Button className='py-3 md:py-2' onClick={() => navigate("/contribute")}>
          <div className={mystyle.btnContent}>
            <div>Contribute</div> <UserRoundPlus size={17} />
          </div>
        </Button>
      </div>
    </div >
  )
}

export default Navbar
