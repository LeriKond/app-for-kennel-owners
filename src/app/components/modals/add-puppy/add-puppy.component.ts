import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {PedigreeNode} from "../../puppy-details/puppy-details.component";

export interface Ribbon {
    value: string;
    name: string;
    color?: string;
}

export interface Puppy {
    name: string;
    color: string;
    gender: 'male' | 'female';
    ribbon: Ribbon;
    stamp: string;
    pedigree?: {
        father: PedigreeNode;
        mother: PedigreeNode;
    },
    status?: PuppyStatus;
    specialMarks?: string;
    breed?: string;
    birthDate?: string;
}

export type PuppyStatus = 'Продан' | 'Продается' | 'В питомнике';
@Component({
  selector: 'app-add-litter',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        CalendarModule,
        DropdownModule,
        InputTextModule
    ],
  templateUrl: './add-puppy.component.html',
  styleUrls: ['./add-puppy.component.scss']
})
export class AddPuppyComponent {
    puppyForm: FormGroup;

    genderOptions = [
        { label: 'Мужской ♂', value: 'male' },
        { label: 'Женский ♀', value: 'female' }
    ];

    ribbonOptions = [
        { label: 'Голубая', value: 'blue' },
        { label: 'Фиолетовая', value: 'purple' },
        { label: 'Розовая', value: 'pink' },
        { label: 'Черная', value: 'black' },
        { label: 'Желтая', value: 'yellow' },
        { label: 'Красная', value: 'red' },
        { label: 'Зелена', value: 'green' },
        { label: 'Салатовая', value: 'light-green' },
        { label: 'Синяя', value: 'blue' },
        { label: 'Белая', value: 'white' },
        { label: 'Бежевая', value: 'beige' },
        { label: 'Коричневая', value: 'brown' },
    ];

    constructor(
        private fb: FormBuilder,
        public ref: DynamicDialogRef
    ) {
        this.puppyForm = this.fb.group({
            name: ['', Validators.required],
            gender: ['', Validators.required],
            ribbon: ['', Validators.required],
            // birthDate: [null, Validators.required],
            // weight: [null, [Validators.required, Validators.min(0)]]
        });
    }

    close() {
        this.ref.close();
    }

    save() {
        if (this.puppyForm.valid) {
            this.ref.close(this.puppyForm.value);
        }
    }
}
