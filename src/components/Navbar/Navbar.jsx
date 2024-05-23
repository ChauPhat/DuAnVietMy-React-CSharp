
import React, { useContext, useState } from 'react';
import { RiUserSmileFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { assets } from '../../assets/assets1';
import { StoreContext } from '../../context/StoreContext';
import './Navbar.css';
const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("menu");
    const { getTotalCartAmount, isLogged, setIsLogged } = useContext(StoreContext);
    const logOut = () => {
        Swal.fire({
            title: 'Are you sure you want to log out?',
            text: "You will need to log in again to access your account.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                setIsLogged(false);
                Swal.fire(
                    'Logged out!',
                    'You have been successfully logged out.',
                    'success'
                );
            }
        });
    }
    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
            <ul className="navbar-menu">
                <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {isLogged ? <button onClick={logOut} className='d-flex-baseline'><RiUserSmileFill /> Hi, Friend!</button> : <button onClick={() => setShowLogin(true)}>Sign in</button>}
            </div>
        </div>
    )
}
export default Navbar