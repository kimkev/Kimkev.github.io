import React from "react";
import "./Header.css";

const Header = (props) => {
    return (
        <>
            <div className="header">
                <h1>{props.title}</h1>
                <p>{props.subtitle}</p>
            </div>
        </>
    )
};

export default Header;