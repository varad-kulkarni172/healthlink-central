import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForumUser = () => {
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   navigate("/login");
  // };

  // Hover state to track which section is being hovered
  const [hover, setHover] = useState(null);

  // Handle hover state
  const handleMouseEnter = (index) => setHover(index);
  const handleMouseLeave = () => setHover(null);

  return (
    <div style={styles.forumContainer}>
      <nav style={styles.navbar}>
        <h1>HealthLink Central</h1>
        {/*<button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>*/}
      </nav>

      <div style={styles.sectionWrapper}>
        {sections.map((section, index) => (
          <div
            key={index}
            style={{
              ...styles.section,
              ...(hover === index ? styles.sectionHover : {}), // Apply hover style conditionally
            }}
            onMouseEnter={() => handleMouseEnter(index)} // Set hover state on mouse enter
            onMouseLeave={handleMouseLeave} // Reset hover state on mouse leave
          >
            <img src={section.imgSrc} alt={section.alt} style={styles.slideIn} />
            <div style={styles.textContent}>
              <h2 style={styles.heading}>{section.title}</h2>
              <ul>
                {section.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const sections = [
  {
    imgSrc: "/images/vision.png",
    alt: "Vision",
    title: "VISION",
    details: ["Streamlining healthcare for a frictionless patient experience"],
  },
  {
    imgSrc: "/images/goals.png",
    alt: "Goals",
    title: "GOALS",
    details: [
      "Maintain centralized, digitally interoperable medical health records",
      "Ensure ease of access and use for a wide population",
      "Ensure strict privacy for medical records",
    ],
  },
  {
    imgSrc: "/images/objectives.png",
    alt: "Objectives",
    title: "OBJECTIVES",
    details: [
      "Implement a unique patient ID system linking all services",
      "Develop a secure, centralized system for medical records sharing",
      "User-friendly interface in regional languages",
      "Emergency access system for critical information",
    ],
  },
  {
    imgSrc: "/images/requirement.png",
    alt: "Must Requirements",
    title: "MUST",
    details: [
      "Unique patient ID linked to Aadhar Number",
      "Secure, centralized database with encryption (RSA, AES 256)",
      "Integration of old records for new users (CSV, PDF support)",
      "Multilingual and responsive design",
    ],
  },
];

const styles = {
  forumContainer: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f7f8fa',
    padding: '20px',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0052cc',
    padding: '15px 30px',
    color: 'white',
    fontSize: '1.5rem',
  },
  logoutBtn: {
    padding: '10px 20px',
    backgroundColor: '#ff4d4d',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  sectionWrapper: {
    marginTop: '30px',
  },
  section: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '40px',
    backgroundColor: 'white',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    animation: 'fadeIn 0.5s ease-in-out',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Add transition for smooth hover animation
  },
  sectionHover: {
    transform: 'scale(1.02)', // Scale up on hover
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
  },
  textContent: {
    flex: 1,
    paddingLeft: '20px',
  },
  heading: {
    color: '#0052cc',
    fontSize: '1.8rem',
  },
  slideIn: {
    width: '150px',
    height: '150px',
    borderRadius: '10px',
    animation: 'slideIn 1s ease-in-out',
  },
  '@keyframes slideIn': {
    '0%': {
      opacity: 0,
      transform: 'translateX(-50%)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateX(0)',
    },
  },
};

export default ForumUser;
