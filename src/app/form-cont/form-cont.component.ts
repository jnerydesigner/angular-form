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
import { Observable, map } from 'rxjs';

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

  onSubmit() {
    this.submittedData = this.formContact.value;
    const cep = this.formContact.get('cep')?.value;
    try {
      this.cepService
        .buscarCep(cep)
        .pipe(
          map((cepResolver: ViaCepModel | undefined) => {
            if (cepResolver) {
              this.cepResponse = cepResolver;
            } else {
              console.error('CEP não encontrado');
            }
          })
        )
        .subscribe(() => console.log('CEP encontrado'));
    } catch (error) {
      console.error(error);
    }
    this.formContact.reset();
  }
}
