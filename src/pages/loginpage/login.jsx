import React, { useState, useEffect } from "react";
import logo from '../../assets/logo.svg';
import './login.css';
import closedeye from '../../assets/closedeye.svg';
import eye from '../../assets/eye.svg';
import Loader from "../../components/loader/loader";
import google from '../../assets/google-logo.svg';
import PageLoader from "../../components/loader/pageloader";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../../hooks/useApiRequest";

const CLIENT_ID = "817811136426-iq7trbk1fq5hqtfrenqra9qfr8stuobh.apps.googleusercontent.com"; 

const LoginPage = () => {

    const [isShown, setIsShown] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const handleGoogleLogin = async (response) => {
        setLoading(true);
            
            window.location.href = 'http://localhost:3002/auth/google';
    };
    const navigate = useNavigate()
    
    window.handleGoogleLogin = handleGoogleLogin;
    useEffect(() => {
        
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.onload = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: CLIENT_ID,
                    callback: window.handleGoogleLogin,
                });
                setLoading(false)
            
            } else {
                console.error("Google API script failed to load.");
                setLoading(false)
            }
        };
        document.body.appendChild(script);
    }, []);

    const handleEmailInput = (e) => setEmail(e.target.value);
    const handlePasswordInput = (e) => setPassword(e.target.value);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        
        setTimeout(() => {
            setLoading(false);
            console.log("Login successful:", { email, password });
            navigate('/home/profile')
        }, 3000); 
    };
    const HandleShow = (e) => {
        e.preventDefault();
        setIsShown(!isShown);
    };

    
    return (
        <div className="loginpage">
            {loading ? <PageLoader/> : <></>}
            <aside className="login-left">
                <div className="logo-div-left">
                    <p className="logo-text">Soft Nest</p>
                    <img className="login-logo" alt="logo" src={logo} />
                </div>
            </aside>
            <main className="login-right">
                <div className="logo-div-right">
                    <p className="logo-text">Soft Nest</p>
                    <img className="login-logo" alt="logo" src={logo} />
                </div>
                <section className="login">
                    <div className="login-header">
                        <h1 className="login-text-header">Login</h1>
                        <h6 className="login-text">Glad you're back..!</h6>
                    </div>
                    <div className="or">
                        <div className="space"></div>
                        <p className="or-text">Sign in with Google</p>
                        <div className="space"></div>
                    </div>
                    
                    <button className="google-login" onClick={handleGoogleLogin}>
                        
                        <span style={{fontSize:16}}>Sign in with Google @estin.dz</span><img src={google} alt="Google logo" className="google" style={{marginLeft: '10px'}} />
                    </button>
                </section>
            </main>
        </div>
    );
}

export default LoginPage;
