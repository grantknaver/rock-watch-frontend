import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { AsteroidData } from '../models/asterroid.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AsteroidService {
  asteroids: WritableSignal<any[]>= signal([]);
  disastrousAsteroids: WritableSignal<any[]> = signal([]);
  startDate: WritableSignal<string> = signal('2023-09-07');
  endDate: WritableSignal<string> = signal('2023-09-08');

  constructor(private http: HttpClient) { }

  fetchAstroidData() {
    console.log('fetch');
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${this.startDate()}&end_date=${this.endDate()}&api_key=${environment.apiKey}`
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
            return near_earth_objects;
          }
        },
        error: (err) => {
          console.log('No data avaiable', err);
          this.asteroids.set([]);
          this.disastrousAsteroids.set([]);
          return err;
        },
        complete: () => console.log('Fetched Astroid Data Complete')
    });
  }

}
