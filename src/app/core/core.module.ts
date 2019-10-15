import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
} from '@angular/material';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';

const COMPONENTS = [NavigationComponent];
const IMPORTS = [
    CommonModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule,
];
const EXPORTS = [...IMPORTS, ...COMPONENTS];
@NgModule({
    declarations: COMPONENTS,
    imports: IMPORTS,
    exports: EXPORTS,
})
export class CoreModule {}
