import { Component } from '@angular/core';
import {AddPuppyComponent, Puppy, PuppyStatus} from "../../../components/modals/add-puppy/add-puppy.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {Router, ActivatedRoute } from "@angular/router";


@Component({
    templateUrl: './littersdemo.component.html'
})
export class LittersdemoComponent {
    puppies: Puppy[] = [
        {
            name: 'Старлит Шарм Аванти',
            gender: 'female',
            ribbon: {
                value: 'red',
                name: 'Красная лента'
            },
            stamp: 'КЧФХ-123456',
            color: 'Черный с подпалым',
            status: 'Продан'
        },
        {
            name: 'Старлит Шарм Бриллиант',
            gender: 'male',
            ribbon: {
                value: 'blue',
                name: 'Голубая лента'
            },
            stamp: 'КЧФХ-789012',
            color: 'Коричневый',
            status: 'Продается'
        },
        {
            name: 'Старлит Шарм Вектор',
            gender: 'male',
            ribbon: {
                value: 'green',
                name: 'Зеленая лента'
            },
            stamp: 'КЧФХ-345678',
            color: 'Серый',
            status: 'Продан'
        },
        {
            name: 'Старлит Шарм Гордость',
            gender: 'female',
            ribbon: {
                value: 'yellow',
                name: 'Желтая лента'
            },
            stamp: 'КЧФХ-901234',
            color: 'Белый с черными пятнами',
            status: 'В питомнике'
        },
        {
            name: 'Старлит Шарм Дарина',
            gender: 'female',
            ribbon: {
                value: 'purple',
                name: 'Фиолетовая лента'
            },
            stamp: 'КЧФХ-567890',
            color: 'Коричневый с белым',
            status: 'Продается'
        }
    ];
    ref: DynamicDialogRef | undefined;

    constructor(private dialogService: DialogService, private router: Router, private route: ActivatedRoute) {}


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
        this.router.navigate(['litters', 'puppy', puppy.name], {
            state: { puppy }
        });
    }

    getChipStyleClass(status: PuppyStatus): string {
        const statusClassMap: {[key in PuppyStatus]: string} = {
            'Продан': 'bg-red-100 text-red-700',
            'Продается': 'bg-green-100 text-green-700',
            'В питомнике': 'bg-blue-100 text-blue-700'
        };

        return statusClassMap[status];
    }

}
