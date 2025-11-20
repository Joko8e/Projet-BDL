import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";


const Template = () => {
    return (
        <div>
            <Header/>
            <section>
                <Outlet/>
            </section>
            <Footer/>
        </div>
    )
}

export default Template