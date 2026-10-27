import { CinematicScene } from '../engine/CinematicScene.js';
import elevatorUrl from '../assets/images/elevator_shaft.jpg';
import smogUrl from '../assets/images/smog.jpg';

export class Scene5 extends CinematicScene {
  constructor(engine) {
    super(engine);
    // 2-minute scene
    this.duration = 120000;

    this.shots = [
        {
            time: 0,
            html: `
            <!-- Simulating vertical drop down a shaft -->
            <div class="parallax-animated-wrapper">
                <div class="parallax-layer vertical-scroll-fast" data-depth="0.2" style="background-image: url('${elevatorUrl}'); filter: sepia(0.5) hue-rotate(180deg);"></div>
                <!-- Elevator cage overlay -->
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0,0,0,0.8) 50px, rgba(0,0,0,0.8) 55px); pointer-events: none; z-index: 50;"></div>
            </div>
            `
        },
        {
            time: 35000,
            html: `
            <div class="parallax-animated-wrapper shot-pan-up">
                <div class="parallax-layer vertical-scroll-slow" data-depth="0.5" style="background-image: url('${smogUrl}'); opacity: 0.8; filter: hue-rotate(90deg);"></div>
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0,0,0,0.8) 50px, rgba(0,0,0,0.8) 55px); pointer-events: none; z-index: 50;"></div>
            </div>
            `
        },
        {
            time: 85000,
            html: `
            <div class="parallax-animated-wrapper">
                <div class="parallax-layer vertical-scroll-fast" data-depth="0.8" style="background-image: url('${elevatorUrl}'); filter: brightness(0.4) contrast(1.5);"></div>
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0,0,0,0.8) 50px, rgba(0,0,0,0.8) 55px); pointer-events: none; z-index: 50;"></div>
            </div>
            `
        }
    ];

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
