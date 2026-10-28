import { CinematicScene } from '../engine/CinematicScene.js';

import bgUrl from '../assets/images/city_bg.png';
import alleyUrl from '../assets/images/alley.jpg';
import doorUrl from '../assets/images/door.jpg';

export class Scene1 extends CinematicScene {
  constructor(engine) {
    super(engine);
    // 2-minute scene
    this.duration = 120000;

    // We replace shots with a single 3D scene that we update programmatically
    this.shots = [];

    this.timeline = [
      { time: 1000, text: "The rain hasn't stopped for three weeks. The acid eats through the paint." },
      { time: 20000, text: "Walking down Sector 4. The neon bleeds into the puddles like crushed glass." },
      { time: 40000, text: "They said the informant would be at the Noodle Bar down in the underlevels." },
      { time: 60000, text: "If he's still alive. Corp-sec has been scrubbing these sectors hard lately." },
      { time: 80000, text: "Turning into the alley." },
      { time: 100000, text: "There it is. The door to the drop-off point. Time to see if the rat has the cheese." }
    ];

    this.choices = [
      {
        text: "Open the door and proceed",
        action: () => {
          import('../assets/audio/cyberpunk-city.mp3').then(mod => {
            this.engine.audio.playMusic(mod.default);
          });
          this.engine.loadScene('scene2');
        }
      }
    ];

    this.walkZ = 0;
  }

  getHTML() {
    return `
    <div class="scene-3d-container">
        <!-- The 'camera' moves by translating the world in the opposite direction (positive Z) -->
        <div class="scene-3d-world" id="world-3d">

            <!-- Wide Street Section (Z: 0 to -2000) -->
            <div class="plane-3d wall-left" style="background-image: url('${bgUrl}'); opacity: 0.8; filter: sepia(0.5); transform: translate3d(-1000px, -500px, -1000px) rotateY(90deg) scaleX(2);"></div>
            <div class="plane-3d wall-right" style="background-image: url('${bgUrl}'); opacity: 0.8; filter: sepia(0.5); transform: translate3d(1000px, -500px, -1000px) rotateY(-90deg) scaleX(2);"></div>

            <div class="plane-3d floor-3d" style="transform: translate3d(-1000px, 500px, -1000px) rotateX(90deg) scaleY(2);"></div>
            <div class="plane-3d ceiling-3d" style="transform: translate3d(-1000px, -500px, -1000px) rotateX(-90deg) scaleY(2); background-color: #050510;"></div>

            <!-- Narrow Alley Section (Z: -2000 to -4000) -->
            <!-- We angle walls slightly to 'funnel' the player in -->
            <div class="plane-3d wall-left" style="background-image: url('${alleyUrl}'); filter: brightness(0.7); transform: translate3d(-600px, -500px, -3000px) rotateY(80deg) scaleX(2);"></div>
            <div class="plane-3d wall-right" style="background-image: url('${alleyUrl}'); filter: brightness(0.7); transform: translate3d(600px, -500px, -3000px) rotateY(-80deg) scaleX(2);"></div>

            <div class="plane-3d floor-3d" style="transform: translate3d(-1000px, 500px, -3000px) rotateX(90deg) scaleY(2);"></div>
            <div class="plane-3d ceiling-3d" style="transform: translate3d(-1000px, -500px, -3000px) rotateX(-90deg) scaleY(2); background-color: #020205;"></div>

            <!-- The End Door (Z: -4000) -->
            <div class="plane-3d end-door" style="background-image: url('${doorUrl}'); transform: translate3d(-300px, -300px, -4000px);"></div>

        </div>
        <!-- Rain overlay fixed to screen -->
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, rgba(0,0,10,0.8), rgba(0,20,40,0.4)); pointer-events: none;"></div>
    </div>
    `;
  }

  update(deltaTime, time) {
    super.update(deltaTime, time);

    if (!this.element) return;
    const world = this.element.querySelector('#world-3d');
    if (!world) return;

    // We walk forward. Total depth to door is ~3800.
    // We want to arrive near the door by the end of the duration (120000ms).
    const targetZ = 3500;
    const speed = targetZ / this.duration;

    // Increment Z position
    this.walkZ += speed * deltaTime;

    // Stop at the door
    if (this.walkZ > targetZ) {
        this.walkZ = targetZ;
    }

    // Combine walk progress with mouse look
    // mouse currentRelX ranges roughly -0.5 to 0.5 depending on screen position
    const lookX = (this.currentRelX || 0) * 200; // Look left/right
    const lookY = (this.currentRelY || 0) * 100; // Look up/down

    // Apply transform to the world container
    // To move the camera FORWARD, we translate the world POSITIVE Z
    world.style.transform = `translate3d(${-lookX}px, ${-lookY}px, ${this.walkZ}px)`;
  }
}
