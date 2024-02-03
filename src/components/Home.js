import React from "react";

export default function Home() {
  return (
    <div id="home-container">
      <div className="headshot-container">
        <img src="/headshot.jpeg" alt="Headshot" className="headshot" />
      </div>
      <div id="home-text-container">
        <p>
          Hi there! My name is{" "}
          <span style={{ color: "#87659e", fontWeight: "bold" }}>
            Erin McGinniss
          </span>
          .
        </p>
        <p>
          I am currently pursuing a B.A. in English with a concentration in
          Creative Writing at West Chester University. Alongside my passion for
          the written word, I am minoring in American Sign Language, driven by a
          desire to bridge communication gaps and foster inclusivity.
        </p>
        <p>
          I am a writer, artist, theater-maker and storyteller. I have a keen
          interest in marketing, finding intersections between my love for
          writing and the dynamic world of social media.
        </p>
        <p>
          On a warm, sunny day, you’ll find me by the beach, iced coffee and
          rom-com in hand.
        </p>
        <p>
          If you share a passion for the written word, a more inclusive world or
          the magic of marketing, let’s connect!
        </p>
      </div>
    </div>
  );
}
