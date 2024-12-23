import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {DialogModule} from "primeng/dialog";
import {Treatment} from "../../tables/puppy-treatment-table/puppy-treatment-table.component";

@Component({
  selector: 'app-add-edit-treatment',
  standalone: true,
    imports: [
        ButtonModule,
        CalendarModule,
        InputTextModule,
        PaginatorModule,
        ReactiveFormsModule,
        DialogModule
    ],
  templateUrl: './add-edit-treatment.component.html',
  styleUrl: './add-edit-treatment.component.scss'
})
export class AddEditTreatmentComponent implements OnInit {
    treatment: Treatment = {} as Treatment;

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
) {}

    ngOnInit() {
        if (this.config.data?.treatment) {
            this.treatment = { ...this.config.data.treatment };
        }
    }

    saveTreatment() {
        this.ref.close(this.treatment);
    }

    hideDialog() {
        this.ref.close();
    }
}
