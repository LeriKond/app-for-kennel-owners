import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {DogsPageComponent} from "./dogs-page.component";

@NgModule({
    declarations: [DogsPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: DogsPageComponent}]),
        FormsModule,
        PasswordModule,
        ButtonModule,
        // Главный маршрут
    ],
})
export class DogsModule {}
