import { CinematicScene } from '../engine/CinematicScene.js';
import doorUrl from '../assets/images/door.jpg';
import barUrl from '../assets/images/real_bar_interior.jpg';
import driveUrl from '../assets/images/data_drive.jpg';

export class Scene3 extends CinematicScene {
  constructor(engine) {
    super(engine);
    // 2-minute scene
    this.duration = 120000;

    this.shots = [
        {
            time: 0,
            html: `
            <!-- The Door (Rotates on Y axis to 'open') -->
            <div class="parallax-layer" data-depth="0.5" style="background-image: url('${doorUrl}'); z-index: 10;"></div>
            `
        },
        {
            time: 20000,
            html: `
            <!-- Interior background (revealed when door opens) -->
            <div class="parallax-layer cinematic-zoom" data-depth="0.1" style="background-image: url('${barUrl}');"></div>
            <!-- The Door (Rotates on Y axis to 'open') -->
            <div class="parallax-layer door-opening" data-depth="0.5" style="background-image: url('${doorUrl}'); z-index: 10; transform-origin: left;"></div>
            <!-- Lighting FX -->
            <div class="parallax-layer flicker" style="background: radial-gradient(circle at center, rgba(255,0,234,0.1) 0%, transparent 60%); z-index: 20;"></div>
            `
        },
        {
            time: 70000,
            html: `
            <div class="parallax-animated-wrapper shot-pan-left">
                <div class="parallax-layer" data-depth="0.4" style="background-image: url('${barUrl}'); filter: blur(3px) brightness(0.7);"></div>
                <div class="parallax-layer" data-depth="0.8" style="background-image: url('${driveUrl}'); filter: contrast(1.5);"></div>
            </div>
            `
        }
    ];

    this.timeline = [
      { time: 1000, text: "I made it to the door." },
      { time: 15000, text: "Taking a deep breath..." },
      { time: 20000, text: "I kick it open." }, // Trigger CSS door animation around here in narrative
      { time: 40000, text: "The bar goes dead silent. Everyone is looking at me." },
      { time: 70000, text: "My informant is sitting in the back booth. He looks terrified." },
      { time: 95000, text: "He slides a data-drive across the table. 'Take it. But corp-sec is already on their way.'" }
    ];

    this.choices = [
      {
        text: "Grab the drive and run to the back alley",
        action: () => this.engine.loadScene('scene4')
      }
    ];
  }
}
