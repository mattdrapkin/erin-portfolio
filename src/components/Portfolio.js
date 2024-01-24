import React from "react";
import LinkCard from "./LinkCard";
import { Grid } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import articlesData from "../articlesData.json";
import ModalCard from "./ModalCard";

export default function Portfolio() {
  return (
    <Grid sx={{ padding: "3rem" }} container spacing={2}>
      {articlesData.map((card) => (
        <Grid item key={uuidv4()} xs={12} sm={6} lg={4}>
          {card.link ? (
            <LinkCard
              title={card.title}
              imageUrl={card.imageUrl}
              link={card.link}
            />
          ) : (
            <ModalCard
            title={card.title}
            imageUrl={card.imageUrl}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
}
