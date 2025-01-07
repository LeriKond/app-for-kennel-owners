import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {Treatment} from "../../tables/puppy-treatment-table/puppy-treatment-table.component";

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
export class AddEditVaccinationComponent implements OnInit {
    vaccinationForm: FormGroup;
    vaccination: any = {} as any;

    constructor(
        private fb: FormBuilder,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {
        // this.vaccinationForm = this.fb.group({
        //     name: ['', Validators.required],
        //     date: ['', Validators.required],
        //     clinic: ['', Validators.required],
        //     vet: ['', Validators.required],
        // });
    }

    ngOnInit() {
        if (this.config.data?.vaccination) {
            this.vaccination = { ...this.config.data.treatment };
        }
    }

    close() {
        this.ref.close();
    }

    save() {
        // if (this.vaccinationForm.valid) {
        //     this.ref.close(this.vaccinationForm.value);
        // }
        this.ref.close(this.vaccination);
    }
}
