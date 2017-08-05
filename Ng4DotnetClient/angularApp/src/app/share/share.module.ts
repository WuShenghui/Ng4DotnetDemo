import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyLoadModule } from './lazy-load/lazy-load.module';
import { DynamicContainerComponent } from './lazy-load/dynamic-container.component';

@NgModule({
  imports: [
    CommonModule,
    LazyLoadModule
  ],
  declarations: [DynamicContainerComponent],
  exports: [DynamicContainerComponent]
})
export class ShareModule { }
