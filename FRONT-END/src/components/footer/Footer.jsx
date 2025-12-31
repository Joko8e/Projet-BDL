import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="col-12 d-flex justify-content-center" style={{backgroundColor:"#552583"}}>
            <p className="mx-auto p-2">
                Copyright
            </p>
            <p className="mx-auto p-2">
                <Link to='cgv' >CGV</Link>
            </p>
            <p className="mx-auto p-2">
                <Link to='mentionLeg'>Mentions Légales</Link>
            </p>
            
        </footer>
    )
}

export default Footer