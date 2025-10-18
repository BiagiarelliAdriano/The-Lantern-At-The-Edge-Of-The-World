import React, { useState } from "react";
import "./App.css";

const scenes = {
  start: {
    text: "You awaken beneath the stars. Behind you, the Tower rises into darkness. Ahead, a single lantern flickers at the edge of a dead forest.",
    choices: [
      { text: "Approach the light", next: "forestEdge" },
      { text: "Call out", next: "echoes" },
      { text: "Turn back", next: "lost" },
    ],
  },
  forestEdge: {
    text: "The lantern hangs just beyond a line of twisted trees. Roots curl from the ground like reaching hands.",
    choices: [
      { text: "Step between the trees", next: "pathCinders" },
      { text: "Circle around", next: "forgottenPath" },
      { text: "Touch one of the roots", next: "rootsMemory" },
    ],
  },
  echoes: {
    text: "Your voice returns, whispering your name wrong. The lantern flickers faintly in the dark.",
    choices: [
      { text: "Run to the trees", next: "pathCinders" },
      { text: "Answer the echoes", next: "lost" },
    ],
  },
  lost: {
    text: "The forest closes around you. The lantern fades until nothing remains but silence. You are lost.",
    choices: [{ text: "Restart", next: "start" }],
  },
};

function App() {
  const [current, setCurrent] = useState("start");

  const scene = scenes[current];

  return (
    <div className="game-container">
      <h1>The Lantern at the End of the World</h1>
      <p className="scene-text">{scene.text}</p>
      <div className="choices">
        {scene.choices.map((choice, index) => (
          <button key={index} onClick={() => setCurrent(choice.next)}>
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;