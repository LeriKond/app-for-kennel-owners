import { Component } from '@angular/core';
import {AddPuppyComponent, Puppy} from "../../../../components/modals/add-puppy/add-puppy.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {Router} from "@angular/router";

@Component({
    templateUrl: './littersdemo.component.html'
})
export class LittersdemoComponent {
    puppies: Puppy[] = [
        { name: 'СТАРЛИТ ШАРМ ЕРЕМЕЙ', gender: 'male', ribbon: 'голубая лента' },
        { name: 'СТАРЛИТ ШАРМ ЕРЕМЕЙ', gender: 'male', ribbon: 'голубая лента' },
        { name: 'СТАРЛИТ ШАРМ ЕРЕМЕЙ', gender: 'male', ribbon: 'голубая лента' },
        { name: 'СТАРЛИТ ШАРМ ЕРЕМЕЙ', gender: 'male', ribbon: 'голубая лента' },
    ];
    ref: DynamicDialogRef | undefined;

    constructor(private dialogService: DialogService, private router: Router) {}

    showAddPuppyDialog() {
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

    showPuppyDetails(puppy: Puppy) {
        // Используем ID щенка в URL и передаем данные через state
        this.router.navigate(['/uikit/litterE', puppy.name], {
            state: { puppy }
        });
    }
}
