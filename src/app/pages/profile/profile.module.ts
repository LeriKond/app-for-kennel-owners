import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfilePageComponent} from './profile-page.component';
import {FormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";

@NgModule({
    declarations: [ProfilePageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: ProfilePageComponent}]),
        FormsModule,
        PasswordModule,
        ButtonModule,
        // Главный маршрут
    ],
})
export class ProfileModule {}
