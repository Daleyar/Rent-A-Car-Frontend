import React from "react";
import { Link } from "react-router-dom";
import './NavBar.css'

const NavBar = ({user}) => {
  return (
    <div>
      <nav className="navbar"> 
        <div className="container-fluid">
            <ul className="navbar-nav me-auto">
            {user.email &&
                <div >
                    <li className="nav-item">
                        <Link className="nav-link" to={"/home"}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/rental"}>Rental</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/profile"}>Profile</Link>
                    </li>
                </div>
            }
            {!user.email &&
                <div>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/login"}>Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/register"}>Register</Link>
                    </li>
                </div>
            } 
            </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;