import React, { useContext, useEffect, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
const LoginPopup = ({ setShowLogin }) => {

    const { isLogged, setIsLogged} = useContext(StoreContext);
  
    const [currState, setCurrState] = useState("Login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [isLogged, setIsLogged] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(isLogged);
        const payload = {
            name: "",
            email: email,
            password: password
        };

        try {
            const response = await axios.post('http://localhost:5201/api/Account/login', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = response.data;

            if (data.success === true && data.message === "Đăng nhập thành công") {
                console.log(data);
                alert(data.message);
                setIsLogged(true); 
                console.log(isLogged);
                // setShowLogin(false);
                
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
            alert('Lỗi khi gọi API:');
        }
    };
    useEffect(() => {
        if (isLogged) {
            alert(isLogged);
        }
    }, [isLogged]);
    return (
        <div className='login-popup'>
            {isLogged ? (
                <h3>Xin Chào</h3>
            ) : (
                <form className="login-popup-container" onSubmit={handleLogin}>
                    <div className="login-popup-title">
                        <h2>{currState}</h2>
                        <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                    </div>
                    <div className="login-popup-inputs">
                        <input type="email" placeholder='Your email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                    <div className="login-popup-condition">
                        <input type="checkbox" required />
                        <p>By continuing, I agree to the terms of use & privacy policy.</p>
                    </div>
                    {currState === "Login"
                        ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                        : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                    }
                </form>
            )}
        </div>
    );
};

export default LoginPopup;
