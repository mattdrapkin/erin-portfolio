// src/components/Footer.js
import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import { Button } from "@mui/material";

export default function Footer() {
  const styles = {
    footer: {
      backgroundColor: "#5b446a",
      width: "100%",
      height: "5rem",
      display: "flex",
      justifyContent: "right",
      alignItems: "center",
    },
    icon: {
      margin: "0 1rem",
      fontSize: 30,
      color: "white",
    },
  };

  const handleEmailClick = () => {
    const emailAddress = "eemcginni@gmail.com";

    window.location.href = `mailto:${emailAddress}`;
  };

  return (
    <div style={styles.footer}>
      <Button
        href="https://www.linkedin.com/in/erin-mcginniss-54a78b201/"
        target="_blank"
        variant="ghost"
      >
        <LinkedInIcon style={styles.icon} />
      </Button>
      <Button
        href="https://www.instagram.com/eemcginni/?hl=en"
        target="_blank"
        variant="ghost"
      >
        <InstagramIcon style={styles.icon} />
      </Button>
      <Button onClick={handleEmailClick} target="_blank" variant="ghost">
        <EmailIcon style={styles.icon} />
      </Button>
      <div className="push-left"></div>
    </div>
  );
}
