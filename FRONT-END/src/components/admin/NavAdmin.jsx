import React from "react";
import { NavLink } from "react-router-dom";
import DASHBOARD_LINKS from "../../utils/config/LinkDashboard";

const NavAdmin = () => {
    
    return (
        <aside className="bg-light border-end position-fixed top-0 start-0 vh-100 d-flex flex-column" style={{width: "230px"}}>
            <nav className="nav flex-column">
                {DASHBOARD_LINKS.map((link, index) => (
                    <NavLink key={index}
                    to={link.path}
                    className={({ isActive }) => 
                    "nav-link text-dark text-start px-3 py-2" + (isActive ? "active fw-bold bg-light border-start border-3 border-primary" : "")}>
                        <i className={`${link.icon} me-2`}></i>
                        {link.label}
                    </NavLink>
                ))}
            </nav> 
        </aside>
        
    )
}

export default NavAdmin