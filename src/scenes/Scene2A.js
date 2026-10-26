import { Scene } from '../engine/Scene.js';

import bgUrl from '../assets/images/scene2a_bg.svg';
import midUrl from '../assets/images/scene2a_mid.svg';

export class Scene2A extends Scene {
  async render() {
    this.element.innerHTML = `
      <div class="parallax-layer" data-depth="0.1" style="background-image: url('${bgUrl}')"></div>
      <div class="parallax-layer" data-depth="0.5" style="background-image: url('${midUrl}')"></div>

      <div class="ui-layer" id="ui-container"></div>
    `;

    const ui = this.element.querySelector('#ui-container');

    const narrative = "The noodle bar is packed with off-duty corp-sec and lowlifes. The smell of synthetic pork fills the air. A drone hovers outside the window, scanning faces.";
    ui.appendChild(this.createDialogUI(narrative));

    const choices = [
      {
        text: "Hack the drone's optics",
        action: () => this.handleChoice('A')
      },
      {
        text: "Slip out the back alley",
        action: () => this.handleChoice('B')
      },
      {
        text: "Order a bowl and wait",
        action: () => this.handleChoice('C')
      }
    ];
    ui.appendChild(this.createChoicesUI(choices));

    return this.element;
  }

  handleChoice(choice) {
    this.engine.state.recordChoice('scene2a', choice);
    // Loop back for demo purposes
    this.engine.loadScene('scene1');
  }
}
