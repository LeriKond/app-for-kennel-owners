import {Component, OnInit} from '@angular/core';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {ConfirmationService, MenuItem, MessageService, TreeNode} from "primeng/api";
import {Puppy} from "../../components/modals/add-puppy/add-puppy.component";
import {CardModule} from "primeng/card";
import {OrganizationChartModule} from "primeng/organizationchart";
import {FieldsetModule} from "primeng/fieldset";
import {HeightChartComponent} from "../../components/charts/height-chart/height-chart.component";
import {PuppyWeightTableComponent} from "../../components/tables/puppy-weight-table/puppy-weight-table.component";
import {PuppyVaccinationTableComponent} from "../../components/tables/puppy-vaccination-table/puppy-vaccination-table.component";
import {PuppyTreatmentTableComponent} from "../../components/tables/puppy-treatment-table/puppy-treatment-table.component";
import {DatePipe} from "@angular/common";
import {ImageModule} from "primeng/image";
import {PuppyDetailsService} from "../../services/puppy-details.service";
import {PuppyAgePipe} from "./puppy-age.pipe";

interface DogAchievements {
    tests?: string[];
    shows?: string[];
}

export interface PedigreeNode {
    name: string;
    achievements?: DogAchievements;
    expanded?: boolean;
    type?: string;
    children?: PedigreeNode[];
    styleClass?: string;
}
@Component({
  selector: 'app-puppy-details',
  standalone: true,
    imports: [
        BreadcrumbModule,
        CardModule,
        OrganizationChartModule,
        FieldsetModule,
        HeightChartComponent,
        PuppyWeightTableComponent,
        PuppyVaccinationTableComponent,
        PuppyTreatmentTableComponent,
        DatePipe,
        ImageModule,
        PuppyAgePipe
    ],
  templateUrl: './puppy-details.component.html',
  styleUrl: './puppy-details.component.scss'
})
export class PuppyDetailsComponent implements OnInit {
    puppy: Puppy;
    items: MenuItem[];
    home: MenuItem;
    pedigreeData: TreeNode[];
    growthData = {
        labels: ['2 мес', '3 мес', '4 мес', '5 мес', '6 мес', '7 мес', '8 мес'],
        datasets: [
            {
                label: 'Фактический рост (см)',
                data: [32, 38, 45, 52, 56, 58, 60],
                fill: false,
                borderColor: '#42A5F5',
                tension: 0.4
            },
            {
                label: 'Стандарт породы (см)',
                data: [30, 37, 44, 50, 55, 58, 60],
                fill: false,
                borderColor: '#FFA726',
                tension: 0.4,
                borderDash: [5, 5]
            }
        ]
    };

    constructor(
        private puppyDetailsService: PuppyDetailsService

    ) {}

    ngOnInit() {
        const puppyId = 1227; // Пример ID для теста
        this.puppyDetailsService.getPuppyDataById(puppyId).subscribe((puppyData) => {
            this.puppy = puppyData;
            // this.initializePedigree();
        });
        // this.initializePedigree();
    }

    // private initializePedigree() {
    //     this.pedigreeData = [
    //         {
    //             expanded: true,
    //             type: 'puppy',
    //             styleClass: 'puppy-node',
    //             label: this.puppy.name,
    //             data: { achievements: null },
    //             children: [
    //                 {
    //                     expanded: true,
    //                     type: 'father',
    //                     styleClass: 'father-node',
    //                     label: this.puppy.pedigree.father.name,
    //                     data: {
    //                         achievements: this.puppy.pedigree.father.achievements
    //                     }
    //                 },
    //                 {
    //                     expanded: true,
    //                     type: 'mother',
    //                     styleClass: 'mother-node',
    //                     label: this.puppy.pedigree.mother.name,
    //                     data: {
    //                         achievements: this.puppy.pedigree.mother.achievements
    //                     }
    //                 }
    //             ]
    //         }
    //     ];
    // }
}
