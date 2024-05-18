import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./style.component.css'],
})
export class AppComponent {
  title = 'Formulário de Contato';
}
