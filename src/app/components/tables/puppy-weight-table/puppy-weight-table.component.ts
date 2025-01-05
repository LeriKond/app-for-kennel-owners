import {Component, Input, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {DatePipe} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {AddEditVaccinationComponent} from "../../modals/add-edit-vaccination/add-edit-vaccination.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {AddEditTreatmentComponent} from "../../modals/add-edit-treatment/add-edit-treatment.component";
import {PuppyDetailsService} from "../../../services/puppy-details.service";

export interface PuppyWeight {
    date: Date;
    weight: number;
}
@Component({
  selector: 'app-puppy-weight-table',
  standalone: true,
    imports: [
        TableModule,
        DatePipe,
        ButtonModule
    ],
  templateUrl: './puppy-weight-table.component.html',
  styleUrl: './puppy-weight-table.component.scss'
})
export class PuppyWeightTableComponent implements OnInit {
    @Input() weights: PuppyWeight[];
    ref: DynamicDialogRef | undefined;

    constructor(private dialogService: DialogService, private puppyDetailsService: PuppyDetailsService) {}

    ngOnInit() {
        this.puppyDetailsService.getWeightData().subscribe((data) => {
            this.weights = data;
        });
    }

    public openDialog() {
        this.ref = this.dialogService.open(AddEditTreatmentComponent, {
            header: 'Добавление записи о весе',
            width: '30%'
        });

        this.ref.onClose.subscribe((weight) => {
            if (weight) {}
        });
    }
}
