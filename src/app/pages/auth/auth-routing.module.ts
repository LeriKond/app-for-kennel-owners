import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'error', loadChildren: () => import('../../demo/components/auth/error/error.module').then(m => m.ErrorModule) },
        { path: 'access', loadChildren: () => import('../../demo/components/auth/access/access.module').then(m => m.AccessModule) },
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: '**', redirectTo: '' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
