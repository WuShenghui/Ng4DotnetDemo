import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from '../share/share.module';
import { CanvasComponent } from './canvas.component';
import { CanvasRoutingModule } from './canvas.routing.module';
import { LazyLoadModule } from '../share/lazy-load/lazy-load.module';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    CanvasRoutingModule,
    LazyLoadModule.forChild({ component: CanvasComponent })
  ],
  declarations: [CanvasComponent]
})
export class CanvasModule { }
