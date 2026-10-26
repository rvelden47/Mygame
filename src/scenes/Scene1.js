import { Scene } from '../engine/Scene.js';

import bgUrl from '../assets/images/scene1_bg.svg';
import midUrl from '../assets/images/scene1_mid.svg';
import fgUrl from '../assets/images/scene1_fg.svg';

export class Scene1 extends Scene {
  async render() {
    this.element.innerHTML = `
      <!-- Parallax Layers -->
      <div class="parallax-layer" data-depth="0.1" style="background-image: url('${bgUrl}')"></div>
      <div class="parallax-layer" data-depth="0.3" style="background-image: url('${midUrl}')"></div>
      <div class="parallax-layer" data-depth="0.7" style="background-image: url('${fgUrl}')"></div>

      <!-- UI Layer -->
      <div class="ui-layer" id="ui-container"></div>
    `;

    const ui = this.element.querySelector('#ui-container');

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
