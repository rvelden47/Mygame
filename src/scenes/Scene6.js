import { CinematicScene } from '../engine/CinematicScene.js';
import crowdUrl from '../assets/images/crowd.jpg';
import marketUrl from '../assets/images/market.jpg';
import doorUrl from '../assets/images/rusty_door.jpg';

export class Scene6 extends CinematicScene {
  constructor(engine) {
    super(engine);
    // 3-minute scene
    this.duration = 180000;

    this.shots = [
        {
            time: 0,
            html: `
            <!-- Deep forward scroll simulating pushing through a crowd -->
            <div class="forward-scroll-layer" style="background-image: url('${crowdUrl}'); filter: saturate(1.5) contrast(1.2); animation-duration: 20s;"></div>
            <div class="forward-scroll-layer forward-delay-1" style="background-image: url('${crowdUrl}'); filter: saturate(1.5) contrast(1.2); animation-duration: 20s;"></div>
            <div class="forward-scroll-layer forward-delay-2" style="background-image: url('${crowdUrl}'); filter: saturate(1.5) contrast(1.2); animation-duration: 20s;"></div>
            <!-- Smoke / Steam overlay -->
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle, transparent 20%, rgba(10,20,15,0.9) 100%); pointer-events: none;"></div>
            `
        },
        {
            time: 55000,
            html: `
            <div class="parallax-animated-wrapper shot-pan-left">
                <div class="parallax-layer" data-depth="0.4" style="background-image: url('${marketUrl}'); filter: contrast(1.2) brightness(0.8);"></div>
            </div>
            `
        },
        {
            time: 125000,
            html: `
            <div class="parallax-animated-wrapper cinematic-zoom">
                <div class="parallax-layer" data-depth="0.6" style="background-image: url('${doorUrl}'); filter: sepia(0.3);"></div>
            </div>
            `
        }
    ];

    this.timeline = [
      { time: 1000, text: "The doors open. The noise is deafening." },
      { time: 25000, text: "A thousand people pressing through a market barely wide enough for two." },
      { time: 55000, text: "Pushing through the crowd. Faces blurred by steam and neon." },
      { time: 90000, text: "I need to find a terminal to decrypt this drive." },
      { time: 125000, text: "A contact named 'Blink' operates out of a den down here." },
      { time: 160000, text: "There. The rusty metal door with the crossed wires symbol." }
    ];

    this.choices = [
      {
        text: "Knock the code and enter the Den",
        action: () => this.engine.loadScene('scene7')
      }
    ];
  }
}
