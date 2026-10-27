import { CinematicScene } from '../engine/CinematicScene.js';
import chaseUrl from '../assets/images/chase_bg.jpg';
import rooftopUrl from '../assets/images/rooftop.jpg';
import droneUrl from '../assets/images/drone_light.jpg';

export class Scene4 extends CinematicScene {
  constructor(engine) {
    super(engine);
    // 2-minute scene
    this.duration = 120000;

    this.shots = [
        {
            time: 0,
            html: `
            <div class="parallax-animated-wrapper shot-pan-up">
                <div class="parallax-layer" data-depth="0.3" style="background-image: url('${chaseUrl}'); filter: blur(1px);"></div>
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255, 0, 0, 0.1); animation: neon-flicker 1s infinite alternate; pointer-events: none;"></div>
            </div>
            `
        },
        {
            time: 45000,
            html: `
            <div class="parallax-animated-wrapper shot-pan-right">
                <div class="parallax-layer side-scroll-fast" data-depth="0.6" style="background-image: url('${rooftopUrl}');"></div>
            </div>
            `
        },
        {
            time: 70000,
            html: `
            <div class="parallax-animated-wrapper cinematic-zoom">
                <div class="parallax-layer" data-depth="0.4" style="background-image: url('${droneUrl}'); filter: contrast(1.5);"></div>
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; box-shadow: inset 0 0 100px rgba(0,0,255,0.3); pointer-events: none;"></div>
            </div>
            `
        }
    ];

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
}
