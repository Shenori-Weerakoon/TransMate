import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faLanguage,
  faPlus,
  faList,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

function SideBar() {
  return (
    <nav
      id="sidebar"
      className="bg-dark text-light vh-100 shadow"
      style={{ width: "250px", display: "flex", flexDirection: "column" }}
    >
      <div
        className="sidebar-header text-center py-4"
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        <h3 style={{ color: "#87CEEB" }}>TRANSMATE</h3>
      </div>

      <ul className="list-unstyled components d-flex flex-column align-items-center flex-grow-1 justify-content-center">
        <li className="my-4">
          <Link to="/phrasebook/" className="text-light text-decoration-none">
            <FontAwesomeIcon icon={faList} className="me-3" />
            View Phrases
          </Link>
        </li>
        <li className="my-4">
          <Link to="/phrasebook/add" className="text-light text-decoration-none">
            <FontAwesomeIcon icon={faPlus} className="me-3" />
            Add Phrase
          </Link>
        </li>
        <li className="my-4">
          <Link to="/translationList" className="text-light text-decoration-none">
            <FontAwesomeIcon icon={faLanguage} className="me-3" />
            Translations
          </Link>
        </li>
        <li className="my-4">
          <Link to="/about/" className="text-light text-decoration-none">
            <FontAwesomeIcon icon={faInfoCircle} className="me-3" />
            About
          </Link>
        </li>
      </ul>

      <div
        className="sidebar-footer text-center py-3"
        style={{ fontFamily: "Roboto, sans-serif", color: "#87CEEB" }}
      >
        <small>2024 TRANSMATE</small>
      </div>
    </nav>
  );
}

export default SideBar;
