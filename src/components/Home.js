import React from "react";
import "./styles.css";

export default function Home() {
  return (
    <div id="home-container">
      <div className="headshot-container">
        <img src="/headshot.jpeg" alt="Headshot" className="headshot" />
      </div>
      <div id="home-text-container">
        <p>Hi! My name is Erin McGinniss.</p>
        <p>
          Currently pursuing a B.A. in English with concentration in Creative
          Writing with a minor in American Sign Language. On a mission to bridge
          communication gaps and create a more inclusive world, I have
          aspirations to secure an ASL certification post-graduation.
        </p>
        <p>
          My interests include writing, theater, social media, marketing and
          storytelling. If you share a passion for the written word, the magic
          of theater or a more inclusive world, let's connect.
        </p>
      </div>
    </div>
  );
}
