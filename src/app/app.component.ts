import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {AuthService} from "./services/api/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig,  private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.primengConfig.ripple = true;

        // if (!this.authService.currentUserValue) {
        //     this.router.navigate(['/auth/login']);
        // }

        this.router.navigate(['/auth/login']);
    }
}
