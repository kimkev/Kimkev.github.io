import React from "react";
import "./Footer.css";

const Footer = (props) => {
    return (
        <>
            <div className="footer">
                <h1>{props.note}</h1>
            </div>
            {/* <div>
                <a href="#default" className="logo">CompanyLogo</a>
                <div className="header-right">
                    <a className="/active" href="#home">Home</a>
                    <a href="/contact">Contact</a>
                    <a href="/about">About</a>
                </div>
            </div> */}
        </>
    )
};

export default Footer;