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

    this._parallaxHandler = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const width = window.innerWidth;
      const height = window.innerHeight;

      const relX = (mouseX - width / 2) / width;
      const relY = (mouseY - height / 2) / height;

      layers.forEach(layer => {
        const depth = parseFloat(layer.getAttribute('data-depth')) || 0;
        // higher depth = moves more
        const moveX = relX * depth * 50;
        const moveY = relY * depth * 50;

        layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener('mousemove', this._parallaxHandler);
  }

  onEnter() {
    // Called after scene is mounted and faded in
  }

  destroy() {
    if (this._parallaxHandler) {
      window.removeEventListener('mousemove', this._parallaxHandler);
    }
    this.element.remove();
  }
}
