import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { PosenetModule } from './posenet/posenet.module';
import { YoloModule } from './yolo/yolo.module';

const routes: Routes = [
    { path: 'posenet', loadChildren: './posenet/posenet.module#PosenetModule' },
    { path: 'yolo', loadChildren: './yolo/yolo.module#YoloModule' },
    { path: '', redirectTo: '/posenet', pathMatch: 'full' },
    // { path: '**', component: PageNotFoundComponent }];
];
@NgModule({
    imports: [
        CoreModule,
        PosenetModule,
        YoloModule,
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
