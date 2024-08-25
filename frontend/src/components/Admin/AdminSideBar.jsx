import React, { useState, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import SinhalaDictionary from './SinhalaDictionary.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import AddToDictionary from './AddToDictionary.jsx';


const AdminSideBar = () => {
  const [activeContent, setActiveContent] = useState("Dashboard");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  const handleLinkClick = (content) => {
    setActiveContent(content);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  // Media query detection for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarStyles = {
    container: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row", // Stack on mobile
      height: "100vh",
    },
    sidebar: {
      width: isMobile ? "100%" : "280px", // Full width on mobile
      backgroundColor: "#2c3e50",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
    },
    link: {
      color: "#ecf0f1",
      fontSize: isMobile ? "18px" : "16px", // Larger text on mobile
      padding: "10px 20px",
      borderRadius: "8px",
      textDecoration: "none",
      marginBottom: "10px",
      display: "block",
      transition: "background 0.3s",
    },
    activeLink: {
      backgroundColor: "#3498db",
      color: "#fff",
    },
    logoutButton: {
      backgroundColor: "#e74c3c",
      color: "#fff",
      padding: "10px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background 0.3s",
    },
    logoutIcon: {
      marginRight: "8px",
    },
    content: {
      flexGrow: 1,
      padding: isMobile ? "10px" : "20px", // Adjust padding on mobile
      backgroundColor: "#ecf0f1",
      overflowY: "auto",
    },
  };

  return (
    <div style={sidebarStyles.container}>
      <div style={sidebarStyles.sidebar}>
        <div>
          <h2 style={{ color: "#ecf0f1", textAlign: "center" }}>Admin</h2>
          <hr style={{ borderColor: "#34495e" }} />
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <a
                href="#dashboard"
                style={
                  activeContent === "Dashboard"
                    ? { ...sidebarStyles.link, ...sidebarStyles.activeLink }
                    : sidebarStyles.link
                }
                onClick={() => handleLinkClick("Dashboard")}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#SinhalaDictionary"
                style={
                  activeContent === "SinhalaDictionary"
                    ? { ...sidebarStyles.link, ...sidebarStyles.activeLink }
                    : sidebarStyles.link
                }
                onClick={() => handleLinkClick("SinhalaDictionary")}
              >
                Sinhala Dictionary
              </a>
            </li>
            {/*<li>
              <a
                href="#AddToDictionary"
                style={
                  activeContent === "AddToDictionary"
                    ? { ...sidebarStyles.link, ...sidebarStyles.activeLink }
                    : sidebarStyles.link
                }
                onClick={() => handleLinkClick("AddToDictionary")}
              >
                Add To Dictionary
              </a>
            </li>*/}
          </ul>
        </div>
        <button style={sidebarStyles.logoutButton} onClick={handleLogout}>
          <FiLogOut style={sidebarStyles.logoutIcon} />
          Logout
        </button>
      </div>
      <div style={sidebarStyles.content}>
        {activeContent === "Dashboard" && <AdminDashboard />}
        {activeContent === "SinhalaDictionary" && <SinhalaDictionary />}
      </div>
    </div>
  );
};

export default AdminSideBar;