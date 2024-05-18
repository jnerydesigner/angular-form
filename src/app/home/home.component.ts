import { Component } from '@angular/core';
import { FormContComponent } from '../form-cont/form-cont.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormContComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
