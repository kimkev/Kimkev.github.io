import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";

import Navigation from "./components/Navigation";
import BackButton from './components/BackButton';
import { trackPageview } from './components/Analytics';

import './App.css';

import Home from "./pages/Home";
import Application from './pages/Application';
import Footer from './components/Footer';
import ListApp from './pages/Lists/ListApp';
import NoPage from "./pages/NoPage";
import TicTacToe from './pages/Games/TicTacToe';
import TypingGame from './pages/Games/TypingGame';
import AnagramGame from './pages/Games/AnagramGame';
import Admin from './pages/Admin';


const App = () => {

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    trackPageview();
  }, [location]);

  return (
    <>
      <div className="main-container">
        <div className="content">
          <Navigation />
          {/* <BackButton /> */}
          <Routes>
            <Route index element={<Home />} />
            <Route exact path='/' element={<Home />} />
            <Route path='application' element={<Application />} /> 
            <Route path="home" element={<Home />} />
            <Route path="ListApp" element={<ListApp />} />
            <Route path="TicTacToe" element={<TicTacToe />} />
            <Route path="TypingGame" element={<TypingGame />} />
            <Route path="AnagramGame" element={<AnagramGame />} />
            <Route path="*" element={<NoPage />} />


            {/* should be hidden or password protected */}
            <Route path="admin" element={<Admin />} />
          </Routes>
        </div>
        <Footer isHomePage={isHomePage} />
      </div>
    </>

  );
}

export default App;