import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {CheckboxModule} from "primeng/checkbox";
import {PasswordModule} from "primeng/password";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path: 'login', component: LoginComponent},
        ]),
        CheckboxModule,
        PasswordModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        RippleModule,
    ],
    declarations: [LoginComponent]
})
export class AuthModule { }
