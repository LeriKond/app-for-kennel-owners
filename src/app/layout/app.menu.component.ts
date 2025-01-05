import { Component, OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { DialogService } from "primeng/dynamicdialog";
import { AddLitterComponent } from "../components/modals/add-litter.component/add-litter.component";
import { MenuService } from './service/menu.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(
        public layoutService: LayoutService,
        private dialogService: DialogService,
        private menuService: MenuService
    ) { }

    ngOnInit() {
        // Подписываемся на обновления меню
        this.menuService.menuItems$.subscribe(menu => {
            if (menu.length > 0) {
                this.model = menu;
                // Добавляем действие для кнопки добавления помета
                const litterMenu = this.model.find(item => item.label === 'Пометы');
                if (litterMenu) {
                    litterMenu.addButtonAction = () => this.showAddLitterDialog();
                }
            }
        });

        // Загружаем меню, если оно еще не загружено
        if (this.model.length === 0) {
            this.menuService.loadMenu();
        }
    }

    showAddLitterDialog() {
        const ref = this.dialogService.open(AddLitterComponent, {
            header: 'Новый помет',
            width: '70%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            closable: true  // Предотвращаем закрытие по клику вне модального окна
        });

        ref.onClose.subscribe((litter) => {
            if (litter) {
                this.menuService.addLitter(litter);
            }
        });
    }
}
