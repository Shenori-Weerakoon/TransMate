import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PhrasebookHome.css"; // Custom CSS for background image and centering
import { Carousel } from "react-bootstrap"; // Bootstrap Carousel for slideshow
import NavBar from '../Home/Navbar';

function PhrasebookHome() {
  const navigate = useNavigate();

  // Assuming you are fetching user data from local storage or a global state
  const userEmail = localStorage.getItem("userEmail") || "Guest"; // Replace with actual data source

  const handleViewPhrases = () => {
    navigate("/phrasebook/");
  };

  const handleAddPhrase = () => {
    navigate("/phrasebook/add");
  };

  const handleLogout = () => {
    // Clear user data (or token) and redirect to login
    localStorage.clear(); // Clear localStorage or specific user data
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 2000); // Navigate to login after 2 seconds
  };

  return (
    <div>
      <nav className="navbar">
        <NavBar />
      </nav>
    <div className="container-fluid phrasebook-home">
      <div className="center-content">
        {/* Top-right user info and logout button */}
        <div className="top-right">
          <span className="me-3">
            Signed in as: <strong>{userEmail}</strong>
          </span>
          <button
            className="btn btn-danger btn-sm shadow-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Welcome message */}
        <h3 className="welcome-heading">Welcome to TransMate</h3>

        {/* Description */}
        <div className="my-4">
          <h4>Manage your phrases efficiently with TransMate</h4>
          <p className="text-muted">
            Easily add, view, and manage your custom phrasebook for quick access
            to translations.
          </p>
        </div>

        {/* Slideshow */}
        <div className="my-4">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block"
                src="https://cdn.aarp.net/content/dam/aarpe/en/home/home-family/personal-technology/info-2022/translation-apps/_jcr_content/root/container_main/container_body_main/container_body1/container_body_cf/container_image/articlecontentfragment/cfimage.coreimg.50.932.jpeg/content/dam/aarp/home-and-family/personal-technology/2022/03/1140-language-icons.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h5>Keep track of your favorite phrases</h5>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block"
                src="https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/TXBCIBXOPII6ZH4QPHPR7MUCSY.jpg"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h5>Easily add new phrases anytime</h5>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block"
                src="https://blog.commlabindia.com/hubfs/Imported_Blog_Media/translating-video-based-online-course-infographic.jpg"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h5>Access your translations on the go</h5>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>

        {/* Buttons in a straight line */}
        <div className="button-group">
          <button
            className="btn btn-primary btn-lg shadow-lg hover-scale"
            onClick={handleViewPhrases}
          >
            View Phrases
          </button>
          <button
            className="btn btn-primary btn-lg shadow-lg hover-scale"
            onClick={handleAddPhrase}
          >
            Add Phrase
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
    </div>
  );
}

export default PhrasebookHome;
