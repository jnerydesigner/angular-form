import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Contact } from '../models/contact.model';
import { CommonModule } from '@angular/common';
import { CepService } from '../cep/cep.service';
import { ViaCepModel } from '../models/viacep.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-cont',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-cont.component.html',
  styleUrl: './form-cont.component.css',
})
export class FormContComponent implements OnInit {
  formContact: FormGroup;
  submittedData: any;

  cepResponse: ViaCepModel = {} as ViaCepModel;

  constructor(
    private formBuilder: FormBuilder,
    private readonly cepService: CepService
  ) {
    this.formContact = this.formBuilder.group({
      cep: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.createForm(new Contact());
  }

  createForm(contact: Contact) {
    this.formContact = this.formBuilder.group({
      cep: [contact.cep, Validators.required],
    });
  }

  async onSubmit() {
    this.submittedData = this.formContact.value;
    const cep = this.formContact.get('cep')?.value;
    try {
      const cepResolver: ViaCepModel | undefined = await this.cepService
        .buscarCep(cep)
        .toPromise();

      if (cepResolver) {
        this.cepResponse = cepResolver;
      } else {
        console.error('CEP não encontrado');
      }
    } catch (error) {
      console.error(error);
    }

    console.log(this.cepResponse);
    console.log(this.submittedData);

    this.formContact.reset();
  }
}
