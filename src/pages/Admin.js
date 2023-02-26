import React, { useEffect, useState } from "react";
import "./Home.css";
import ReactGA from 'react-ga4';


const Admin = (props) => {

    const [uniqueVisitors, setUniqueVisitors] = useState(null);

    useEffect(() => {
        ReactGA.initialize(`${process.env.REACT_APP_GOOGLE_TRACKING_ID}`);
        ReactGA.send({ hitType: "pageview", page: window.location.pathname });


        ReactGA.ga('set', 'dimension1', 'uniqueVisitor');
        ReactGA.ga((tracker) => {
            const clientId = tracker.get('clientId');
            ReactGA.set({ clientId });
        });
    }, []);

    useEffect(() => {
        ReactGA.ga('send', 'pageview');
        ReactGA.ga((tracker) => {
            const visitorCount = tracker.get('metric1');
            setUniqueVisitors(visitorCount);
        });
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