import { CinematicScene } from '../engine/CinematicScene.js';
import alleyUrl from '../assets/images/alley.jpg';
import bgCityUrl from '../assets/images/scroll/bg_city.jpg';
import mgBuildingsUrl from '../assets/images/scroll/mg_buildings.jpg';
import fgStreetUrl from '../assets/images/scroll/fg_street.jpg';
import carFlyingUrl from '../assets/images/scroll/car_flying.jpg';

export class Scene2 extends CinematicScene {
  constructor(engine) {
    super(engine);
    // 1-minute scene
    this.duration = 60000;

    this.shots = [
        {
            time: 0,
            html: `
            <div class="travel-scene-container">
                <div class="scroll-layer scroll-bg" style="background-image: url('${bgCityUrl}');"></div>
                <div class="scroll-layer scroll-mg" style="background-image: url('${mgBuildingsUrl}');"></div>
                <div class="scroll-layer scroll-fg" style="background-image: url('${fgStreetUrl}');"></div>
                <div class="travel-vehicle" style="background-image: url('${carFlyingUrl}');"></div>
                <!-- Vignette -->
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; box-shadow: inset 0 0 150px rgba(0,0,0,1); pointer-events: none; z-index: 5;"></div>
            </div>
            `
        },
        {
            time: 30000,
            html: `
            <!-- Simulating forward walking through an alley using staggered forward-scroll -->
            <div class="forward-scroll-layer" style="background-image: url('${alleyUrl}');"></div>
            <div class="forward-scroll-layer forward-delay-1" style="background-image: url('${alleyUrl}');"></div>
            <div class="forward-scroll-layer forward-delay-2" style="background-image: url('${alleyUrl}');"></div>
            <!-- Vignette for deep alley feel -->
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; box-shadow: inset 0 0 150px rgba(0,0,0,1); pointer-events: none;"></div>
            `
        }
    ];

    this.timeline = [
      { time: 1000, text: "I hit the accelerator. The hover-car screams into the neon sky." },
      { time: 15000, text: "The city blurrs beneath me. Levels passing in seconds. Megacorps above, rot below." },
      { time: 30000, text: "Landed near the Noodle Bar. The hover-car is hidden. I'm on foot now." },
      { time: 45000, text: "Walking down the alleyway. The stench of synthetic pork and ozone is thick." }
    ];

    this.choices = [
      {
        text: "Sneak past the guards to the back door",
        action: () => this.engine.loadScene('scene3')
      },
      {
        text: "Kick the front door open, guns drawn",
        action: () => this.engine.loadScene('scene3')
      }
    ];
  }
}
