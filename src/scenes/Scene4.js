import { CinematicScene } from '../engine/CinematicScene.js';
import chaseUrl from '../assets/images/chase_bg.jpg';

export class Scene4 extends CinematicScene {
  constructor(engine) {
    super(engine);
    // 2-minute scene
    this.duration = 120000;
    this.timeline = [
      { time: 1000, text: "The drive is in my pocket." },
      { time: 10000, text: "Sirens. Corp-sec is already here." },
      { time: 25000, text: "I bolt out the back door and hit the fire escape." },
      { time: 45000, text: "Running across the rooftops. The rain makes it slick." },
      { time: 70000, text: "Drones are spotlighting the alleyways behind me." },
      { time: 95000, text: "I need to get off the surface levels. To the elevators." }
    ];

    this.choices = [
      {
        text: "Dive into the Sector 7 Transit Shaft",
        action: () => this.engine.loadScene('scene5')
      }
    ];
  }

  getHTML() {
    return `
      <div class="parallax-layer side-scroll-fast" style="
        background-image: url('${chaseUrl}');
        filter: blur(2px) contrast(1.2);
        transform: scale(1.1);
      "></div>

      <!-- Strobe lights simulating sirens -->
      <div style="
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(255, 0, 0, 0.2);
        animation: neon-flicker 0.5s infinite alternate;
        pointer-events: none;
        mix-blend-mode: color-burn;
      "></div>
    `;
  }
}
