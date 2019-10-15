import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosenetRoutingModule } from './posenet-routing.module';
import { PosenetComponent } from './containers/posenet/posenet.component';
import { MatButtonModule } from '@angular/material';

const IMPORTS = [CommonModule, MatButtonModule, PosenetRoutingModule];
const DECLARATIONS = [PosenetComponent];
@NgModule({
    declarations: DECLARATIONS,
    imports: IMPORTS,
})
export class PosenetModule {}
