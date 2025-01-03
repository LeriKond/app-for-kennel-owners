import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import { LittersdemoComponent } from './littersdemo.component';
import {PuppyDetailsComponent} from "../../puppy-details/puppy-details.component";

const routes: Routes = [
    {
        path: '',
        component: LittersdemoComponent
    },
    {
        path: 'puppy',
        component: PuppyDetailsComponent,
        data: { breadcrumb: 'Щенок' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LittersdemoRoutingModule { }
