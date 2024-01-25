import React from "react";
import LinkCard from "./LinkCard";
import { Grid } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import articles from "../articlesData.json";
import { Link } from "@mui/material";

export default function Portfolio() {
  const quadPurple = "#CBC3E3";
  const countyLinesPurple = "#D8BFD8";
  return (
    <div className="portfolio-wrapper">
      <div className="ghost-desktop"></div>

      <div className="articles-wrapper">
        {/* Quad Articles */}
        <Link
          className="img-flex-wrapper"
          href="https://wcuquad.com/"
          target="_blank"
          rel="noopener"
        >
          <img
            src="/quad-logo.png"
            alt="Quad Logo"
            style={{ width: "60%" }}
          />
        </Link>
        <Grid container spacing={2}>
          {articles.quadArticles.map((article) => (
            <Grid item key={uuidv4()} sm={4} lg={4}>
              <LinkCard
                title={article.title}
                link={article.link}
                color={quadPurple}
              />
            </Grid>
          ))}
        </Grid>

        {/* County Lines Articles */}
        <Link
          className="img-flex-wrapper"
          href="https://wcuquad.com/"
          target="_blank"
          rel="noopener"
        >
          <img
            src="/cl-logo.png"
            alt="County Lines Logo"
            style={{ width: "70%" }}
          />
        </Link>
        <Grid container spacing={2}>
          {articles.countyLinesArticles.map((article) => (
            <Grid item key={uuidv4()} lg={4}>
              <LinkCard
                title={article.title}
                link={article.link}
                color={countyLinesPurple}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className="ghost-desktop"></div>
    </div>
  );
}
