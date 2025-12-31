import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import {motion} from "framer-motion";

//Motion est une bibliothèque pour les animations dans React

const Template = () => {
    return (
        <div>
            <Header />
            {/* Motion va servir à animer les transitions entre les pages */}
            <motion.div
                style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}>
            
            <main style={{ flex: 1 }}>
                <section>
                    <Outlet/>
                </section>
            </main>
            </motion.div>
            <Footer/>
        </div>
    )
}

export default Template