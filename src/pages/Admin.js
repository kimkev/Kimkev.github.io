import React, { useEffect, useState } from "react";
import "./Home.css";
import ReactGA from 'react-ga4';


const Admin = (props) => {

    const [uniqueVisitors, setUniqueVisitors] = useState(0);

    useEffect(() => {
        ReactGA.initialize(process.env.REACT_APP_GOOGLE_TRACKING_ID);
        ReactGA.send({ hitType: "pageview", page: window.location.pathname });
        console.log(window.location.pathname);
        setUniqueVisitors(prevCount => prevCount + 1);
    }, []);


    return (
        <>
            <div className="home-container">
                <div className="col">
                    <h2>Analytics</h2>
                    <ul className="home-list col-A">
                        <li>
                            <p>Total unique visitors: {uniqueVisitors}</p>
                        </li>
                        <li>
                        </li>
                        <li>
                        </li>

                    </ul>
                </div>
                <div className="col">
                    <h2>Column 2</h2>
                    <ul className="home-list col-B">
                        <li>
                        </li>
                        <li>
                        </li>
                        <li>
                        </li>
                    </ul>
                </div>
                <div className="col">
                    <h2>Column 3</h2>
                    <ul className="home-list col-C">
                        <li>
                        </li>
                        <li>
                        </li>
                        <li>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
};

export default Admin;