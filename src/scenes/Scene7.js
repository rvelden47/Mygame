import { CinematicScene } from '../engine/CinematicScene.js';
import hackerUrl from '../assets/images/hacker.jpg';
import codeUrl from '../assets/images/code.jpg';

export class Scene7 extends CinematicScene {
  constructor(engine) {
    super(engine);
    // 2-minute scene
    this.duration = 120000;

    this.shots = [
        {
            time: 0,
            html: `
            <!-- Static scene with deep parallax and neon flicker -->
            <div class="parallax-animated-wrapper shot-pan-right">
                <div class="parallax-layer" data-depth="0.2" style="background-image: url('${hackerUrl}'); filter: contrast(1.3);"></div>
                <!-- Screens glow effect -->
                <div class="parallax-layer flicker" data-depth="0.4" style="background: radial-gradient(circle at 40% 50%, rgba(0, 243, 255, 0.3) 0%, transparent 40%); mix-blend-mode: screen;"></div>
            </div>
            `
        },
        {
            time: 45000,
            html: `
            <div class="parallax-animated-wrapper cinematic-zoom">
                <div class="parallax-layer side-scroll-fast" data-depth="0.5" style="background-image: url('${codeUrl}'); filter: hue-rotate(90deg) brightness(1.2);"></div>
            </div>
            `
        },
        {
            time: 95000,
            html: `
            <div class="parallax-animated-wrapper shot-pan-left">
                <div class="parallax-layer" data-depth="0.3" style="background-image: url('${hackerUrl}'); filter: contrast(1.5) brightness(0.8);"></div>
            </div>
            `
        }
    ];

    this.timeline = [
      { time: 1000, text: "Blink's den smells like burnt copper and stale synth-caf." },
      { time: 20000, text: "He takes the drive without a word and plugs it into his rig." },
      { time: 45000, text: "Screens light up. Lines of code reflecting in his augmented eyes." },
      { time: 70000, text: "'This is heavy-duty corp encryption,' he mutters." },
      { time: 95000, text: "'Coordinates. To a server farm in Sector 1. They're wiping data tonight.'" }
    ];

    this.choices = [
      {
        text: "Gear up and head to Sector 1",
        action: () => this.engine.loadScene('scene8')
      }
    ];
  }
}
