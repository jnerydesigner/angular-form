import { environment } from './../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ViaCepModel } from '../models/viacep.model';

@Injectable({ providedIn: 'root' })
export class CepService {
  private url = environment.api;
  constructor(private readonly httpClient: HttpClient) {}

  buscarCep(cep: string) {
    const cepResponse = this.httpClient.get<ViaCepModel>(
      `${this.url}/${cep}/json/`
    );

    return cepResponse;
  }
}
