import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LittersdemoComponent } from './littersdemo.component';
import {PuppyDetailsComponent} from "../../../../components/puppy-details/puppy-details.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LittersdemoComponent, data: { breadcrumb: 'Помет "Е"' } },
        { path: ':id', component: PuppyDetailsComponent, data: { breadcrumb: '' } }
    ])],
	exports: [RouterModule]
})
export class LittersdemoRoutingModule { }
