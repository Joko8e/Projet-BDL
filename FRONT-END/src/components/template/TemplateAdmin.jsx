import React from "react";
import { Outlet } from "react-router-dom";
import NavAdmin from "../admin/NavAdmin";


const TemplateAdmin = () => {

    return (
        <div>
            <NavAdmin/>
            <Outlet/>
        </div>
    )
}

export default TemplateAdmin