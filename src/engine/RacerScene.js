import { CinematicScene } from './CinematicScene.js';

export class RacerScene extends CinematicScene {
  constructor(engine) {
    super(engine);
    this.speed = 0;
    this.curve = 0;
    this.trackPosition = 0;
    this.playerX = 0;

    // We will build a basic mode-7/Outrun style pseudo-3D racer on a canvas
  }

  async render() {
    await super.render();

    // We need to inject our canvas on top of the shot container but behind the UI
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '10'; // Above shots, below UI
    this.canvas.width = 800; // Fixed internal resolution for retro feel
    this.canvas.height = 600;

    this.element.insertBefore(this.canvas, this.element.querySelector('#ui-container'));

    this.ctx = this.canvas.getContext('2d');

    return this.element;
  }

  onEnter() {
    super.onEnter();
    // We hook into the animation loop via super.update()
  }

  update(deltaTime, time) {
    super.update(deltaTime, time);

    if (!this.ctx) return;

    // Racer logic
    this.speed = 100; // Base speed

    // Animate track position
    this.trackPosition += this.speed * (deltaTime / 1000);

    // Render Pseudo-3D Track
    this.renderTrack();
  }

  renderTrack() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;

    // Draw sky/background
    ctx.fillStyle = '#050510';
    ctx.fillRect(0, 0, width, height / 2);

    // Draw ground
    ctx.fillStyle = '#0a0a0c';
    ctx.fillRect(0, height / 2, width, height / 2);

    const segments = 200;
    const segmentLength = 20;

    // Very simple pseudo-3d projection
    let currentY = height;
    let z = 1;

    for (let i = 0; i < segments; i++) {
        // Perspective projection
        const pZ = i * segmentLength - (this.trackPosition % segmentLength);
        if (pZ < 1) continue;

        const projY = height / 2 + (height / 2) * (100 / pZ);

        if (projY > currentY) continue; // Don't draw over what's already drawn (back to front)

        // Track width changes with perspective
        const projW = width * (100 / pZ);

        // Curve
        const pX = width / 2; // Add curve logic here if desired

        // Draw segment
        const isDark = Math.floor((this.trackPosition + i * segmentLength) / 100) % 2 === 0;

        // Grass
        ctx.fillStyle = isDark ? '#111' : '#1a1a24';
        ctx.fillRect(0, projY, width, currentY - projY);

        // Road
        ctx.fillStyle = isDark ? '#333' : '#444';
        ctx.beginPath();
        ctx.moveTo(pX - projW / 2, projY);
        ctx.lineTo(pX + projW / 2, projY);
        ctx.lineTo(pX + (projW * 1.1) / 2, currentY);
        ctx.lineTo(pX - (projW * 1.1) / 2, currentY);
        ctx.fill();

        // Neon borders
        ctx.fillStyle = isDark ? '#00f3ff' : '#ff00ea';
        const borderWidth = projW * 0.05;

        // Left border
        ctx.beginPath();
        ctx.moveTo(pX - projW / 2 - borderWidth, projY);
        ctx.lineTo(pX - projW / 2, projY);
        ctx.lineTo(pX - (projW * 1.1) / 2, currentY);
        ctx.lineTo(pX - (projW * 1.1) / 2 - (borderWidth*1.1), currentY);
        ctx.fill();

        // Right border
        ctx.beginPath();
        ctx.moveTo(pX + projW / 2, projY);
        ctx.lineTo(pX + projW / 2 + borderWidth, projY);
        ctx.lineTo(pX + (projW * 1.1) / 2 + (borderWidth*1.1), currentY);
        ctx.lineTo(pX + (projW * 1.1) / 2, currentY);
        ctx.fill();

        currentY = projY;
    }
  }
}
