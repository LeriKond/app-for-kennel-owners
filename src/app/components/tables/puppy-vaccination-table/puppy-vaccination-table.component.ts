import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { SharedModule } from "primeng/api";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { AddEditVaccinationComponent } from "../../modals/add-edit-vaccination/add-edit-vaccination.component";
import {PuppyDetailsService} from "../../../services/puppy-details.service";

@Component({
  selector: 'app-puppy-vaccination-table',
  standalone: true,
    imports: [
        DatePipe,
        SharedModule,
        TableModule,
        ButtonModule
    ],
  templateUrl: './puppy-vaccination-table.component.html',
  styleUrl: './puppy-vaccination-table.component.scss'
})
export class PuppyVaccinationTableComponent implements OnInit {
    @Input() vaccinations;
    ref: DynamicDialogRef | undefined;

    constructor(private dialogService: DialogService, private puppyDetailsService: PuppyDetailsService) {}

    ngOnInit() {
        this.puppyDetailsService.getVaccinityData().subscribe((data) => {
            this.vaccinations = data;
        });
    }

    public openDialog() {
        this.ref = this.dialogService.open(AddEditVaccinationComponent, {
            header: 'Добавление записи о вакцинации',
            width: '30%'
        });

        this.ref.onClose.subscribe((vaccination) => {
            if (vaccination) {}
        });
    }

}
