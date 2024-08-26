import React, { useEffect, useState } from "react";
import LinkCard from "./LinkCard";
import { Grid, CircularProgress, Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Link } from "@mui/material";
import ModalCard from "./ModalCard";

export default function Portfolio() {
  const quadPurple = "#CBC3E3";
  const countyLinesPurple = "#D8BFD8";
  const poemPurple = "#f0e1f0";

  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/.netlify/functions/fetchData")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setArticles(data[0]);
        setLoading(false); // Data is fetched, stop loading
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Stop loading even if there is an error
      });
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {/* DESKTOP ONLY */}
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
            {articles &&
              articles.quadArticles.map((article) => (
                <Grid item key={uuidv4()} sm={4}>
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
            href="https://countylinesmagazine.com/"
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
            {articles &&
              articles.countyLinesArticles.map((article) => (
                <Grid item key={uuidv4()} sm={4}>
                  <LinkCard
                    title={article.title}
                    link={article.link}
                    color={countyLinesPurple}
                  />
                </Grid>
              ))}
          </Grid>

          {/* Literary Magazine Poems */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              placeItems: "center",
              justifyContent: "space-around",
            }}
          >
            <img
              src="/wcu-logo.png"
              alt="West Chester University Logo"
              style={{ width: "80%" }}
            />
            <h2 style={{ textAlign: "center", margin: "-0.3rem" }}>
              Daedalus Literary Magazine
            </h2>
          </div>
          <Grid container spacing={2}>
            {articles &&
              articles.litMagPoems.map((poem, idx) => (
                <Grid item key={uuidv4()} sm={4}>
                  <ModalCard
                    title={poem.title}
                    content={poem.content}
                    color={poemPurple}
                    idx={idx}
                  />
                </Grid>
              ))}
          </Grid>
        </div>
        <div className="ghost-desktop"></div>
      </div>

      {/* MOBILE ONLY */}
      <div className="portfolio-wrapper-mobile">
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
            style={{ width: "60%", marginTop: "2rem" }}
          />
        </Link>
        {articles &&
          articles.quadArticles.map((article) => (
            <LinkCard
              key={uuidv4()}
              title={article.title}
              link={article.link}
              color={quadPurple}
            />
          ))}

        {/* County Lines Articles */}
        <Link
          className="img-flex-wrapper"
          href="https://countylinesmagazine.com/"
          target="_blank"
          rel="noopener"
        >
          <img
            src="/cl-logo.png"
            alt="County Lines Logo"
            style={{ width: "70%", marginTop: "2rem" }}
          />
        </Link>
        {articles &&
          articles.countyLinesArticles.map((article) => (
            <LinkCard
              key={uuidv4()}
              title={article.title}
              link={article.link}
              color={countyLinesPurple}
            />
          ))}

        {/* Literary Magazine Poems */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            placeItems: "center",
            justifyContent: "space-around",
          }}
        >
          <img
            src="/wcu-logo.png"
            alt="West Chester University Logo"
            style={{ width: "80%" }}
          />
          <h2 style={{ textAlign: "center", margin: "-0.3rem" }}>
            Daedalus Literary Magazine
          </h2>
        </div>
        <p>Please flip to horizontal view to see this section.</p>
      </div>
    </>
  );
}
