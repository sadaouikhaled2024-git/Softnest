import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../../hooks/useApiRequest"; // <-- YOUR HOOK here
import logo from '../../assets/logo.svg';
import closedeye from '../../assets/closedeye.svg';
import eye from '../../assets/eye.svg';
import Loader from "../../components/loader/loader";
import google from '../../assets/google-logo.svg';
import PageLoader from "../../components/loader/pageloader";
import './login.css';

const CLIENT_ID = "817811136426-iq7trbk1fq5hqtfrenqra9qfr8stuobh.apps.googleusercontent.com"; 

const LoginPage = () => {
    const [isShown, setIsShown] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [localLoading, setLocalLoading] = useState(false);

    const navigate = useNavigate();
    const { data, error, loading, request } = useApiRequest('https://your-api.com/'); // <-- change to your real API url!

    const handleGoogleResponse = async (response) => {
        console.log("Google Login Response:", response);
        if (response.credential) {
            setLocalLoading(true);
            try {
                const res = await request('auth/google', 'POST', { token: response.credential }); 
                console.log("Google login success:", res);
                navigate('/home/profile');
            } catch (err) {
                console.error("Google authentication failed!", err);
            } finally {
                setLocalLoading(false);
            }
        } else {
            console.error("Google authentication failed!");
        }
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.onload = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: CLIENT_ID,
                    callback: handleGoogleResponse,
                });
                window.google.accounts.id.renderButton(
                    document.getElementById('g_id_signin'),
                    { theme: 'outline', size: 'large' }
                );
            } else {
                console.error("Google API script failed to load.");
            }
        };
        document.body.appendChild(script);
    }, []);

    const handleEmailInput = (e) => setEmail(e.target.value);
    const handlePasswordInput = (e) => setPassword(e.target.value);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalLoading(true);
        try {
            const res = await request('auth/login', 'POST', { email, password });
            console.log("Login successful:", res);
            navigate('/home/profile');
        } catch (err) {
            console.error("Login failed:", err);
        } finally {
            setLocalLoading(false);
        }
    };

    const HandleShow = (e) => {
        e.preventDefault();
        setIsShown(!isShown);
    };

    const isLoading = loading || localLoading; // <-- Unified loading control

    return (
        <div className="loginpage">
            {isLoading && <PageLoader />}
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
                    <form className="login-input-section" onSubmit={handleSubmit}>
                        <div className="email">
                            <input className="input-email" value={email} onChange={handleEmailInput} placeholder="Username" />
                        </div>
                        <div className="password">
                            <div className="input-password">
                                <input className="input" value={password} onChange={handlePasswordInput} type={isShown ? 'text' : 'password'} placeholder="Password" />
                                <button className="show-pass" onClick={HandleShow}>
                                    <img src={isShown ? eye : closedeye} alt="eye-icon" />
                                </button>
                            </div>
                        </div>
                        <div className="check">
                            <input type="checkbox" className="remember-check" /> Remember me
                        </div>
                        <button className={isLoading ? 'submit-loading' : 'submit'} type="submit">
                            <Loader active={isLoading} text={'Logging in...'} />
                            {!isLoading && 'Log in'}
                        </button>
                    </form>
                    <div className="or">
                        <div className="space"></div>
                        <p className="or-text">Or</p>
                        <div className="space"></div>
                    </div>
                    <div id="g_id_signin"></div> {/* Google button rendered here */}
                </section>
            </main>
        </div>
    );
};

export default LoginPage;
