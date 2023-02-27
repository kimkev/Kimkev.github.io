import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';

import Navigation from "./components/Navigation";
import BackButton from './components/BackButton';

import './App.css';

import Home from "./pages/Home";
import Lists from './pages/Lists';
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Footer from './components/Footer';
import TicTacToe from './pages/TicTacToe';
import TypingGame from './pages/TypingGame';
import AnagramGame from './pages/AnagramGame';
import Admin from './pages/Admin';

import ReactGA from 'react-ga4';


ReactGA.initialize(process.env.REACT_APP_GOOGLE_TRACKING_ID);
const browserHistory = createBrowserHistory()
browserHistory.listen(location => {
  // ReactGA.set({ page: location.pathname });
  // ReactGA.send(location.pathname);
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  console.log(location.pathname)
});

const App = () => {

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="content">
          <BrowserRouter browserHistory={browserHistory}>
            <Navigation />
            <BackButton />
            <Routes>
              <Route index element={<Home />} />
              <Route exact path='/' element={<Home />} />
              <Route exact path='/app' element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="lists" element={<Lists />} />
              <Route path="contact" element={<Contact />} />
              <Route path="TicTacToe" element={<TicTacToe />} />
              <Route path="TypingGame" element={<TypingGame />} />
              <Route path="AnagramGame" element={<AnagramGame />} />
              <Route path="*" element={<NoPage />} />


              {/* should be hidden or password protected */}
              <Route path="admin" element={<Admin />} />
            </Routes>
          </BrowserRouter>
        </div>
        <Footer note="Footer" />
      </div>
    </>

  );
}

export default App;