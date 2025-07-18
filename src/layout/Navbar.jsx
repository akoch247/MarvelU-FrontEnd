import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Navbar.css";

export default function Navbar() {
    return (
        <motion.header
            id="navbar"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
                duration: 0.6, 
                ease: "easeOut",
                delay: 0.2,
            }}
        >
            <div id="brand">
                <img src = "/marvel.png" alt="Marvel Univeristy Logo" />
                <p>Marvel University</p>
            </div>
            <nav id="nav-links">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/faculty">Faculty</Link>
            </nav>
        </motion.header>
    )
}