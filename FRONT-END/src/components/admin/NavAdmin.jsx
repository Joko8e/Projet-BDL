import React from "react";
import { Link } from "react-router-dom";

const NavAdmin = () => {
    
    return (
        <nav>
        <ul>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='marque'>Marque</Link>
            </li>
            <li>
                <Link to='product'>Product</Link>
            </li>
        </ul>
        </nav>
    )
}

export default NavAdmin