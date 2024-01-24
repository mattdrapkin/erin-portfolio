// src/components/Header.js
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@mui/material";

const Header = () => {
  const styles = {
    headerStyle: {
      backgroundColor: "#5b446a", // Light purple background
      height: "11rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 8rem",
    },
    btn: {
      textTransform: "none",
      textDecoration: "none",
      margin: "0 30px",
      color: "white",
      fontSize: "24px",
      fontFamily: 'Georgia, Times New Roman, Times, serif'

    },
    btnUnderlined: {
      textTransform: "none",
      textDecoration: "underline",
      margin: "0 30px",
      color: "white",
      fontSize: "24px",
      fontFamily: 'Georgia, Times New Roman, Times, serif'
    },
  };

  return (
    <div className="header" style={styles.headerStyle}>
      <Link className="signature" to="/">
        <img src="/erin-sig.png" alt="signature" width={250} />
      </Link>
      <div className="neg-margin"></div>
      <div>
        <NavLink to="/">
          {({ isActive }) => (
            <Button
              style={isActive ? styles.btnUnderlined : styles.btn}
              href="/"
              variant="text"
            >
              home
            </Button>
          )}
        </NavLink>

        <NavLink to="/portfolio">
          {({ isActive }) => (
            <Button
              style={isActive ? styles.btnUnderlined : styles.btn}
              href="/portfolio"
              variant="text"
            >
              portfolio
            </Button>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
