import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YoloRoutingModule } from './yolo-routing.module';
import { YoloComponent } from './containers/yolo/yolo.component';
import { MatButtonModule } from '@angular/material';

const IMPORTS = [CommonModule, MatButtonModule, YoloRoutingModule];
const DECLARATIONS = [YoloComponent];
@NgModule({
    declarations: DECLARATIONS,
    imports: IMPORTS,
})
export class YoloModule {}
