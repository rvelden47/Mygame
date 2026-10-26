import './styles/main.css';
import { Engine } from './engine/Engine.js';

// Initialize the game engine
const game = new Engine('app');

import { Scene1 } from './scenes/Scene1.js';
import { Scene2A } from './scenes/Scene2A.js';
import { Scene2B } from './scenes/Scene2B.js';

// Register scenes
game.registerScene('scene1', Scene1);
game.registerScene('scene2A', Scene2A);
game.registerScene('scene2B', Scene2B);

// Start the game
game.start();
