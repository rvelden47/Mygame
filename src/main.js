window.DEV_MODE = true;
import './styles/main.css';
import { Engine } from './engine/Engine.js';

// Initialize the game engine
const game = new Engine('app');

import { Scene1 } from './scenes/Scene1.js';
import { Scene2 } from './scenes/Scene2.js';
import { Scene3 } from './scenes/Scene3.js';
import { Scene4 } from './scenes/Scene4.js';
import { Scene5 } from './scenes/Scene5.js';
import { Scene6 } from './scenes/Scene6.js';
import { Scene7 } from './scenes/Scene7.js';
import { Scene8 } from './scenes/Scene8.js';
import { Scene9 } from './scenes/Scene9.js';
import { Scene10 } from './scenes/Scene10.js';

// Register scenes
game.registerScene('scene1', Scene1);
game.registerScene('scene2', Scene2);
game.registerScene('scene3', Scene3);
game.registerScene('scene4', Scene4);
game.registerScene('scene5', Scene5);
game.registerScene('scene6', Scene6);
game.registerScene('scene7', Scene7);
game.registerScene('scene8', Scene8);
game.registerScene('scene9', Scene9);
game.registerScene('scene10', Scene10);

// Start the game
game.start();
