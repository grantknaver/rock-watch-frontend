import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { AsteroidData } from '../models/asterroid.model';

@Injectable({
  providedIn: 'root',
})
export class AsteroidService {
  asteroids: WritableSignal<any[]>= signal([]);
  disastrousAsteroids: WritableSignal<any[]> = signal([]);

  constructor(private http: HttpClient) { }

  fetchAstroidData() {
    const apiKey = 'bNBEtYwtNjNy1RljNfrAGGOYq2GRqz9JEZLD40N0';
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-09-07&end_date=2023-09-08&api_key=${apiKey}`
    return this.http.get<AsteroidData>(url).subscribe(
      {
        next: ({near_earth_objects}) => {
          if (near_earth_objects) {
            for (const property in near_earth_objects) {
              this.asteroids.update((values) => [...values, ...near_earth_objects[property]])
            }
            this.asteroids().forEach((asteroid, index) => {
              if (asteroid.is_potentially_hazardous_asteroid) {
                this.disastrousAsteroids.update((values) => [...values, this.asteroids()[index]]);
              }
            });
            console.log('Fetched Astroid Data');
            return near_earth_objects;
          }
        },
        error: (err) => err,
        complete: () => console.log('Fetched Astroid Data Complete')
      });
  }

}
