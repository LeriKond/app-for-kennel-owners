import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";

@Component({
  selector: 'app-puppy-vaccination-table',
  standalone: true,
    imports: [
        DatePipe,
        SharedModule,
        TableModule
    ],
  templateUrl: './puppy-vaccination-table.component.html',
  styleUrl: './puppy-vaccination-table.component.scss'
})
export class PuppyVaccinationTableComponent implements OnInit {
    @Input() vaccinations: any[] = [];

    ngOnInit() {
        // Пример данных
        this.vaccinations = [
            { date: new Date('2024-01-01'), vaccinationName: 'Нобивак DHPPi', clinicName: 'Dr. Vetson', veterinarian: 'Максимова А.Ю.' },
            { date: new Date('2021-01-01'), vaccinationName: 'Нобивак Rabbies', clinicName: 'Ковчег', veterinarian: 'Юрьева А.В.' },
            { date: new Date('2023-01-01'), vaccinationName: 'Нобивак DHPPi', clinicName: 'Любимый носик', veterinarian: 'Симакова Д.М.' },
            { date: new Date('2024-01-01'), vaccinationName: 'Нобивак DHPPi', clinicName: 'Dr. Vetson', veterinarian: 'Максимова А.Ю.' },
        ];
    }
}
