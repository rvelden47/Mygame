export class Scene {
  constructor(engine) {
    this.engine = engine;
    this.element = document.createElement('div');
    this.element.className = 'scene';
  }

  async render() {
    return this.element;
  }

  createChoicesUI(choices) {
    const choicesContainer = document.createElement('div');
    choicesContainer.className = 'choices-container';

    choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = choice.text;
      btn.addEventListener('click', () => {
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

    // Use deviceorientation for mobile, mousemove for desktop
    this._parallaxHandler = (e) => {
      let relX, relY;

      if (e.type === 'deviceorientation') {
        // Clamp gamma and beta to reasonable ranges for parallax
        const gamma = Math.min(Math.max(e.gamma, -45), 45); // Left/Right tilt
        const beta = Math.min(Math.max(e.beta - 45, -45), 45); // Front/Back tilt (adjusted for typical holding angle)

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
        // higher depth = moves more
        const moveX = relX * depth * 50;
        const moveY = relY * depth * 50;

        layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener('mousemove', this._parallaxHandler);
    window.addEventListener('deviceorientation', this._parallaxHandler);
  }

  onEnter() {
    // Called after scene is mounted and faded in
  }

  destroy() {
    if (this._parallaxHandler) {
      window.removeEventListener('mousemove', this._parallaxHandler);
      window.removeEventListener('deviceorientation', this._parallaxHandler);
    }
    this.element.remove();
  }
}
