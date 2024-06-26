
import axios from 'axios';
import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import './LoginPopup.css';
const LoginPopup = ({ setShowLogin }) => {
    const { isLogged, setIsLogged } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Login");
    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    if (isLogged) {
        return (<></>);
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        if (currState === "Sign Up") {
            try {
                const response = await axios.post('http://localhost:5201/api/Account', {
                    email: email,
                    name: name,
                    password: password
                });
                const responseData = response.data;
                let isSucceed = responseData.message === "Save account success";
                Swal.fire({
                    title: responseData.message,
                    icon: isSucceed ? 'success' : 'error'
                });
                
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
                Swal.fire({
                    text: 'An error occurs during api call',
                    icon: 'error'
                });
            }
        } else {
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
                let isSucceed = data.message !== "Invalid login credentials, try again!";
                setIsLogged(isSucceed);
                Swal.fire({
                    title: data.message,
                    icon: isSucceed ? 'success' : 'error'
                });
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
                Swal.fire({
                    text: 'An error occurs during api call',
                    icon: 'error'
                });
            }
        }
    };
    return (
        <div className='login-popup'>
            <form className="login-popup-container" onSubmit={handleLogin}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Your name' required />}

                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Your email' required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                </div>
                <button >{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    );
};
export default LoginPopup;
