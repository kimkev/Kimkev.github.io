import React, { useEffect, useState } from "react";
import "./Apps.css";
import ReactGA from 'react-ga4';
import { debounce } from "lodash";


const Admin = (props) => {

    const [uniqueVisitors, setUniqueVisitors] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const correctPassword = process.env.REACT_APP_ADMIN_PASSWORD



    // Debounced function to check password
    const checkPassword = debounce((enteredPassword) => {
        if (enteredPassword === correctPassword) {
            setIsAuthenticated(true);
        }
    }, 500); // Adjust the delay as needed (in milliseconds)

    const handlePasswordChange = (e) => {
        const enteredPassword = e.target.value;
        setPassword(enteredPassword);
        checkPassword(enteredPassword);
    };


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
            // const match = data.match(userCountRegex);
            // if (match) {
            //     return parseInt(match[0].replace(/"/g, ''));
            // }
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
            <div>
                {isAuthenticated ? (
                    <div className="container">
                        <div className="col">
                            <h2>WIP</h2>
                            <ul className="home-list col-A">
                                <li>
                                    <p>Count: {uniqueVisitors}</p>
                                </li>
                                <li>
                                </li>
                                <li>
                                </li>

                            </ul>
                        </div>

                    </div>
                ) : (
                    <div>
                        <h2>Enter Password to Access this Page</h2>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Enter Password"
                        />
                        {password && password !== correctPassword && (
                            <p style={{ color: "red" }}>Incorrect password.</p>
                        )}
                    </div>
                )}
            </div>
        </>
    )
};

export default Admin;