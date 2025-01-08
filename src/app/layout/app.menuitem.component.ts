import {ChangeDetectorRef, Component, Host, HostBinding, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuService } from './app.menu.service';
import { LayoutService } from './service/app.layout.service';
import { MenuItem } from 'primeng/api';
import { mainMenuService } from './service/menu.service';
import { ContextMenu } from 'primeng/contextmenu';

@Component({
    selector: '[app-menuitem]',
    template: `
        <ng-container>
            <div *ngIf="root && item.visible !== false" class="layout-menuitem-root-text">
                {{item.label}}
                <button *ngIf="item.showAddButton"
                        pButton
                        icon="pi pi-plus"
                        class="p-button-rounded p-button-text p-button-sm ml-2"
                        (click)="onAddButtonClick($event)">
                </button>
            </div>
            <a *ngIf="(!item.routerLink || item.items) && item.visible !== false"
               [attr.href]="item.url"
               (click)="itemClick($event)"
               [ngClass]="item.class"
               [attr.target]="item.target"
               tabindex="0"
               pRipple>
                <i [ngClass]="item.icon" class="layout-menuitem-icon"></i>
                <span class="layout-menuitem-text">{{item.label}}</span>
                <i class="pi pi-fw pi-angle-down layout-submenu-toggler" *ngIf="item.items"></i>
            </a>
            <a *ngIf="(item.routerLink && !item.items) && item.visible !== false"
               (click)="itemClick($event)"
               (contextmenu)="onContextMenu($event)"
               [ngClass]="item.class"
               [routerLink]="item.routerLink"
               routerLinkActive="active-route"
               [routerLinkActiveOptions]="item.routerLinkActiveOptions||{ paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }"
               [fragment]="item.fragment"
               [queryParamsHandling]="item.queryParamsHandling"
               [preserveFragment]="item.preserveFragment"
               [skipLocationChange]="item.skipLocationChange"
               [replaceUrl]="item.replaceUrl"
               [state]="item.state"
               [queryParams]="item.queryParams"
               [attr.target]="item.target"
               tabindex="0"
               pRipple>
                <i [ngClass]="item.icon" class="layout-menuitem-icon"></i>
                <span class="layout-menuitem-text">{{item.label}}</span>
                <i class="pi pi-fw pi-angle-down layout-submenu-toggler" *ngIf="item.items"></i>
            </a>

            <ul *ngIf="item.items && item.visible !== false" [@children]="submenuAnimation">
                <ng-template ngFor let-child let-i="index" [ngForOf]="item.items">
                    <li app-menuitem [item]="child" [index]="i" [parentKey]="key" [class]="child.badgeClass"></li>
                </ng-template>
            </ul>

            <p-contextMenu #cm [model]="contextMenuItems" [appendTo]="'body'"></p-contextMenu>
        </ng-container>
    `,
    animations: [
        trigger('children', [
            state('collapsed', style({
                height: '0'
            })),
            state('expanded', style({
                height: '*'
            })),
            transition('collapsed <=> expanded', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ],
    styleUrls: ['./app.menuitem.component.scss']
})
export class AppMenuitemComponent implements OnInit, OnDestroy {
    @ViewChild('cm') cm!: ContextMenu;

    @Input() item: any;

    @Input() index!: number;

    @Input() @HostBinding('class.layout-root-menuitem') root!: boolean;

    @Input() parentKey!: string;

    active = false;

    menuSourceSubscription: Subscription;

    menuResetSubscription: Subscription;

    key: string = "";

    contextMenuItems: MenuItem[] = [];

    constructor(
        public layoutService: LayoutService,
        private cd: ChangeDetectorRef,
        public router: Router,
        private menuService: MenuService,
        private menuItemService: mainMenuService
    ) {
        this.menuSourceSubscription = this.menuService.menuSource$.subscribe(value => {
            Promise.resolve(null).then(() => {
                if (value.routeEvent) {
                    this.active = (value.key === this.key || value.key.startsWith(this.key + '-'));
                } else {
                    if (value.key !== this.key && !value.key.startsWith(this.key + '-')) {
                        this.active = false;
                    }
                }
            });
        });

        this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
            this.active = false;
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                if (this.item.routerLink) {
                    this.updateActiveStateFromRoute();
                }
            });
    }

    ngOnInit() {
        this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);

        if (this.isLitterItem()) {
            this.initializeContextMenu();
        }

        if (this.item.routerLink) {
            this.updateActiveStateFromRoute();
        }
    }

    updateActiveStateFromRoute() {
        const activeRoute = this.router.isActive(this.item.routerLink[0], {
            paths: 'exact',
            queryParams: 'ignored',
            matrixParams: 'ignored',
            fragment: 'ignored'
        });

        if (activeRoute) {
            this.menuService.onMenuStateChange({ key: this.key, routeEvent: true });
        }
    }

    itemClick(event: Event) {
        if (this.item.disabled) {
            event.preventDefault();
            return;
        }

        if (this.item.command) {
            this.item.command({ originalEvent: event, item: this.item });
        }

        if (this.item.items) {
            this.active = !this.active;
        }

        this.menuService.onMenuStateChange({ key: this.key });
    }

    onAddButtonClick(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.item.addButtonAction) {
            this.item.addButtonAction();
        }
    }

    isLitterItem(): boolean {
        return this.item.label && this.item.label.startsWith('Помет');
    }

    onContextMenu(event: MouseEvent) {
        if (this.isLitterItem()) {
            event.preventDefault();
            event.stopPropagation();

            if (this.cm) {
                this.cm.show(event);
            }
        }
    }

    initializeContextMenu() {
        this.contextMenuItems = [
            {
                label: 'Редактировать',
                icon: 'pi pi-pencil',
                command: () => this.editLitter()
            },
            {
                label: 'Удалить',
                icon: 'pi pi-trash',
                command: () => this.deleteLitter()
            }
        ];
    }

    editLitter() {
        if (this.item.id) {
            // Here you would typically open a dialog or navigate to edit form
            console.log('Editing litter:', this.item.id);
            // Example of editing a litter
            const updatedData = {
                letter: this.item.alias,
                // other updated fields
            };
            this.menuItemService.editLitter(this.item.id, updatedData);
        }
    }

    deleteLitter() {
        if (this.item.id) {
            // Here you might want to add a confirmation dialog
            console.log('Deleting litter:', this.item.id);
            this.menuItemService.deleteLitter(this.item.id);
        }
    }

    get submenuAnimation() {
        return this.root ? 'expanded' : (this.active ? 'expanded' : 'collapsed');
    }

    @HostBinding('class.active-menuitem')
    get activeClass() {
        return this.active && !this.root;
    }

    ngOnDestroy() {
        if (this.menuSourceSubscription) {
            this.menuSourceSubscription.unsubscribe();
        }

        if (this.menuResetSubscription) {
            this.menuResetSubscription.unsubscribe();
        }
    }
}
