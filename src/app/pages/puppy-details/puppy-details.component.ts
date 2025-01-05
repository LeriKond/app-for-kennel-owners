import {Component, OnInit} from '@angular/core';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MenuItem, TreeNode} from "primeng/api";
import {Puppy} from "../../components/modals/add-puppy/add-puppy.component";
import {CardModule} from "primeng/card";
import {OrganizationChartModule} from "primeng/organizationchart";
import {FieldsetModule} from "primeng/fieldset";
import {HeightChartComponent} from "../../components/charts/height-chart/height-chart.component";
import {PuppyWeightTableComponent} from "../../components/tables/puppy-weight-table/puppy-weight-table.component";
import {PuppyVaccinationTableComponent} from "../../components/tables/puppy-vaccination-table/puppy-vaccination-table.component";
import {PuppyTreatmentTableComponent} from "../../components/tables/puppy-treatment-table/puppy-treatment-table.component";
import {DatePipe} from "@angular/common";
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
        DatePipe
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

    ngOnInit() {
        // Инициализация хлебных крошек
        // this.items = [
        //     {label: 'Питомник'},
        //     {label: 'Щенки'},
        //     {label: this.puppy?.name}
        // ];
        //
        // this.home = {icon: 'pi pi-home', routerLink: '/'};

        this.initializePuppy();
        this.initializePedigree();
    }

    private initializePuppy() {
        this.puppy = {
            name: 'Старлит шарм Голд',
            gender: 'male',
            color: 'Палевый',
            breed: 'Лабрадор ретривер',
            birthDate: '20.04.2023',
            ribbon: {
                value: 'red',
                name: 'Красная лента'
            },
            stamp: 'ABC123',
            pedigree: {
                father: {
                    name: 'ЖЕРМИНАЛЬ МИСТИ ШОУ МЭЙКЕР',
                    achievements: {
                        tests: ['HD-A', 'ED-0', 'BH/VT'],
                        shows: ['CH RUS', 'JCH RUS', 'Best in Show 2022']
                    }
                },
                mother: {
                    name: 'АХТИАР АК ЯР КАРОЛИНА',
                    achievements: {
                        tests: ['HD-B', 'ED-0', 'IGP-1'],
                        shows: ['CH RUS', 'CH RKF', 'CACIB 2023']
                    }
                }
            }
        };
    }


    private initializePedigree() {
        this.pedigreeData = [
            {
                expanded: true,
                type: 'puppy',
                styleClass: 'puppy-node',
                label: this.puppy.name,
                data: { achievements: null },
                children: [
                    {
                        expanded: true,
                        type: 'father',
                        styleClass: 'father-node',
                        label: this.puppy.pedigree.father.name,
                        data: {
                            achievements: this.puppy.pedigree.father.achievements
                        }
                    },
                    {
                        expanded: true,
                        type: 'mother',
                        styleClass: 'mother-node',
                        label: this.puppy.pedigree.mother.name,
                        data: {
                            achievements: this.puppy.pedigree.mother.achievements
                        }
                    }
                ]
            }
        ];
    }
}
