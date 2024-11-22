import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'litterE', data: { breadcrumb: 'Помет "Е"' }, loadChildren: () => import('./litters/littersdemo.module').then(m => m.LittersDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class UIkitRoutingModule { }
