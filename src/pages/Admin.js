import React, { useEffect, useState } from "react";
import "./Application.css";
import ReactGA from 'react-ga4';


const Admin = (props) => {

    const [uniqueVisitors, setUniqueVisitors] = useState(0);

    const apiKey = process.env.REACT_APP_GOOGLE_MEASUREMENT_PROTOCOL_API_SECRET;
    const apiUrl = `https://analyticsdata.googleapis.com/v1beta/property/${process.env.REACT_APP_GOOGLE_TRACKING_ID}:runReport`;


    const fetchUserCount = async () => {

        const requestData = {
            reportRequests: [
                {
                    metrics: [
                        {
                            expression: 'sessions',
                        },
                    ],
                },
            ],
        };
        // Create headers for the request
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        });

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify(requestData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              const responseJson = response.json();

              console.log(responseJson);
            // Parse the response to get user count
            const userCountRegex = /"\d+"/;
            const match = data.match(userCountRegex);
            if (match) {
                return parseInt(match[0].replace(/"/g, ''));
            }
            return 0; // Default to 0 if no match found
        } catch (error) {
            console.error('Error fetching user count:', error);
            return 0; // Default to 0 in case of an error
        }
    }

    useEffect(() => {
        const getUserCount = async () => {
            const count = await fetchUserCount();
            console.log(count);
            setUniqueVisitors(count);
        }
        // getUserCount();
    }, []);


    return (
        <>
            <div className="container">
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

            </div>
        </>
    )
};

export default Admin;