import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { AddEditVaccinationComponent } from "../../modals/add-edit-vaccination/add-edit-vaccination.component";
import {PuppyDetailsService} from "../../../services/puppy-details.service";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-puppy-vaccination-table',
  standalone: true,
    imports: [
        DatePipe,
        SharedModule,
        TableModule,
        ButtonModule,
        ConfirmDialogModule,
        ToastModule
    ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './puppy-vaccination-table.component.html',
  styleUrl: './puppy-vaccination-table.component.scss'
})
export class PuppyVaccinationTableComponent implements OnInit {
    vaccinations;
    ref: DynamicDialogRef | undefined;
    private messageService: any;

    constructor(private dialogService: DialogService, private puppyDetailsService: PuppyDetailsService, private confirmationService: ConfirmationService) {}

    ngOnInit() {
        this.puppyDetailsService.getVaccinityData().subscribe((data) => {
            this.vaccinations = data;
        });
    }

    public openDialog() {
        this.ref = this.dialogService.open(AddEditVaccinationComponent, {
            header: 'Добавление записи о вакцинации',
            width: '50%'
        });

        this.ref.onClose.subscribe((vaccination) => {
            if (vaccination) {}
        });
    }

    public editNote(vaccination: any) {
        this.ref = this.dialogService.open(AddEditVaccinationComponent, {
            header: 'Редактирование записи',
            width: '50%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            data: {
                vaccination: vaccination
            }
        });

        this.ref.onClose.subscribe((updatedVacctionation: any) => {
            if (updatedVacctionation) {
                const index = this.vaccinations.findIndex(t => t.id === updatedVacctionation.id);
                this.vaccinations[index] = updatedVacctionation;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Успешно',
                    detail: 'Запись обновлена'
                });
            }
        });
    }

    public deleteNote(vaccination: any) {
        this.confirmationService.confirm({
            message: 'Вы уверены, что хотите удалить запись об обработке?',
            header: 'Подтверждение',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.vaccinations = this.vaccinations.filter(t => t.id !== vaccination.id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Успешно',
                    detail: 'Запись удалена'
                });
            }
        });
    }

}
