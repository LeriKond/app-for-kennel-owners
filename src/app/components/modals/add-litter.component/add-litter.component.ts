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
    litterForm: FormGroup;
    males: any[] = []; // Populate with male dogs
    females: any[] = []; // Populate with female dogs

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

    close() {
        this.ref.close();
    }

    save() {
        this.ref.close();
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
}
