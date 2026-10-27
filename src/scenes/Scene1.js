import { CinematicScene } from '../engine/CinematicScene.js';

import bgUrl from '../assets/images/city_bg.png';
import fgUrl from '../assets/images/city_fg.png';

export class Scene1 extends CinematicScene {
  constructor(engine) {
    super(engine);
    // 2-minute scene
    this.duration = 120000;
    this.timeline = [
      { time: 1000, text: "The rain hasn't stopped for three weeks. The acid eats through the paint on my hover-car." },
      { time: 20000, text: "I'm flying through Sector 4. The neon bleeds into the puddles like crushed glass." },
      { time: 40000, text: "They said the informant would be at the Noodle Bar down in the underlevels." },
      { time: 60000, text: "If he's still alive. Corp-sec has been scrubbing these sectors hard lately." },
      { time: 80000, text: "My fuel light is blinking. I need to set down soon." },
      { time: 100000, text: "There it is. The drop-off point. Time to see if the rat has the cheese." }
    ];

    this.choices = [
      {
        text: "Land the car and proceed on foot",
        action: () => { this.engine.audio.playMusic('/src/assets/audio/cyberpunk-city.ogg'); this.engine.loadScene('scene2'); }
      }
    ];
  }

  getHTML() {
    return `
      <!-- Deep background layer moving slowly -->
      <div class="parallax-layer side-scroll-slow" style="
        background-image: url('${bgUrl}');
        opacity: 0.5;
      "></div>

      <!-- Foreground layer moving faster (parallax) -->
      <div class="parallax-layer side-scroll-fast" style="
        background-image: url('${fgUrl}');
        mix-blend-mode: screen;
      "></div>

      <!-- Color overlay to set mood -->
      <div style="
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background: linear-gradient(to bottom, rgba(0,0,10,0.8), rgba(0,20,40,0.6));
        pointer-events: none;
      "></div>
    `;
  }
}
