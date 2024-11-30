import {Component, Input, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {DatePipe} from "@angular/common";

export interface PuppyWeight {
    date: Date;
    weight: number;
}
@Component({
  selector: 'app-puppy-weight-table',
  standalone: true,
    imports: [
        TableModule,
        DatePipe
    ],
  templateUrl: './puppy-weight-table.component.html',
  styleUrl: './puppy-weight-table.component.scss'
})
export class PuppyWeightTableComponent implements OnInit {
    @Input() weights: PuppyWeight[] = [];

    ngOnInit() {
        // Пример данных
        this.weights = [
            { date: new Date('2024-01-01'), weight: 1.2 },
            { date: new Date('2024-01-08'), weight: 1.5 },
            { date: new Date('2024-01-15'), weight: 1.8 },
            { date: new Date('2024-01-22'), weight: 2.1 },
            { date: new Date('2024-01-29'), weight: 2.4 }
        ];
    }
}
