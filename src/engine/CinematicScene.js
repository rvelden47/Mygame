import { Scene } from './Scene.js';

export class CinematicScene extends Scene {
  constructor(engine) {
    super(engine);
    this.timeline = []; // Array of { time: ms, text: string }
    this.shots = []; // Array of { time: ms, html: string }
    this.duration = 0; // Total duration in ms
    this.choices = []; // Choices to show at the end
    this.activeTimeouts = [];
  }

  async render() {
    this.element.innerHTML = '';

    // Background layer that changes based on shots
    this.shotContainer = document.createElement('div');
    this.shotContainer.className = 'shot-container';
    this.element.appendChild(this.shotContainer);

    // Set initial HTML if getHTML is used instead of shots
    const initialHtml = this.getHTML();
    if (initialHtml) {
        this.shotContainer.innerHTML = initialHtml;
    }

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

    if (window.DEV_MODE) {
        this.renderSkipButton(uiContainer);
    }

    return this.element;
  }

  renderSkipButton(container) {
      const skipBtn = document.createElement('button');
      skipBtn.textContent = 'SKIP SCENE (DEV)';
      skipBtn.className = 'dev-skip-btn';
      skipBtn.style.position = 'absolute';
      skipBtn.style.top = '10px';
      skipBtn.style.right = '10px';
      skipBtn.style.zIndex = '9999';
      skipBtn.style.padding = '5px 10px';
      skipBtn.style.background = 'rgba(255,0,0,0.7)';
      skipBtn.style.color = 'white';
      skipBtn.style.border = '1px solid red';
      skipBtn.style.cursor = 'pointer';

      skipBtn.addEventListener('click', () => {
          this.skipScene();
      });

      container.appendChild(skipBtn);
  }

  skipScene() {
      // Clear all active timeouts
      this.activeTimeouts.forEach(id => clearTimeout(id));
      this.activeTimeouts = [];

      // If we have shots, show the last shot
      if (this.shots && this.shots.length > 0) {
          const lastShot = this.shots[this.shots.length - 1];
          this.renderShot(lastShot.html);
      }

      // If we have text, show the last text
      if (this.timeline.length > 0) {
          const lastText = this.timeline[this.timeline.length - 1].text;
          this.showText(lastText);
      }

      // Show choices
      this.showChoices();
  }

  getHTML() {
    // Override this in child classes to provide the HTML with background layers
    return '';
  }

  onEnter() {
    super.onEnter();
    this.startTimeline();
    this.startShots();
  }

  startShots() {
      if (!this.shots || this.shots.length === 0) return;

      this.shots.sort((a, b) => a.time - b.time);

      this.shots.forEach(shot => {
          const timeoutId = setTimeout(() => {
              this.renderShot(shot.html);
          }, shot.time);
          this.activeTimeouts.push(timeoutId);
      });
  }

  renderShot(html) {
      if (!this.shotContainer) return;

      // Clean up old parallax handlers if needed before overwriting innerHTML
      if (this._parallaxHandler) {
        window.removeEventListener('mousemove', this._parallaxHandler);
        if (this.deviceOrientationListenerAdded) {
           window.removeEventListener('deviceorientation', this._parallaxHandler);
        }
      }

      // We can do a crossfade here by manipulating opacities,
      // but for "moving scenes" hard cuts or animated cuts are good too.
      // Let's do a quick fade out / fade in
      this.shotContainer.style.transition = 'opacity 0.2s';
      this.shotContainer.style.opacity = '0';

      setTimeout(() => {
          this.shotContainer.innerHTML = html;
          this.setupParallax(); // Re-bind parallax to new elements
          this.shotContainer.style.opacity = '1';
      }, 200);
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

    // Hide skip button if we've reached choices
    const skipBtn = this.element.querySelector('.dev-skip-btn');
    if (skipBtn) {
        skipBtn.style.display = 'none';
    }
  }

  destroy() {
    this.activeTimeouts.forEach(id => clearTimeout(id));
    super.destroy();
  }
}
