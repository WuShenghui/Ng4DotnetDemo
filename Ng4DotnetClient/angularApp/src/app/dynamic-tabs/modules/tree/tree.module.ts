import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeComponent } from './tree.component';
import { LazyLoadModule } from '../../laza-load/lazy-load.module';

@NgModule({
  imports: [
    CommonModule,
    LazyLoadModule.forChild({ component: TreeComponent })
  ],
  declarations: [TreeComponent],
  entryComponents: [TreeComponent]
})
export class TreeModule { }
