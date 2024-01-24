// src/components/LinkCard.js
import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Link } from "@mui/material";

const LinkCard = ({ title, imageUrl, link }) => {
  return (
    <Card variant="outlined" sx={{ maxWidth: 400, padding: 4 }}>
      <Link href={link} target="_blank" rel="noopener">
        <CardActionArea>
          <CardMedia component="img" image={imageUrl} alt="green iguana" />
          <hr/>
          <CardContent>
            <Typography
              color={"black"}
              gutterBottom
              variant="h5"
              component="div"
            >
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default LinkCard;
