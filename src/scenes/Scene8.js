import { CinematicScene } from '../engine/CinematicScene.js';
import corridorUrl from '../assets/images/corridor.jpg';
import cleanCorridorUrl from '../assets/images/corridor_clean.jpg';
import blastDoorUrl from '../assets/images/blast_door.jpg';

export class Scene8 extends CinematicScene {
  constructor(engine) {
    super(engine);
    // 3-minute scene
    this.duration = 180000;

    this.shots = [
        {
            time: 0,
            html: `
            <!-- First-person sneaking, slow forward scroll -->
            <div class="forward-scroll-layer" style="background-image: url('${corridorUrl}'); animation-duration: 25s; filter: grayscale(0.5) brightness(1.2);"></div>
            <div class="forward-scroll-layer forward-delay-1" style="background-image: url('${corridorUrl}'); animation-duration: 25s; filter: grayscale(0.5) brightness(1.2);"></div>
            <div class="forward-scroll-layer forward-delay-2" style="background-image: url('${corridorUrl}'); animation-duration: 25s; filter: grayscale(0.5) brightness(1.2);"></div>
            <!-- Visor HUD overlay -->
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; box-shadow: inset 0 0 50px rgba(0, 243, 255, 0.2); border: 2px solid rgba(0, 243, 255, 0.1); pointer-events: none;"></div>
            `
        },
        {
            time: 70000,
            html: `
            <div class="parallax-animated-wrapper shot-pan-right">
                <div class="parallax-layer" data-depth="0.2" style="background-image: url('${cleanCorridorUrl}'); filter: brightness(1.5) contrast(1.1);"></div>
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; box-shadow: inset 0 0 50px rgba(255, 0, 0, 0.1); pointer-events: none;"></div>
            </div>
            `
        },
        {
            time: 110000,
            html: `
            <div class="parallax-animated-wrapper shot-pan-up">
                <div class="parallax-layer" data-depth="0.4" style="background-image: url('${corridorUrl}'); filter: hue-rotate(180deg) brightness(0.8);"></div>
            </div>
            `
        },
        {
            time: 150000,
            html: `
            <div class="parallax-animated-wrapper cinematic-zoom">
                <div class="parallax-layer" data-depth="0.6" style="background-image: url('${blastDoorUrl}'); filter: contrast(1.3);"></div>
            </div>
            `
        }
    ];

    this.timeline = [
      { time: 1000, text: "Sector 1. Clean. Sterile. Lethal." },
      { time: 30000, text: "I bypassed the outer security grid, but the inner corridors are heavily patrolled." },
      { time: 70000, text: "Sneaking past the automated turrets. One wrong step and I'm ash." },
      { time: 110000, text: "The corridors are endless loops of white plastic and chrome." },
      { time: 150000, text: "I see the heavy blast doors to the Core Server room ahead." }
    ];

    this.choices = [
      {
        text: "Hack the blast doors",
        action: () => this.engine.loadScene('scene9')
      }
    ];
  }
}
