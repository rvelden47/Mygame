import { CinematicScene } from '../engine/CinematicScene.js';
import skylineUrl from '../assets/images/skyline.jpg';
import cityNightUrl from '../assets/images/city_night.jpg';
import rainUrl from '../assets/images/rain.jpg';

export class Scene10 extends CinematicScene {
  constructor(engine) {
    super(engine);
    // 2.5-minute scene
    this.duration = 150000;

    this.shots = [
        {
            time: 0,
            html: `
            <div class="parallax-animated-wrapper shot-pan-right">
                <div class="parallax-layer side-scroll-slow" data-depth="0.3" style="background-image: url('${skylineUrl}'); filter: saturate(0.8) contrast(1.1);"></div>
                <!-- Rain effect overlay using CSS stripes -->
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.1) 50%, rgba(255,255,255,0)); background-size: 100% 20px; animation: vertical-scroll 0.5s linear infinite; pointer-events: none; opacity: 0.3;"></div>
            </div>
            `
        },
        {
            time: 65000,
            html: `
            <div class="parallax-animated-wrapper shot-pan-up">
                <div class="parallax-layer" data-depth="0.2" style="background-image: url('${cityNightUrl}'); filter: brightness(0.8);"></div>
                <div class="parallax-layer" data-depth="0.8" style="background-image: url('${rainUrl}'); opacity: 0.4; mix-blend-mode: screen; animation: vertical-scroll 1s linear infinite;"></div>
            </div>
            `
        },
        {
            time: 100000,
            html: `
            <div class="parallax-animated-wrapper cinematic-zoom">
                <div class="parallax-layer" data-depth="0.5" style="background-image: url('${skylineUrl}'); filter: contrast(1.5) blur(1px);"></div>
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.1) 50%, rgba(255,255,255,0)); background-size: 100% 20px; animation: vertical-scroll 0.5s linear infinite; pointer-events: none; opacity: 0.5;"></div>
            </div>
            `
        }
    ];

    this.timeline = [
      { time: 1000, text: "It's done." },
      { time: 30000, text: "I'm standing on the roof of the server facility, looking out over the city." },
      { time: 65000, text: "The rain is still falling. It never really stops." },
      { time: 100000, text: "The neon lights below flicker, indifferent to what just happened." },
      { time: 135000, text: "Just another night in the metropolis." }
    ];

    this.choices = [
      {
        text: "Restart from the beginning",
        action: () => {
          this.engine.state.reset();
          this.engine.loadScene('scene1');
        }
      }
    ];
  }
}
