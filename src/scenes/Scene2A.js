import { Scene } from '../engine/Scene.js';

import bgUrl from '../assets/images/real_bar_interior.jpg';

export class Scene2A extends Scene {
  async render() {
    this.element.innerHTML = `
      <div class="parallax-layer cinematic-pan" data-depth="0.15" style="background-image: url('${bgUrl}')"></div>

      <!-- A dark vignette overlay to make text readable and mood darker -->
      <div style="
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background: radial-gradient(circle, transparent 20%, rgba(0,0,0,0.8) 90%);
        pointer-events: none;
      "></div>

      <div class="ui-layer" id="ui-container"></div>
    `;

    const ui = this.element.querySelector('#ui-container');

    // Slight delay to take in the pan
    this.showUIAfterDelay(ui, 2000);

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
