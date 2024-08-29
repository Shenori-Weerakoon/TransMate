import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './Navbar';
import './home.css';


function Index() {
  const scrollToContent = () => {
    document.querySelector('.content').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App">
      <nav className="navbar">
        <NavBar />
      </nav>

      <div className="hero-section">
        <div className="overlay"></div>
        <div className="hero-content">
          <h2>Welcome to the Sinhala-English Translator</h2>
          <p>Translate effortlessly and explore an extensive dictionary with ease.</p>
          <button className="get-started-btn" onClick={scrollToContent} style={{width:'350px'}}>Get Started</button>
        </div>
      </div>

      <div className="content">
        <Link to="/translator" className="feature-box">
          <h3>Instant Translation</h3>
          <p>Translate Sinhala to English with lightning speed.</p>
        </Link>
        <Link to="/dictionary" className="feature-box">
          <h3>Comprehensive Dictionary</h3>
          <p>Explore thousands of English definitions at your fingertips.</p>
        </Link>
      </div>
    </div>
  );
}

export default Index;