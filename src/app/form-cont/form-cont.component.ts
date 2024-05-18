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

  constructor(private formBuilder: FormBuilder) {
    this.formContact = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.createForm(new Contact());
  }

  createForm(contact: Contact) {
    this.formContact = this.formBuilder.group({
      name: [contact.name, Validators.required],
      email: [contact.email, Validators.required],
    });
  }

  onSubmit() {
    this.submittedData = this.formContact.value;

    console.log(this.submittedData);

    // this.formContact.reset();
  }
}
