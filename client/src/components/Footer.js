import React from 'react';
import "./css/Footer.css";
import logo from './logo2.png'

const Footer = () => {
    return(
        <div className="footer bg-dark text-left">
            <div>
                <img className="logo" src={logo}/>
                <p className="text">OnSurvey © 2019</p>
            </div>
        </div>
    )
};

export default Footer;
