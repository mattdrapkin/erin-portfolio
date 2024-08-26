import React, { useEffect, useState } from "react";
import {
  Grid,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import LinkCard from "./LinkCard";
import { v4 as uuidv4 } from "uuid";
import { Link } from "@mui/material";
import ModalCard from "./ModalCard";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export default function ManagePortfolio() {
  const quadPurple = "#CBC3E3";
  const countyLinesPurple = "#D8BFD8";
  const poemPurple = "#f0e1f0";

  const [articles, setArticles] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newLink, setNewLink] = useState("");
  const [newContent, setNewContent] = useState(""); // For poems content

  useEffect(() => {
    fetch("/.netlify/functions/fetchData")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setArticles(data[0]))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleClickOpenDelete = (category, index) => {
    setSelectedCategory(category);
    setSelectedIndex(index);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = () => {
    const updatedArticles = { ...articles };
    updatedArticles[selectedCategory].splice(selectedIndex, 1);

    setArticles(updatedArticles);

    // Send DELETE request to Netlify function
    fetch("/.netlify/functions/deleteArticle", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: selectedCategory,
        index: selectedIndex,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Delete success:", data))
      .catch((error) => console.error("Error deleting article:", error));

    handleCloseDelete();
  };

  const handleClickOpenAdd = (category) => {
    setSelectedCategory(category);
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setNewTitle("");
    setNewLink("");
    setNewContent(""); // Reset content
  };

  const transformTextToHtml = (title, text) => {
    const paragraphs = text
      .split("\n\n")
      .map((para) => para.split("\n").join("<br>"));
    const formattedBody = paragraphs.map((para) => `<p>${para}</p>`).join("");

    return `<p><strong>${title}</strong></p>${formattedBody}`;
  };

  const handleAdd = () => {
    let newArticle;
    if (selectedCategory === "litMagPoems") {
      const transformedContent = transformTextToHtml(newTitle, newContent);
      newArticle = { title: newTitle, content: transformedContent };
    } else {
      newArticle = { title: newTitle, link: newLink };
    }

    const updatedArticles = { ...articles };
    updatedArticles[selectedCategory].push(newArticle);

    setArticles(updatedArticles);

    // Send POST request to Netlify function
    fetch("/.netlify/functions/addArticle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category: selectedCategory, article: newArticle }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Add success:", data))
      .catch((error) => console.error("Error adding article:", error));

    handleCloseAdd();
  };

  return (
    <>
      {/* Deletion Confirmation Dialog */}
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this article? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Article or Poem Dialog */}
      <Dialog
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Add New {selectedCategory === "litMagPoems" ? "Poem" : "Article"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new{" "}
            {selectedCategory === "litMagPoems" ? "poem" : "article"}, please
            enter the title and{" "}
            {selectedCategory === "litMagPoems" ? "content" : "link"} here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          {selectedCategory === "litMagPoems" ? (
            <TextareaAutosize
              aria-label="Poem Content"
              minRows={10}
              placeholder="Enter the poem content"
              style={{ width: "100%", marginTop: "1rem" }}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
          ) : (
            <TextField
              margin="dense"
              id="link"
              label="Link"
              type="url"
              fullWidth
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

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
              articles.quadArticles.map((article, index) => (
                <Grid
                  item
                  key={uuidv4()}
                  sm={4}
                  style={{ position: "relative" }}
                >
                  <LinkCard
                    title={article.title}
                    link={article.link}
                    color={quadPurple}
                  />
                  <IconButton
                    size="small"
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      color: "#5b446a",
                    }}
                    onClick={() => handleClickOpenDelete("quadArticles", index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              ))}
          </Grid>
          <Button
            startIcon={<AddIcon />}
            onClick={() => handleClickOpenAdd("quadArticles")}
          >
            Add Quad Article
          </Button>

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
              articles.countyLinesArticles.map((article, index) => (
                <Grid
                  item
                  key={uuidv4()}
                  sm={4}
                  style={{ position: "relative" }}
                >
                  <LinkCard
                    title={article.title}
                    link={article.link}
                    color={countyLinesPurple}
                  />
                  <IconButton
                    size="small"
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      color: "#5b446a",
                    }}
                    onClick={() =>
                      handleClickOpenDelete("countyLinesArticles", index)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              ))}
          </Grid>
          <Button
            startIcon={<AddIcon />}
            onClick={() => handleClickOpenAdd("countyLinesArticles")}
          >
            Add County Lines Article
          </Button>

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
              articles.litMagPoems.map((poem, index) => (
                <Grid
                  item
                  key={uuidv4()}
                  sm={4}
                  style={{ position: "relative" }}
                >
                  <ModalCard
                    title={poem.title}
                    content={poem.content}
                    color={poemPurple}
                    idx={index}
                  />
                  <IconButton
                    size="small"
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      color: "#5b446a",
                    }}
                    onClick={() => handleClickOpenDelete("litMagPoems", index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              ))}
          </Grid>
          <Button
            startIcon={<AddIcon />}
            onClick={() => handleClickOpenAdd("litMagPoems")}
          >
            Add Literary Magazine Poem
          </Button>
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
          articles.quadArticles.map((article, index) => (
            <div key={uuidv4()} style={{ position: "relative" }}>
              <LinkCard
                title={article.title}
                link={article.link}
                color={quadPurple}
              />
              <IconButton
                size="small"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  color: "#5b446a",
                }}
                onClick={() => handleClickOpenDelete("quadArticles", index)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
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
          articles.countyLinesArticles.map((article, index) => (
            <div key={uuidv4()} style={{ position: "relative" }}>
              <LinkCard
                title={article.title}
                link={article.link}
                color={countyLinesPurple}
              />
              <IconButton
                size="small"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  color: "#5b446a",
                }}
                onClick={() =>
                  handleClickOpenDelete("countyLinesArticles", index)
                }
              >
                <DeleteIcon />
              </IconButton>
            </div>
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
        {articles &&
          articles.litMagPoems.map((poem, index) => (
            <div key={uuidv4()} style={{ position: "relative" }}>
              <ModalCard
                title={poem.title}
                content={poem.content}
                color={poemPurple}
                idx={index}
              />
              <IconButton
                size="small"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  color: "#5b446a",
                }}
                onClick={() => handleClickOpenDelete("litMagPoems", index)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
      </div>
    </>
  );
}
