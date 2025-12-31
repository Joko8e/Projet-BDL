import React from "react";
import { Outlet } from "react-router-dom";
import NavAdmin from "../admin/NavAdmin";


const TemplateAdmin = () => {

    return (
        <div className="d-flex flex-column vh-100">
            <div className="d-flex flex-grow-1" style={{ minHeight: "100vh" }}>
                <NavAdmin style={{ minHeight: "100vh" }} /> 
                <main className="flex-grow-1 p-4" style={{ minHeight: "100vh", marginLeft: "230px" }}>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}

export default TemplateAdmin