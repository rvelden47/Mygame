import { CinematicScene } from '../engine/CinematicScene.js';
import alleyUrl from '../assets/images/alley.jpg';
import noodleExtUrl from '../assets/images/noodle_bar_ext.jpg';
import thugsUrl from '../assets/images/thugs.jpg';

export class Scene2 extends CinematicScene {
  constructor(engine) {
    super(engine);
    // 1.5-minute scene
    this.duration = 90000;

    this.shots = [
        {
            time: 0,
            html: `
            <!-- Simulating forward walking through an alley using staggered forward-scroll -->
            <div class="forward-scroll-layer" style="background-image: url('${alleyUrl}');"></div>
            <div class="forward-scroll-layer forward-delay-1" style="background-image: url('${alleyUrl}');"></div>
            <div class="forward-scroll-layer forward-delay-2" style="background-image: url('${alleyUrl}');"></div>
            <!-- Vignette for deep alley feel -->
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; box-shadow: inset 0 0 150px rgba(0,0,0,1); pointer-events: none;"></div>
            `
        },
        {
            time: 45000,
            html: `
            <div class="parallax-animated-wrapper shot-pan-left">
                <div class="parallax-layer" data-depth="0.3" style="background-image: url('${noodleExtUrl}'); filter: saturate(1.5);"></div>
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; box-shadow: inset 0 0 150px rgba(0,0,0,0.8); pointer-events: none;"></div>
            </div>
            `
        },
        {
            time: 70000,
            html: `
            <div class="parallax-animated-wrapper cinematic-zoom">
                <div class="parallax-layer" data-depth="0.6" style="background-image: url('${thugsUrl}'); filter: contrast(1.2) sepia(0.3);"></div>
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; box-shadow: inset 0 0 150px rgba(0,0,0,1); pointer-events: none;"></div>
            </div>
            `
        }
    ];

    this.timeline = [
      { time: 1000, text: "The hover-car is hidden. I'm on foot now." },
      { time: 20000, text: "Walking down the alleyway towards the Noodle Bar. The stench of synthetic pork and ozone is thick." },
      { time: 45000, text: "I can see the neon sign flickering ahead. 'Lucky Dragon'." },
      { time: 70000, text: "Two thugs are standing by the side entrance. They look like they're waiting for someone." }
    ];

    this.choices = [
      {
        text: "Sneak past them to the back door",
        action: () => this.engine.loadScene('scene3')
      },
      {
        text: "Kick the front door open, guns drawn",
        action: () => this.engine.loadScene('scene3')
      }
    ];
  }
}
