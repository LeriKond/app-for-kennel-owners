import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";


@Component({
  selector: 'app-add-litter',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        CalendarModule,
        DropdownModule,
        InputTextModule
    ],
  templateUrl: './add-litter.component.html',
  styleUrls: ['./add-litter.component.scss']
})
export class AddLitterComponent {
    letter: string = '';
    litterForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        public ref: DynamicDialogRef,
        // private litterService: LitterService
    ) {
        this.litterForm = this.fb.group({
            litterCode: ['', Validators.required],
            birthDate: [null, Validators.required],
            father: [null, Validators.required],
            mother: [null, Validators.required]
        });
    }

    close(event: Event) {
        event.preventDefault();
        this.ref.close();
    }

    save(event: Event) {
        event.preventDefault();
            this.ref.close({ letter: this.letter });
        // if (this.litterForm.valid) {
        //     const newLitter: Litter = this.litterForm.value;
        //     this.litterService.createLitter(newLitter)
        //         .subscribe(
        //             (savedLitter) => {
        //                 this.ref.close(savedLitter);
        //             },
        //             (error) => {
        //                 console.error('Error creating litter:', error);
        //                 // Handle error
        //             }
        //         );
        // }
    }

    onSubmit(event: Event) {
        event.preventDefault();
        if (this.letter) {
            this.ref.close({ letter: this.letter });
        }
    }
}
