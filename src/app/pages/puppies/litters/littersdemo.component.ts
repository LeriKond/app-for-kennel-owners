import { Component, OnInit } from '@angular/core';
import { AddPuppyComponent, Puppy, PuppyStatus } from "../../../components/modals/add-puppy/add-puppy.component";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { Router, ActivatedRoute } from "@angular/router";
import { PuppiesService } from "../../../services/puppies.service";


@Component({
    templateUrl: './littersdemo.component.html'
})
export class LittersdemoComponent implements OnInit {
    puppies: Puppy[];
    ref: DynamicDialogRef | undefined;

    constructor(private dialogService: DialogService, private router: Router, private route: ActivatedRoute, private puppyService: PuppiesService) {}


    ngOnInit() {
        this.puppyService.getPuppiesByLitter().then(data => this.puppies = data);
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

    public showPuppyDetails(puppy: Puppy) {
        this.router.navigate(['/litters/puppy']);
    }

    public getChipStyleClass(status: PuppyStatus): string {
        const statusClassMap: {[key in PuppyStatus]: string} = {
            'Продан': 'bg-red-100 text-red-700',
            'Продается': 'bg-green-100 text-green-700',
            'В питомнике': 'bg-blue-100 text-blue-700'
        };

        return statusClassMap[status];
    }

}
