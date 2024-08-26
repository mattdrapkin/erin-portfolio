import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Call the Netlify function to authenticate the user
    fetch("/.netlify/functions/authUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Authentication successful") {
          console.log("Signed in successfully");
        } else {
          console.error("Sign in failed:", data.message);
        }
      })
      .catch((error) => console.error("Error signing in:", error));
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 15,
          marginBottom: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          style={{ fontFamily: "Georgia, Times New Roman, Times, serif" }}
        >
          sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="text" sx={{ mt: 3, mb: 2 }}>
            go
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
