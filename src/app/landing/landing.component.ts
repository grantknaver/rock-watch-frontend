import { Component, inject, OnInit,} from '@angular/core';
import { AsteroidService } from '../services/asteroid.service';

// typical import
import gsap from "gsap";

// get other plugins:
import ScrollTrigger from "gsap/ScrollTrigger";
import Flip from "gsap/Flip";
import Draggable from "gsap/Draggable";

import * as d3 from 'd3';
import { CommonModule } from '@angular/common';

gsap.registerPlugin([ScrollTrigger, Flip, Draggable]);

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
  asteroidService = inject(AsteroidService);
  disastrousAsteroids = this.asteroidService.disastrousAsteroids();
  disasterCounter = 0;

  constructor() {}

  ngOnInit(): void {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.content',
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        markers: true,
      },
    });

    tl.fromTo('.content', {opacity: 0, y: 500}, { duration: 6, opacity: 1, y: 0 , ease: 'circ'});
    setInterval(() => {
      if (this.disastrousAsteroids.length > this.disasterCounter) {
        this.disasterCounter++;
      }
    }, 1000);

    setTimeout(() => {
      let list = document.querySelectorAll(".list-item");
      list.forEach( (item, index) => {
      const tlMain = gsap.timeline();
      const delay = index + 1;
      tlMain.fromTo(
        item,
        { x: -500 },
        { x: 0, duration: 1, delay },
      );
    })}, this.disastrousAsteroids.length)
  }


}
