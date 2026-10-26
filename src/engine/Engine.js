import { StateManager } from './StateManager.js';
import { AudioManager } from './AudioManager.js';

export class Engine {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.state = new StateManager();
    this.audio = new AudioManager();
    this.scenes = {};
    this.currentScene = null;
  }

  registerScene(sceneId, sceneClass) {
    this.scenes[sceneId] = sceneClass;
  }

  async loadScene(sceneId) {
    if (!this.scenes[sceneId]) {
      console.error(`Scene ${sceneId} not found!`);
      return;
    }

    const SceneClass = this.scenes[sceneId];
    const newScene = new SceneClass(this);

    // Transition effect
    if (this.currentScene) {
      await this.fadeOut();
      this.currentScene.destroy();
      this.container.innerHTML = '';
    }

    this.currentScene = newScene;
    this.state.update('currentScene', sceneId);

    const sceneElement = await this.currentScene.render();
    this.container.appendChild(sceneElement);

    if (this.currentScene.setupParallax) {
      this.currentScene.setupParallax();
    }

    if (this.currentScene.onEnter) {
      this.currentScene.onEnter();
    }

    await this.fadeIn();
  }

  async fadeOut(duration = 500) {
    this.container.style.transition = `opacity ${duration}ms ease`;
    this.container.style.opacity = '0';
    return new Promise(resolve => setTimeout(resolve, duration));
  }

  async fadeIn(duration = 500) {
    this.container.style.transition = `opacity ${duration}ms ease`;
    this.container.style.opacity = '1';
    return new Promise(resolve => setTimeout(resolve, duration));
  }

  start() {
    const savedScene = this.state.get('currentScene');
    if (savedScene && this.scenes[savedScene]) {
      this.loadScene(savedScene);
    } else {
      // Load first scene by default if no save
      const firstSceneId = Object.keys(this.scenes)[0];
      if (firstSceneId) {
        this.loadScene(firstSceneId);
      }
    }
  }
}
