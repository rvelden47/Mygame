import { Scene } from './Scene.js';

export class CinematicScene extends Scene {
  constructor(engine) {
    super(engine);
    this.timeline = []; // Array of { time: ms, text: string }
    this.duration = 0; // Total duration in ms
    this.choices = []; // Choices to show at the end
    this.activeTimeouts = [];
  }

  async render() {
    this.element.innerHTML = this.getHTML();

    const uiContainer = document.createElement('div');
    uiContainer.className = 'ui-layer cinematic-ui';
    uiContainer.id = 'ui-container';
    this.element.appendChild(uiContainer);

    this.dialogBox = document.createElement('div');
    this.dialogBox.className = 'dialog-container cinematic-dialog hidden';

    this.textElement = document.createElement('p');
    this.textElement.className = 'dialog-text type-effect';
    this.dialogBox.appendChild(this.textElement);

    uiContainer.appendChild(this.dialogBox);

    return this.element;
  }

  getHTML() {
    // Override this in child classes to provide the HTML with background layers
    return '';
  }

  onEnter() {
    super.onEnter();
    this.startTimeline();
  }

  startTimeline() {
    // Sort timeline to ensure correct order
    this.timeline.sort((a, b) => a.time - b.time);

    this.timeline.forEach(event => {
      const timeoutId = setTimeout(() => {
        this.showText(event.text);
      }, event.time);
      this.activeTimeouts.push(timeoutId);
    });

    // Schedule choices to appear after duration
    const finalTimeout = setTimeout(() => {
      this.showChoices();
    }, this.duration);
    this.activeTimeouts.push(finalTimeout);
  }

  showText(text) {
    // Reset animation by cloning and replacing
    const oldDialog = this.dialogBox;
    const newDialog = oldDialog.cloneNode(true);
    oldDialog.parentNode.replaceChild(newDialog, oldDialog);
    this.dialogBox = newDialog;

    const textEl = this.dialogBox.querySelector('.dialog-text');
    textEl.textContent = text;
    this.dialogBox.classList.remove('hidden');
    this.dialogBox.classList.add('visible');
  }

  showChoices() {
    // Hide text
    if(this.dialogBox) {
        this.dialogBox.classList.remove('visible');
        this.dialogBox.classList.add('hidden');
    }

    const uiContainer = this.element.querySelector('#ui-container');
    if (this.choices && this.choices.length > 0) {
      const choicesContainer = this.createChoicesUI(this.choices);
      choicesContainer.classList.add('fade-in');
      uiContainer.appendChild(choicesContainer);
    }
  }

  destroy() {
    this.activeTimeouts.forEach(id => clearTimeout(id));
    super.destroy();
  }
}
