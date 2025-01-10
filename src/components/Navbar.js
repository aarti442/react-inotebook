import React  from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from './icon.png';
export default function Navbar() {
    const navigate = useNavigate();
    let location = useLocation();
    const handlelogout = () =>{
        localStorage.removeItem('token');
        navigate('/login')
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link className="logo-link" to="/"><img src={logo} style={{width:"60%"}} alt="inotbook"/></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  
                    <li className="nav-item">
                        <Link className={`nav-link  ${location.pathname === "/about" ? "active" : ""}`} to="/about">About iNotebook</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">My Notes</Link>
                    </li>

                </ul>
               {!localStorage.getItem('token')? <form className="d-flex"> 
                <Link className="btn mx-1 login" to="/login" role="button">Login</Link>
                <Link className="btn mx-1 signup" to="/signup" role="button">Signup</Link>
                </form> : <button className='btn logout-button' onClick={handlelogout}>Logout</button> }
            </div>
        </div>
    </nav>
    )
}
