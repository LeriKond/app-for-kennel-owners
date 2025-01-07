import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class mainMenuService {
    private readonly MENU_KEY = 'app_menu';
    private menuItems = new BehaviorSubject<any[]>([]);
    menuItems$ = this.menuItems.asObservable();

    constructor(private http: HttpClient) {
        // Пробуем получить меню из localStorage при инициализации
        const savedMenu = localStorage.getItem(this.MENU_KEY);
        if (savedMenu) {
            this.menuItems.next(JSON.parse(savedMenu));
        }
    }

    loadMenu() {
        this.http.get<any[]>('assets/demo/data/menu.json').subscribe(menu => {
            this.updateMenu(menu);
        });
    }

    updateMenu(menu: any[]) {
        localStorage.setItem(this.MENU_KEY, JSON.stringify(menu));
        this.menuItems.next(menu);
    }

    addLitter(newLitter: any) {
        const currentMenu = this.menuItems.getValue();
        const litterIndex = currentMenu.findIndex(item => item.label === 'Пометы');

        if (litterIndex !== -1) {
            const updatedMenu = [...currentMenu];
            updatedMenu[litterIndex] = {
                ...updatedMenu[litterIndex],
                items: [
                    ...updatedMenu[litterIndex].items,
                    {
                        label: `Помет "${newLitter.letter}"`,
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/litters']
                    }
                ]
            };

            this.updateMenu(updatedMenu);
        }
    }

    editLitter(litterId: number, updatedData: any) {
        const currentMenu = this.menuItems.getValue();
        const litterIndex = currentMenu.findIndex(item => item.label === 'Пометы');

        if (litterIndex !== -1) {
            const updatedMenu = [...currentMenu];
            const litterItems = updatedMenu[litterIndex].items.map(item =>
                item.id === litterId ? {
                    ...item,
                    label: `Помет "${updatedData.letter}"`,
                    alias: updatedData.letter,
                    ...updatedData
                } : item
            );

            updatedMenu[litterIndex] = {
                ...updatedMenu[litterIndex],
                items: litterItems
            };

            this.updateMenu(updatedMenu);
        }
    }

    deleteLitter(litterId: number) {
        const currentMenu = this.menuItems.getValue();
        const litterIndex = currentMenu.findIndex(item => item.label === 'Пометы');

        if (litterIndex !== -1) {
            const updatedMenu = [...currentMenu];
            const litterItems = updatedMenu[litterIndex].items.filter(item => item.id !== litterId);

            updatedMenu[litterIndex] = {
                ...updatedMenu[litterIndex],
                items: litterItems
            };

            this.updateMenu(updatedMenu);
        }
    }


    private updateLitterItems(items: any[]) {
        const currentMenu = this.menuItems.getValue();
        const updatedMenu = currentMenu.map(item =>
            item.label === 'Пометы' ? { ...item, items } : item
        );
        this.updateMenu(updatedMenu);
    }
}
