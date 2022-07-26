import React from 'react'
import "./Navbar.css"
import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "../../contexts/auth"


export default function Navbar(props) {
    return (
        <div>
            <nav className='navbar'>
                <Logo className='logo' />
                <NavLinks className='navlinks' appState={props.appState} setAppState={props.setAppState} />
            </nav>
        </div>
    )
}

export function Logo() {
    return (
        <Link className='logo' to="/"><img src="https://img.icons8.com/external-flaticons-flat-flat-icons/344/external-fitness-tracker-sport-equipment-flaticons-flat-flat-icons.png" />
        </Link>
    )
}

export function NavLinks(props) {

    const { user, authorized, logoutUser } = useAuthContext()
    const navigate = useNavigate()
  
    const handleLogout = () => {
      logoutUser()
      navigate("/")
    } 

    return (
        <div className="navlink">
          {/* <p>{user?.email ? user.email : null}</p> */}
          <Link to="/activity" className="links">Activity</Link>
          <Link to="/nutrition" className="links">Nutrition</Link>
          <span className="links">Sleep</span>
          <span className="links">Exercise</span>
          {user?.email
            ? <span className="logout-button links" onClick={handleLogout}>Logout</span>
            :  <Link to="/login" className="links">Login</Link>}
          {user?.email
            ? null
            : <Link to="/register" className="links">Sign Up</Link>}
        </div>
      )
}



