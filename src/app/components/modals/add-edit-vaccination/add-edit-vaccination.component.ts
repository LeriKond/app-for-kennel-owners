import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-add-edit-vaccination',
  standalone: true,
    imports: [
        ButtonModule,
        CalendarModule,
        DropdownModule,
        InputTextModule,
        PaginatorModule,
        ReactiveFormsModule
    ],
  templateUrl: './add-edit-vaccination.component.html',
  styleUrl: './add-edit-vaccination.component.scss'
})
export class AddEditVaccinationComponent {
    vaccinationForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        public ref: DynamicDialogRef
    ) {
        this.vaccinationForm = this.fb.group({
            name: ['', Validators.required],
            date: ['', Validators.required],
            clinic: ['', Validators.required],
            vet: ['', Validators.required],
        });
    }

    close() {
        this.ref.close();
    }

    save() {
        if (this.vaccinationForm.valid) {
            this.ref.close(this.vaccinationForm.value);
        }
    }
}
