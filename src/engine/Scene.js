export class Scene {
  constructor(engine) {
    this.engine = engine;
    this.element = document.createElement('div');
    this.element.className = 'scene';
  }

  async render() {
    return this.element;
  }

  showUIAfterDelay(uiContainer, delayMs) {
    uiContainer.style.opacity = '0';
    uiContainer.style.transition = 'opacity 2s ease-in-out';
    setTimeout(() => {
      uiContainer.style.opacity = '1';
    }, delayMs);
  }

  createChoicesUI(choices) {
    const choicesContainer = document.createElement('div');
    choicesContainer.className = 'choices-container';

    choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = choice.text;
      btn.addEventListener('click', () => {
        if (this.engine.audio && this.engine.audio.playSynthesizedClick) {
          this.engine.audio.playSynthesizedClick();
        }
        if (choice.action) {
          choice.action();
        }
      });
      choicesContainer.appendChild(btn);
    });

    return choicesContainer;
  }

  createDialogUI(text) {
    const dialogContainer = document.createElement('div');
    dialogContainer.className = 'dialog-container';

    const textElement = document.createElement('p');
    textElement.className = 'dialog-text';
    textElement.textContent = text;

    dialogContainer.appendChild(textElement);
    return dialogContainer;
  }

  setupParallax() {
    // Override in subclass if needed
    // Default implementation handles data-depth elements
    const layers = this.element.querySelectorAll('[data-depth]');
    if (layers.length === 0) return;

    this.deviceOrientationListenerAdded = false;

    this._parallaxHandler = (e) => {
      let relX, relY;

      if (e.type === 'deviceorientation') {
        const gamma = Math.min(Math.max(e.gamma, -45), 45);
        const beta = Math.min(Math.max(e.beta - 45, -45), 45);

        relX = gamma / 45;
        relY = beta / 45;
      } else {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const width = window.innerWidth;
        const height = window.innerHeight;
        relX = (mouseX - width / 2) / width;
        relY = (mouseY - height / 2) / height;
      }

      layers.forEach(layer => {
        const depth = parseFloat(layer.getAttribute('data-depth')) || 0;
        const moveX = relX * depth * 50;
        const moveY = relY * depth * 50;

        layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener('mousemove', this._parallaxHandler);

    // Request permission for device orientation on iOS 13+
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      // Must be triggered by a user gesture. We'll attach it to a click event on the document once
      this._enableOrientation = () => {
        DeviceOrientationEvent.requestPermission()
          .then(permissionState => {
            if (permissionState === 'granted') {
              window.addEventListener('deviceorientation', this._parallaxHandler);
              this.deviceOrientationListenerAdded = true;
            }
          })
          .catch(console.error);
        document.removeEventListener('click', this._enableOrientation);
      };
      document.addEventListener('click', this._enableOrientation);
    } else {
      window.addEventListener('deviceorientation', this._parallaxHandler);
      this.deviceOrientationListenerAdded = true;
    }
  }

  onEnter() {
    // Called after scene is mounted and faded in
  }

  destroy() {
    if (this._parallaxHandler) {
      window.removeEventListener('mousemove', this._parallaxHandler);
      if (this.deviceOrientationListenerAdded) {
         window.removeEventListener('deviceorientation', this._parallaxHandler);
      }
    }
    if (this._enableOrientation) {
        document.removeEventListener('click', this._enableOrientation);
    }
    this.element.remove();
  }
}
