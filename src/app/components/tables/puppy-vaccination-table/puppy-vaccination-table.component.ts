import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { SharedModule } from "primeng/api";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { AddEditVaccinationComponent } from "../../modals/add-edit-vaccination/add-edit-vaccination.component";

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
    @Input() vaccinations: any[] = [];
    ref: DynamicDialogRef | undefined;

    constructor(private dialogService: DialogService) {}
    ngOnInit() {
        // Пример данных
        this.vaccinations = [
            { date: new Date('2024-01-01'), vaccinationName: 'Нобивак DHPPi', clinicName: 'Dr. Vetson', veterinarian: 'Максимова А.Ю.' },
            { date: new Date('2021-01-01'), vaccinationName: 'Нобивак Rabbies', clinicName: 'Ковчег', veterinarian: 'Юрьева А.В.' },
            { date: new Date('2023-01-01'), vaccinationName: 'Нобивак DHPPi', clinicName: 'Любимый носик', veterinarian: 'Симакова Д.М.' },
            { date: new Date('2024-01-01'), vaccinationName: 'Нобивак DHPPi', clinicName: 'Dr. Vetson', veterinarian: 'Максимова А.Ю.' },
        ];
    }

    public openDialog() {
        this.ref = this.dialogService.open(AddEditVaccinationComponent, {
            header: 'Добавление записи о вакцинации',
            width: '50%'
        });

        this.ref.onClose.subscribe((vaccination) => {
            if (vaccination) {}
        });
    }

}
