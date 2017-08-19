import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule, DropdownModule } from 'primeng/primeng';

import { ShareModule } from '../shared/shared.module';
import { CanvasComponent } from './canvas.component';
import { CanvasRoutingModule } from './canvas.routing.module';
import { LazyLoadModule } from '../shared/lazy-load/lazy-load.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    ColorPickerModule,
    ShareModule,
    CanvasRoutingModule,
    LazyLoadModule.forChild({ component: CanvasComponent })
  ],
  declarations: [CanvasComponent]
})
export class CanvasModule { }
