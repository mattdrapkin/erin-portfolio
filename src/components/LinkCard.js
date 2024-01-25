// src/components/LinkCard.js
import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import Paper from "@mui/material/Paper";

const LinkCard = ({ title, link, color }) => {
  const paperStyle = {
    width: "12rem",
    height: "12rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "1rem",
    backgroundColor: color,
  };
  return (
    <Link href={link} underline="none" target="_blank" rel="noopener">
      <Paper elevation={4} sx={paperStyle}>
        <Typography
          variant="body1"
          style={{
            fontSize: "1.2rem",
            fontFamily: 'sans-serif',
            fontWeight: "bolder",
            textDecoration: "none",
            color: "black",
          }}
        >
          {title}
        </Typography>
      </Paper>{" "}
    </Link>
  );
};

export default LinkCard;
