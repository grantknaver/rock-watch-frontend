import { Component, effect, inject, OnInit, input } from '@angular/core';
import { AsteroidService } from '../services/asteroid.service';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';

// typical import
import gsap from "gsap";

// get other plugins:
import ScrollTrigger from "gsap/ScrollTrigger";
import Flip from "gsap/Flip";
import Draggable from "gsap/Draggable";

import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';

gsap.registerPlugin([ScrollTrigger, Flip, Draggable]);

@Component({
  selector: 'app-landing',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, MatInputModule, MatPaginatorModule, MatButtonModule, FormsModule, MatDatepickerModule, ReactiveFormsModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
  asteroidService = inject(AsteroidService);
  disastrousAsteroids: any[] = [];
  disasterCounter: number = 0;
  startDate = new FormControl();
  endDate = new FormControl();
  displayedAsteroids: any[] = [];
  pageSize = 5;
  currentPage = 0;

  constructor() {
    effect(() => {
      this.disastrousAsteroids = this.asteroidService.disastrousAsteroids();
      this.updateDisplayedAsteroids();
    });
  }

  setGsapAnimations(): void {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.content',
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      },
    });
    tl.fromTo('.content', {y: 500}, { duration: 6, y: 0 , ease: 'linear'});

    setInterval(() => {
      if (this.disastrousAsteroids.length > this.disasterCounter) {
        this.disasterCounter++;
      }
    }, 1000);

    setTimeout(() => {
      let list = document.querySelectorAll(".list-item");
      list.forEach( (item, index) => {

      const tl2 = gsap.timeline();
      const delay = index + 1;
      tl2.fromTo(
        item,
        { x: -500 },
        { x: 0, duration: 1, delay },
      );
    })}, this.disastrousAsteroids.length)

  }

  ngOnInit(): void {
    this.setGsapAnimations();
    this.startDate.setValue(new Date('2023-09-07'), {emitEvent: false});
    this.endDate.setValue(new Date('2023-09-08'), {emitEvent: false});
  }

  updateDisplayedAsteroids() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedAsteroids = this.disastrousAsteroids.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedAsteroids();
  }

  formatDate(date: Date): string {
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
  }

  onSubmit() {
    this.asteroidService.startDate.set(this.formatDate(this.startDate.value));
    this.asteroidService.endDate.set(this.formatDate(this.endDate.value));
    this.asteroidService.fetchAstroidData();
    this.disasterCounter = this.asteroidService.disastrousAsteroids.length;
  }
}
