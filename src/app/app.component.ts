import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./style.component.css'],
})
export class AppComponent {
  readonly apiURL: string;
  title = 'Formulário de Contato';
  constructor(private http: HttpClient) {
    this.apiURL = 'https://viacep.com.br/ws/01001000/json/';
  }

  listarTodosOsCeps() {
    this.http.get(this.apiURL).subscribe((data) => {
      console.log(data);
    });
  }
}
