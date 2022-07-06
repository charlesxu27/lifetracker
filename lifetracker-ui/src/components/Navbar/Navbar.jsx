import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'


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
    if (props.appState.user) {
        return (
            <div className='navlink'>
                <Link className="links" to="/activity"> Activity </Link>
                <Link className="links" to="/exercise"> Exercise </Link>
                <Link className="links" to="/nutrition"> Nutrition </Link>
                <Link className='links' to="/" onClick={() => {props.setAppState({})}}>Logout</Link>
            </div>
        )
    } else {
        return (
            <div className='navlink'>
                <Link className="links" to="/activity"> Activity </Link>
                <Link className="links" to="/exercise"> Exercise </Link>
                <Link className="links" to="/nutrition"> Nutrition </Link>
                <Link className='links' to="/login">Login</Link>
                <Link className='links' to="/register">Sign Up</Link>
            </div>
        )
    }
}



