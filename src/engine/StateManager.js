export class StateManager {
  constructor(saveKey = 'game_save_state') {
    this.saveKey = saveKey;
    this.state = this.loadState() || this.defaultState();
  }

  defaultState() {
    return {
      currentScene: 'scene1',
      choicesMade: {},
      inventory: [],
      variables: {},
    };
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.saveKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load state", e);
    }
    return null;
  }

  saveState() {
    try {
      localStorage.setItem(this.saveKey, JSON.stringify(this.state));
    } catch (e) {
      console.error("Failed to save state", e);
    }
  }

  update(key, value) {
    this.state[key] = value;
    this.saveState();
  }

  get(key) {
    return this.state[key];
  }

  recordChoice(sceneId, choiceId) {
    this.state.choicesMade[sceneId] = choiceId;
    this.saveState();
  }

  getChoice(sceneId) {
    return this.state.choicesMade[sceneId];
  }

  reset() {
    this.state = this.defaultState();
    this.saveState();
  }
}
