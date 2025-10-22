import React from "react";
import AboutContent from "../../components/About/AboutContent";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import './About.css'
export default function About (){
    return (
        <div className="about-page-container">
            <Navbar/>
            <AboutContent/>
            <Footer/>
        </div>
    )
}