import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactGA from 'react-ga4';
import { createBrowserHistory } from 'history';



try {
  setTimeout(_ => {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_TRACKING_ID)
    console.log('ga4 initialized');
  }, 1000);
} catch (err) {
      console.error(err);
}


const browserHistory = createBrowserHistory()
browserHistory.listen(location => {
  ReactGA.send({ hitType: "pageview", page: location.location.pathname });
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
