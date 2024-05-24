import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({ setShowLogin }) => {

    const [currState, setCurrState] = useState("Login");
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');


    const check = () =>{
        setMessage('');
    } 


    const handleSubmit = async (e) => {
        if(currState === "Sign Up"){
            e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5201/api/Account', {
            email: email,
            name: name,
            password: password
          });
          const responseData = response.data;
          setMessage(responseData.message);
        //   alert(message);
        } catch (error) {
          console.error('Error saving account:', error);
          setMessage('Lỗi khi lưu tài khoản');
        }
        }
      };
   
    const test = () => {
      console.log(message);
    }
    return (
        <div className='login-popup'>
            <form className="login-popup-container" onSubmit={(e) => handleSubmit(e)}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Your name' required />}

                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Your email' required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                </div>
                <button >{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                    <span onClick={test}>Click here</span>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
