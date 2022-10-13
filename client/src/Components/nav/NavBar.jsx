import React,{useState} from 'react'
import './navbar.scss'
import logo from '../assets/logo.png'
import pic from '../assets/pic.jpg'
import { Search, Notifications, ArrowDropDown } from '@mui/icons-material'

const NavBar = () => {

    const [isScrolled, setisScrolled] = useState(false);
    window.onscroll=()=>{
        setisScrolled(window.pageYOffset === 0 ? false : true)
        //cleanup
        return () => (window.onscroll = null)
    }


    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <img src={logo} alt="Logo" />
                    <span>HomePage</span>
                    <span>Series</span>
                    <span>Movies</span>
                    <span>New and Popular</span>
                    <span>My List</span>
                </div>
                <div className="right">
                    <Search className='icon' />
                    <span>KID</span>
                    <Notifications className='icon' />
                    <img src={pic} alt="img here" />
                    <div className="profile">
                        <ArrowDropDown className='icon' />
                        <div className="options">
                            <span>Settings</span>
                            <span>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar