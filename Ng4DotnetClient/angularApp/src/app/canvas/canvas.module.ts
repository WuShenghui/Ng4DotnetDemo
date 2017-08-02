import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanvasComponent } from './canvas.component';
import { CanvasRoutingModule } from './canvas.routing.module';

@NgModule({
  imports: [
    CommonModule,
    CanvasRoutingModule
  ],
  declarations: [CanvasComponent]
})
export class CanvasModule { }
