import { CinematicScene } from '../engine/CinematicScene.js';

import bgUrl from '../assets/images/city_bg.png';
import fgUrl from '../assets/images/city_fg.png';
import alleyUrl from '../assets/images/alley.jpg';
import skylineUrl from '../assets/images/skyline.jpg';

export class Scene1 extends CinematicScene {
  constructor(engine) {
    super(engine);
    // 2-minute scene
    this.duration = 120000;

    // Breaking up the 2 minute scene into distinct camera shots
    this.shots = [
        {
            time: 0,
            html: `
            <div class="parallax-animated-wrapper shot-pan-right">
                <div class="parallax-layer" data-depth="0.2" style="background-image: url('${skylineUrl}'); opacity: 0.6; filter: blur(2px);"></div>
                <div class="parallax-layer" data-depth="0.6" style="background-image: url('${bgUrl}'); mix-blend-mode: screen;"></div>
            </div>
            `
        },
        {
            time: 40000,
            html: `
            <div class="parallax-animated-wrapper shot-pan-left">
                <div class="parallax-layer side-scroll-slow" data-depth="0.1" style="background-image: url('${bgUrl}'); opacity: 0.5;"></div>
                <div class="parallax-layer side-scroll-fast" data-depth="0.8" style="background-image: url('${fgUrl}'); mix-blend-mode: screen;"></div>
                <!-- Rainy overlay -->
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, rgba(0,0,10,0.8), rgba(0,20,40,0.6)); pointer-events: none;"></div>
            </div>
            `
        },
        {
            time: 80000,
            html: `
            <div class="parallax-animated-wrapper shot-pan-up">
                <div class="parallax-layer" data-depth="0.5" style="background-image: url('${alleyUrl}'); filter: brightness(0.6) contrast(1.2);"></div>
                <!-- Rainy overlay -->
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, rgba(0,0,10,0.8), rgba(0,20,40,0.6)); pointer-events: none;"></div>
            </div>
            `
        }
    ];

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
        action: () => {
          import('../assets/audio/cyberpunk-city.mp3').then(mod => {
            this.engine.audio.playMusic(mod.default);
          });
          this.engine.loadScene('scene2');
        }
      }
    ];
  }
}
