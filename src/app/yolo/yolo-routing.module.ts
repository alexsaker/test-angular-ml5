import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { YoloComponent } from './containers/yolo/yolo.component';

const routes: Routes = [
    {
        path: '',
        component: YoloComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class YoloRoutingModule {}
