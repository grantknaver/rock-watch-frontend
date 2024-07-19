import { CommonModule } from '@angular/common';
import { HttpClient  } from '@angular/common/http';
import { Component, signal, OnInit, WritableSignal } from '@angular/core';
import { RouterOutlet, RouterModule  } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { AsteroidData } from './models/asterroid.model';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, MatListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit() {

  }
}
