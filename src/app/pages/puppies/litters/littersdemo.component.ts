import { Component, OnInit } from '@angular/core';
import { AddPuppyComponent, Puppy, PuppyStatus } from "../../../components/modals/add-puppy/add-puppy.component";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { Router, ActivatedRoute } from "@angular/router";
import { PuppiesService } from "../../../services/puppies.service";
import { MenuItem } from "primeng/api";
import {LitterExportService} from "../../../services/litterexport.service";


@Component({
    templateUrl: './littersdemo.component.html'
})
export class LittersdemoComponent implements OnInit {
    litter: any = {
        puppies: [
            { name: 'Puppy 1', gender: 'male', color: 'Balck', tagNumber: '12345' },
            { name: 'Puppy 2', gender: 'female', color: 'White', tagNumber: '12346' },
        ],
        totalPuppies: 2,
        totalMales: 1,
        totalFemales: 1,
        parents: 'Кобель: Папа, Сука: Мама',
        birthDate: '2023-12-01',
        owner: 'Иван Иванов',
    };
    puppies: Puppy[];
    ref: DynamicDialogRef | undefined;
    puppyMenu: MenuItem[] = [
        {
            label: 'Изменить',
            icon: 'pi pi-pencil',
            command: () => this.editPuppy()
        },
        {
            label: 'Удалить',
            icon: 'pi pi-trash',
            command: () => this.deletePuppy()
        },
        {
            label: 'Изменить статус',
            icon: 'pi pi-refresh',
            command: () => this.changePuppyStatus()
        }
    ];

    constructor(
        private dialogService: DialogService,
        private router: Router,
        private route: ActivatedRoute,
        private puppyService: PuppiesService,
        private litterExportService: LitterExportService
    ) {}


    ngOnInit() {
        this.puppyService.getPuppiesByLitter().subscribe((puppies) => {
            this.puppies = puppies;
        });
    }

    public showAddPuppyDialog() {
        this.ref = this.dialogService.open(AddPuppyComponent, {
            header: 'Добавление щенка',
            width: '50%'
        });

        this.ref.onClose.subscribe((puppy: Puppy) => {
            if (puppy) {
                this.puppies.push(puppy);
                // Здесь можно добавить вызов сервиса для сохранения данных
            }
        });
    }

    public showPuppyDetails(puppy: Puppy, event?: Event) {
        this.router.navigate(['/litters/puppy']);
    }

    public getChipStyleClass(status: PuppyStatus): string {
        const statusClassMap: {[key in PuppyStatus]: string} = {
            'Продан': 'bg-red-100 text-red-700',
            'Продается': 'bg-green-100 text-green-700',
            'В питомнике': 'bg-blue-100 text-blue-700',
            'Резерв': 'bg-blue-100 text-blue-700'
        };

        return statusClassMap[status];
    }

    private editPuppy(){

    }

    private deletePuppy(){

    }

    private changePuppyStatus(){

    }

    public toggleMenu(menu: any, event: Event): void {
        event.stopPropagation(); // Останавливаем всплытие события
        menu.toggle(event);      // Открываем/закрываем меню
    }

    // downloadPDF() {
    //     this.litterExportService.generatePDF(this.litter);
    // }

    downloadDocx() {
        this.litterExportService.generateDocx(this.litter);
    }

}
