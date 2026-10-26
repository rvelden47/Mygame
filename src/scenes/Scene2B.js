import { Scene } from '../engine/Scene.js';

import bgUrl from '../assets/images/scene2b_bg.svg';
import midUrl from '../assets/images/scene2b_mid.svg';

export class Scene2B extends Scene {
  async render() {
    this.element.innerHTML = `
      <div class="parallax-layer" data-depth="0.1" style="background-image: url('${bgUrl}')"></div>
      <div class="parallax-layer" data-depth="0.5" style="background-image: url('${midUrl}')"></div>

      <div class="ui-layer" id="ui-container"></div>
    `;

    const ui = this.element.querySelector('#ui-container');

    const narrative = "The wind howls through the rusted scaffolding of the old monorail. Below, the city stretches out like a circuit board of neon. A shadow detaches itself from the gloom ahead.";
    ui.appendChild(this.createDialogUI(narrative));

    const choices = [
      {
        text: "Draw your EMP pistol",
        action: () => this.handleChoice('A')
      },
      {
        text: "Try to talk",
        action: () => this.handleChoice('B')
      }
    ];
    ui.appendChild(this.createChoicesUI(choices));

    return this.element;
  }

  handleChoice(choice) {
    this.engine.state.recordChoice('scene2b', choice);
    // Loop back for demo purposes
    this.engine.loadScene('scene1');
  }
}
