import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="d-flex justify-content-center">
            <p className="mx-auto p-2">
                Copyright
            </p>
            <p className="mx-auto p-2">
                <Link to='cgv' >CGV</Link>
            </p>
            <p className="mx-auto p-2">
                <Link to='mentionLeg'>Mentions Légales</Link>
            </p>
            
        </div>
    )
}

export default Footer