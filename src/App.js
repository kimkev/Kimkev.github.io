import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import './App.css';
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Footer from './components/Footer';
import TicTacToe from './pages/TicTacToe';
import TypingGame from './pages/TypingGame';

class App extends React.Component {
  render() {
    return (
      <>
        <div className="container">
          <div className="content">
            <BrowserRouter>
              <Navigation />
              <Routes>
                <Route index element={<Home />} />
                <Route exact path='/' element={<Home />} />
                <Route exact path='/app' element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="blogs" element={<Blogs />} />
                <Route path="contact" element={<Contact />} />
                <Route path="TicTacToe" element={<TicTacToe />} />
                <Route path="TypingGame" element={<TypingGame />} />
                <Route path="*" element={<NoPage />} />
              </Routes>
            </BrowserRouter>
          </div>
          <Footer note="Footer" />
        </div>
      </>

    );
  }
}

export default App;