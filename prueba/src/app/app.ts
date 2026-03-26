import { Component, NgModule, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',

})


export class App {
  protected readonly title = signal('prueba');
}
