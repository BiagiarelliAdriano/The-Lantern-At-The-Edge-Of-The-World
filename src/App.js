import React, { useState } from "react";
import Stars from "./Stars";
import "./App.css";

const scenes = {
  start: {
    text: "You awaken beneath a sky that does not move. The stars hang like cold nails hammered into darkness. Behind you, distant on the horizon, the Tower stands. An impossible spire that cuts the horizon in half. Its surface gleams faintly, as if it remembers you. Ahead, a single lantern flickers at the edge of a dead forest. The ground between you and it is littered with broken stone, like a forgotten road.",
    choices: [
      { text: "Approach the light", next: "forestEdge" },
      { text: "Call out", next: "echoes" },
      { text: "Turn back", next: "lost" },
    ],
  },
  forestEdge: {
    text: "The lantern sways from a crooked post beyond a wall of twisted trees. Their roots rise from the earth like frozen waves. The air smells faintly of iron. The flame's glow stops just short of your feet, as if daring you to cross.",
    choices: [
      { text: "Step between the trees", next: "pathCinders" },
      { text: "Circle around the forest", next: "forgottenPath" },
      { text: "Touch one of the roots", next: "rootsMemory" },
    ],
  },
  echoes: {
    text: "You call out. At first, nothing replies. Then a dozen voices answer at once; your name, repeated incorrectly, stretched and reversed until it barely sounds human. The lantern flickers as the forest shifts, its trees bending slightly toward you.",
    choices: [
      { text: "Run to the trees", next: "pathCinders" },
      { text: "Answer the echoes", next: "lost" },
    ],
  },
  pathCinders: {
    text: "You cross the threshold, and the world exhales. The air thickens. The trees close behind you like a door. Ash drifts through the dark like falling snow. The path ahead glows faintly red, pulsing beneath the soil. You can still see the lantern through the trunks, but every step forward seems to make it smaller, farther away.",
    choices: [
      { text: "Keep walking straight", next: "mazeAsh" },
      { text: "Turn right toward faint music", next: "mazeEchoes" },
      { text: "Turn left toward a flicker of motion", next: "mazeEyes" },
    ],
  },
  forgottenPath: {
    text: "You walk alongside the forest instead of entering. The moonlight reveals a row of ancient stones half-buried in the dirt. Strange symbols are carved into them. They pulse faintly, almost breathing. One of them hums softly as you pass, and you realize the sound isn't from the stone but from inside your chest.",
    choices: [
      { text: "Follow the symbols", next: "mazeEchoes" },
      { text: "Step into the forest anyway", next: "mazeAsh" },
    ],
  },
  rootsMemory: {
    text: "The moment your hand touches the root, warmth floods your arm. You see flashes. People walking this same path long ago, their faces erased by time. One stops and looks straight at you through the vision. Their voice echoes softly: 'The light remembers who reaches it.' Then everything fades, leaving only the faint glow ahead.",
    choices: [
      { text: "Enter the forest", next: "pathCinders" },
      { text: "Run away", next: "lost" },
    ],
  },
  mazeAsh: {
    text: "The ground is covered in black powder. Your own footprints lead both forward and backward. Something hums far way, a low vibration in your ribs. The trees here are scarred with handprints.",
    choices: [
      { text: "Follow the heavier prints", next: "mazeEchoes" },
      { text: "Follow the lighter ones", next: "mazeStillWater" },
    ],
  },
  mazeEchoes: {
    text: "A lullaby hums in the distance. It sounds like your own voice, younger, softer. Each step forward adds another harmony, until the sound feels alive and breathing around you.",
    choices: [
      { text: "Call out 'Who is there?'", next: "mazeEyes" },
      { text: "Stay silent and walk backwards", next: "mazeStillWater" },
    ],
  },
  mazeEyes: {
    text: "Eyes open in the bark. Dozens of them, each glowing faintly gold. They do not blink. They weep light, small streams of fire running down the trunks and into the dirt.",
    choices: [
      { text: "Touch one", next: "lost" },
      { text: "Look away and keep going", next: "mazeAsh" },
    ],
  },
  mazeStillWater: {
    text: "The forest opens to a clearing filled with shallow water. The surface reflects the stars perfectly, but when you look closer, the reflection is you, staring back from a different angle. The lantern's reflection trembles, though the air is utterly still.",
    choices: [
      { text: "Step into the water", next: "shrineLantern" },
      { text: "Turn back", next: "mazeAsh" },
    ],
  },
  shrineLantern: {
    text: "You step out of the water and onto dry stone. The forest ends abruptly behind you, its edge sliced clean like a wound. Before you stands a shrine of rusted metal, and from it hangs the lantern. Its flame is steady now. Bright, calm, alive. A faint hum fills the air, like a breath waiting to be exhaled.",
    choices: [
      { text: "Touch the lantern", next: "keeperRevealed" },
      { text: "Speak to it", next: "voiceFlame" },
      { text: "Blow it out", next: "hiddenEnding" },
    ],
  },
  keeperRevealed: {
    text: "You reach out and touch the lantern. Warmth rushes up your arm and into your chest. The flame blossoms outward, swirling until it forms a small figure, no taller than your knee, made of golden mist and wearing an ancient bronze mask. 'You found the true path', it says, voice like wind through hollow metal. 'Most only circle forever.' It holds out a fragment of the flame. 'Carry this. If you share its light, another road will open.' As you take it, dawn breaks across the world. The forest melts into sunlight, and the Tower shines like glass behind you. Ending 1/3 - 'The Keeper's Blessing'",
    choices: [{ text: "Play Again", next: "start" }],
  },
  voiceFlame: {
    text: "You whisper to the light. It flickers, then whispers back, your own voice, older, gentler. 'Thank you,' it says. 'I almost forgot how to listen.' You watch the flame brighten until it blinds you, and when the light fades, you see yourself walking away from the shrine from another direction, holding a lantern of your own. Ending 2/3 - 'The Remembered Self'",
    choices: [{ text: "Play Again", next: "start" }],
  },
  hiddenEnding: {
    text: "You blow out the lantern. Darkness swallows the shrine. Then clang! a metallic crash echoes behind you. A gruff voice shouts: 'Oi! That took me three hours to light!' An old man stumbles from behind the shrine, wearing a soot-stained apron and carrying an oil can. His beard is singed, and his expression is pure exasperation. 'Do you people think this forest maintains itself? Every century someone comes in, touches things, and suddenly I'm out here relighting the bloody lantern again!' He grumbles relights it with a spark, and hands you a smaller one. 'Here. If you're going to wander my woods, make yourself useful.' He pats your arm, mutters something about 'tourists', and shuffles back into the trees. Ending 3/3 - 'The Caretaker's Complaint'",
    choices: [{ text: "Play Again", next: "start" }],
  },
  lost: {
    text: "The forest folds in around you. The air becomes thick and heavy. Your steps echo without end. The lantern flickers once more. Then becomes a star, then ash, then nothing. When silence finally returns, you can't tell whether you're still walking or only remembering it. Bad Ending.",
    choices: [{ text: "Play Again", next: "start" }],
  }
};

function App() {
  const [current, setCurrent] = useState("start");

  const scene = scenes[current];

  return (
    <div className="game-container">
      <Stars count={150} />
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