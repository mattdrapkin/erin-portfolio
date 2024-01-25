// src/components/LinkCard.js
import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import Paper from "@mui/material/Paper";

const LinkCard = ({ title, link, color }) => {
  return (
    <Link href={link} underline="none" target="_blank" rel="noopener">
      <Paper
        elevation={8}
        sx={{ backgroundColor: color }}
        className="article-paper"
      >
        <Typography
          variant="body1"
          style={{
            fontSize: "1.2rem",
            fontFamily: 'Georgia, "Times New Roman", Times, serif',
            textDecoration: "none",
            color: "black",
          }}
        >
          {title}
        </Typography>
      </Paper>
    </Link>
  );
};

export default LinkCard;
