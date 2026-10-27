import { Scene } from '../engine/Scene.js';

import bgUrl from '../assets/images/real_city_bg.jpg';
import fgUrl from '../assets/images/real_neon_sign.png'; // We use this as an overlay

export class Scene1 extends Scene {
  async render() {
    this.element.innerHTML = `
      <!-- Cinematic Background -->
      <div class="parallax-layer cinematic-zoom" data-depth="0.1" style="background-image: url('${bgUrl}')"></div>

      <!-- Neon overlay to add depth and flicker -->
      <div class="parallax-layer flicker" data-depth="0.3" style="
        background-image: url('${fgUrl}');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: right top;
        opacity: 0.6;
        mix-blend-mode: screen;
      "></div>

      <!-- UI Layer -->
      <div class="ui-layer" id="ui-container"></div>
    `;

    const ui = this.element.querySelector('#ui-container');

    // We want the user to take in the cinematic view for 4 seconds before the text appears
    this.showUIAfterDelay(ui, 4000);

    const narrative = "Rain slicked the neon streets of Sector 4. The target was close. You feel the weight of the data drive in your pocket. It's time to move.";
    ui.appendChild(this.createDialogUI(narrative));

    const choices = [
      {
        text: "Head into the crowded noodle bar (Blend in)",
        action: () => this.handleChoice('A')
      },
      {
        text: "Take the abandoned monorail tracks (Stay hidden)",
        action: () => this.handleChoice('B')
      }
    ];
    ui.appendChild(this.createChoicesUI(choices));

    return this.element;
  }

  handleChoice(choice) {
    this.engine.state.recordChoice('scene1', choice);

    if (choice === 'A') {
      this.engine.loadScene('scene2A');
    } else {
      this.engine.loadScene('scene2B');
    }
  }

  onEnter() {
    console.log("Entered Scene 1");
    // this.engine.audio.playMusic('/src/assets/audio/cyberpunk_theme.mp3');
  }
}
