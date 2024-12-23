import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../demo/service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate() {
        const currentUser = this.authService.currentUserValue;
        if (!currentUser) {
            return true;
        }

        this.router.navigate(['/']);
        return false;
    }
}
