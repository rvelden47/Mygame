import { CinematicScene } from '../engine/CinematicScene.js';
import skylineUrl from '../assets/images/skyline.jpg';

export class Scene10 extends CinematicScene {
  constructor(engine) {
    super(engine);
    // 2.5-minute scene
    this.duration = 150000;
    this.timeline = [
      { time: 1000, text: "It's done." },
      { time: 30000, text: "I'm standing on the roof of the server facility, looking out over the city." },
      { time: 65000, text: "The rain is still falling. It never really stops." },
      { time: 100000, text: "The neon lights below flicker, indifferent to what just happened." },
      { time: 135000, text: "Just another night in the metropolis." }
    ];

    this.choices = [
      {
        text: "Restart from the beginning",
        action: () => {
          this.engine.state.reset();
          this.engine.loadScene('scene1');
        }
      }
    ];
  }

  getHTML() {
    return `
      <div class="parallax-layer side-scroll-slow" style="
        background-image: url('${skylineUrl}');
        filter: saturate(0.8) contrast(1.1);
      "></div>

      <!-- Rain effect overlay using CSS stripes -->
      <div style="
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background-image: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.1) 50%, rgba(255,255,255,0));
        background-size: 100% 20px;
        animation: vertical-scroll 0.5s linear infinite;
        pointer-events: none;
        opacity: 0.3;
      "></div>
    `;
  }
}
