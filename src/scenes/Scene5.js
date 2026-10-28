import { RacerScene } from '../engine/RacerScene.js';

export class Scene5 extends RacerScene {
  constructor(engine) {
    super(engine);
    // 2-minute scene
    this.duration = 120000;

    // We override shots since this is a programmatic racer scene,
    // but we can still show HTML layers behind the canvas if we wanted.
    this.shots = [];

    this.timeline = [
      { time: 1000, text: "I hit the manual override on the glass elevator." },
      { time: 15000, text: "The descent starts. Fast." },
      { time: 35000, text: "Looking up, the drones lose my heat signature in the smog." },
      { time: 60000, text: "Down into the Undercity. The real grime of the metropolis." },
      { time: 85000, text: "Levels 100 through 50 flash by." },
      { time: 105000, text: "Level 14. The Slums. The elevator screeches to a halt." }
    ];

    this.choices = [
      {
        text: "Step out into the Undercity",
        action: () => this.engine.loadScene('scene6')
      }
    ];
  }
}
