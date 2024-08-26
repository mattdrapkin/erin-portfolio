import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import { Button } from "@mui/material";

export default function Footer() {
  const styles = {
    footer: {
      bottom: "0",
      left: "0",
      backgroundColor: "#5b446a",
      width: "100%",
      height: "5rem",
      display: "flex",
      justifyContent: "space-between",  // Distribute space between items
      alignItems: "center",
      padding: "0 2rem",  // Add padding to align content
    },
    icon: {
      margin: "0 1rem",
      fontSize: 30,
      color: "white",
    },
    btn: {
      textTransform: "none",
      textDecoration: "none",
      margin: "0 30px",
      color: "white",
      fontSize: "16px",
      fontFamily: 'Georgia, Times New Roman, Times, serif'

    },
    iconContainer: {
      display: "flex",
      alignItems: "center",
    }
  };

  const handleEmailClick = () => {
    const emailAddress = "eemcginni@gmail.com";
    window.location.href = `mailto:${emailAddress}`;
  };

  return (
    <div style={styles.footer}>
      {/* Sign In Button on the Left */}
      <Button href="/signin" variant="text" style={styles.btn}>
        sign in
      </Button>

      {/* Icons on the Right */}
      <div style={styles.iconContainer}>
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
      </div>
    </div>
  );
}
