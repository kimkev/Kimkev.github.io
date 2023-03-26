import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";

import Navigation from "./components/Navigation";
import BackButton from './components/BackButton';
import { trackPageview } from './components/Analytics';

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

const App = () => {

  const location = useLocation();

  useEffect(() => {
    trackPageview();
  }, [location]);

  return (
    <>
      <div className="main-container">
        <div className="content">
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
        </div>
        <Footer note="Footer" />
      </div>
    </>

  );
}

export default App;