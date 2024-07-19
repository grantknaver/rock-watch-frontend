import { Component, inject, OnInit } from '@angular/core';
import { AsteroidService } from '../services/asteroid.service';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  asteroidService = inject(AsteroidService);
  disastrousAsteroids = this.asteroidService.disastrousAsteroids;
}
