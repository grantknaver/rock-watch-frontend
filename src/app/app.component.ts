import { CommonModule } from '@angular/common';
import { HttpClient  } from '@angular/common/http';
import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule  } from '@angular/router';
import {MatListModule} from '@angular/material/list';

interface Links {
  next: string;
  previous: string;
  self: string;
}
export interface AsteroidData {
  elementCount: number;
  links: Links;
  near_earth_objects: any;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, MatListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  asteroids: any[] = [];
  disastrousAsteroids: any[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http.get<AsteroidData>('https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-09-07&end_date=2023-09-08&api_key=bNBEtYwtNjNy1RljNfrAGGOYq2GRqz9JEZLD40N0').subscribe(({near_earth_objects}) => {
      for (const property in near_earth_objects) {
       this.asteroids = [...this.asteroids,...near_earth_objects[property]]
      }
      this.asteroids.forEach((asteroid, index) => {
        if (asteroid.is_potentially_hazardous_asteroid) {
          this.disastrousAsteroids.push(this.asteroids[index]);
        }
      });
    });
  }
}
