import {Component, OnDestroy, OnInit} from '@angular/core';
import { ButtonModule } from "primeng/button";
import { DatePipe } from "@angular/common";
import { SharedModule } from "primeng/api";
import { TableModule } from "primeng/table";
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {AddEditTreatmentComponent} from "../../modals/add-edit-treatment/add-edit-treatment.component";
import {PuppyDetailsService} from "../../../services/puppy-details.service";

export interface Treatment {
    id?: number;
    date: Date;
    quantity: string;
    name: string;
}

@Component({
    selector: 'app-puppy-treatment-table',
    standalone: true,
    imports: [
        ButtonModule,
        DatePipe,
        SharedModule,
        TableModule,
        DialogModule,
        InputTextModule,
        CalendarModule,
        FormsModule,
        ConfirmDialogModule,
        ToastModule
    ],
    providers: [ConfirmationService, MessageService],
    templateUrl: './puppy-treatment-table.component.html',
    styleUrl: './puppy-treatment-table.component.scss'
})
export class PuppyTreatmentTableComponent implements OnInit, OnDestroy {
    treatments: Treatment[];
    ref: DynamicDialogRef | undefined;

    constructor(
        private dialogService: DialogService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private puppyDetailsService: PuppyDetailsService

) {}

    ngOnInit() {
        this.puppyDetailsService.getTreatmentData().subscribe((data) => {
            this.treatments = data;
        });
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }

    public openNew() {
        this.ref = this.dialogService.open(AddEditTreatmentComponent, {
            header: 'Новая запись',
            width: '30%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
        });

        this.ref.onClose.subscribe((treatment: Treatment) => {
            if (treatment) {
                const newId = Math.max(...this.treatments.map(t => t.id ?? 0)) + 1;
                treatment.id = newId;
                this.treatments.push(treatment);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Успешно',
                    detail: 'Запись добавлена'
                });
            }
        });
    }

    public editTreatment(treatment: Treatment) {
        this.ref = this.dialogService.open(AddEditTreatmentComponent, {
            header: 'Редактирование записи',
            width: '30%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            data: {
                treatment: treatment
            }
        });

        this.ref.onClose.subscribe((updatedTreatment: Treatment) => {
            if (updatedTreatment) {
                const index = this.treatments.findIndex(t => t.id === updatedTreatment.id);
                this.treatments[index] = updatedTreatment;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Успешно',
                    detail: 'Запись обновлена'
                });
            }
        });
    }

    public deleteTreatment(treatment: Treatment) {
        this.confirmationService.confirm({
            message: 'Вы уверены, что хотите удалить запись об обработке?',
            header: 'Подтверждение',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.treatments = this.treatments.filter(t => t.id !== treatment.id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Успешно',
                    detail: 'Запись удалена'
                });
            }
        });
    }
}
