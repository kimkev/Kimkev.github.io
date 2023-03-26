import ReactGA from 'react-ga4';

export const initGA = (measurementId) => {
    ReactGA.initialize(measurementId);
};

export const trackPageview = () => {
    ReactGA.send('pageview');
};