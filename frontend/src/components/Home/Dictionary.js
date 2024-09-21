import { React, useState } from "react";
import Axios from "axios";
import { Link } from 'react-router-dom';
import "./Dictionary.css";
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";
import NavBar from './Navbar';


function Dictionary() {
  const [data, setData] = useState("");
  const [searchWord, setSearchWord] = useState("");

  function getMeaning() {
    Axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`
    ).then((response) => {
      setData(response.data[0]);
    });
  }

  function playAudio() {
    let audio = new Audio(data.phonetics[0].audio);
    audio.play();
  }

  return (
    <div className="dictionary-container">
      <nav className="navbar">
      <NavBar />
        {/*<div className="navbar-brand">
          <h2>Sinhala to English Translator</h2>
        </div>
        <div className="navbar-links">
        <Link to="/">Home</Link>
          <Link to="/translator">Translator</Link>
          <Link to="/dictionary">Dictionary</Link>
          <Link to="/login" className="login-btn">Login</Link>
        </div>*/}
      </nav>
      <h1>English Dictionary</h1>
      
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for a word..."
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
        />
        <button onClick={getMeaning}>
          <FaSearch size="20px" />
        </button>
      </div>
      
      {data && (
        <div className="result-box">
          <h2>
            {data.word}
            {data.phonetics[0] && (
              <button onClick={playAudio} style={{width:'50px'}}>
                <FcSpeaker size="26px" />
              </button>
            )}
          </h2>
          
          <div className="word-details">
            <h4>Part of Speech:</h4>
            <p>{data.meanings[0].partOfSpeech}</p>

            <h4>Definition:</h4>
            <p>{data.meanings[0].definitions[0].definition}</p>

            {data.meanings[0].definitions[0].example && (
              <>
                <h4>Example:</h4>
                <p>{data.meanings[0].definitions[0].example}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dictionary;