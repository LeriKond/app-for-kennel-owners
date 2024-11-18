import {Component, OnInit} from '@angular/core';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MenuItem} from "primeng/api";
import {Puppy} from "../modals/add-puppy/add-puppy.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-puppy-details',
  standalone: true,
    imports: [
        BreadcrumbModule
    ],
  templateUrl: './puppy-details.component.html',
  styleUrl: './puppy-details.component.scss'
})
export class PuppyDetailsComponent implements OnInit {
    items: MenuItem[] = [];
    home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
    puppy: Puppy | undefined;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        // Получение данных щенка из route state
        const navigation = window.history.state;
        if (navigation.puppy) {
            this.puppy = navigation.puppy;

            // Настройка breadcrumbs с учетом существующей структуры
            this.items = [
                { label: 'UI Kit', routerLink: '/uikit' },
                { label: 'Помет "Е"', routerLink: '/uikit/litterE' },
                { label: this.puppy.name }
            ];
        }
    }
}
