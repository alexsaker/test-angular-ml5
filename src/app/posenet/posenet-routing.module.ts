import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PosenetComponent } from './containers/posenet/posenet.component';

const routes: Routes = [
    {
        path: '',
        component: PosenetComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PosenetRoutingModule {}
