import React from "react";
import './home.css'
import backgound1 from '../../assets/backgound1.svg'
import backgound2 from '../../assets/backgound2.svg'
import logo from '../../assets/Logo-03.svg'
import commapp from '../../images/community_app.png'
import useScrollAnimation from "../../hooks/useScrollAnimation";
import arrowright from '../../assets/arrow-right.svg'
import background3 from '../../assets/backgound3.svg'
import repoapp1 from '../../images/repo_example_1.png'
import repoapp2 from '../../images/repo_example_2.png'
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();

    const handleNavigate = (to)=>{
        navigate(to);
    }
    useScrollAnimation("big-text")
    useScrollAnimation("meduim-text")
    useScrollAnimation("header")
    useScrollAnimation("hero-logo-wrapper")
    useScrollAnimation("comm-app-container")
    useScrollAnimation("comm-app-description")
    useScrollAnimation("repo-app-container1")
    useScrollAnimation("repo-app-container2")
    useScrollAnimation("repo-app-description")
    return (
        <div className="landingpage">
            <img className="backgound1" loading="lazy" src={backgound1}/>
            <img className="backgound2" loading="lazy" src={backgound2}/>
            <img className="backgound3" loading="lazy" src={background3}/>
        <div className="home">
            <div className="header">
                <div className="text-area">
                    <div className="big-text">
                        Code, Collaborate !
                    </div>
                    <div className="description">
                    A cutting-edge platform for developers to share, collaborate, and distribute software. Host your code, manage projects, and offer executable downloads.
                    </div>
                    <button onClick={()=>handleNavigate('/login')} className="sign-up-header">Sign up</button>
                </div>
                <div className="big-logo">
                    <div className="hero-logo-wrapper">
                    <img className="hero-logo" loading="lazy" src={logo}></img>
                    </div>
                </div>
            </div>
            <main className="community-app-landing-page">
                
                <aside className="comm-app-container">
                    <img className="comm-app-slide" loading="lazy" src={commapp}></img>
                </aside>
                <section className="comm-app-description">
                    
                    <div className="meduim-text">
                        <div className="line"> Explore the best</div>
                        <div className="line"> Apps from</div>
                        <div className="line"> Our Community!</div>
                    </div>
                    
                    <div className="white-description">
                    Explore the best apps created by our community! 
                    </div>
                    <div className="white-description2">
                    Innovative, student-built, and ready to inspire—discover the top apps created by our talented community.
                    </div>
                    
                    <button onClick={()=> handleNavigate('/appstore')} className="comm-app-button">Check Out<img className="" src={arrowright}/></button>
                    
                </section>
                
            </main>
            <main className="repo-app-landing-page">
            
            <aside className="repo-app-container1">
                    <img className="repo-app-slide" loading="lazy" src={repoapp1}></img>
            </aside>
            <aside className="repo-app-container2">
                    <img className="repo-app-slide" loading="lazy" src={repoapp2}></img>
            </aside>
            <section className="repo-app-description">
            <div className="meduim-text">
                        <div className="line"> Discover with us</div>
                        <div className="line"> great repositories</div>
                        <div className="line"> for your projects!</div>
            </div>
            <div className="white-description3">
            Discover with us amazing repositories to boost your projects and bring your ideas to life!"
            </div>
            </section>
            <section className="repo-app-button-container">
                <button className="repo-app-button" onClick={()=> handleNavigate('/home')}>
                    Start now
                </button>
            </section>
            </main>
        </div>
        </div>
    )
}
export default Home;
