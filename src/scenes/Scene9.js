import { CinematicScene } from '../engine/CinematicScene.js';
import serverUrl from '../assets/images/server.jpg';

export class Scene9 extends CinematicScene {
  constructor(engine) {
    super(engine);
    // 2-minute scene
    this.duration = 120000;
    this.timeline = [
      { time: 1000, text: "The doors hiss open. The server core is massive." },
      { time: 25000, text: "Columns of data-banks glowing cold blue in the dark." },
      { time: 55000, text: "I plug the drive into the main terminal." },
      { time: 80000, text: "A choice has to be made. I can upload the data to the free-net..." },
      { time: 105000, text: "...or wipe it all and let the corp keep its secrets, for a price." }
    ];

    this.choices = [
      {
        text: "Upload to the Free-Net (Expose them)",
        action: () => this.engine.loadScene('scene10')
      },
      {
        text: "Wipe the servers (Take the buyout)",
        action: () => this.engine.loadScene('scene10')
      }
    ];
  }

  getHTML() {
    return `
      <div class="parallax-layer cinematic-zoom" data-depth="0.1" style="
        background-image: url('${serverUrl}');
        filter: hue-rotate(-30deg) contrast(1.2);
      "></div>

      <!-- Core pulse effect -->
      <div class="parallax-layer" data-depth="0.3" style="
        background: radial-gradient(circle at center, rgba(0, 243, 255, 0.2) 0%, transparent 70%);
        animation: neon-flicker 2s infinite alternate;
        mix-blend-mode: overlay;
      "></div>
    `;
  }
}
