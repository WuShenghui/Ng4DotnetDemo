import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeComponent } from './tree.component';
import { ShareModule } from '../../../share/share.module';
import { LazyLoadModule } from '../../../share/lazy-load/lazy-load.module';
import { TreeRoutingModule } from './tree.routing.module';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    TreeRoutingModule,
    LazyLoadModule.forChild({ component: TreeComponent })
  ],
  declarations: [TreeComponent],
  entryComponents: [TreeComponent]
})
export class TreeModule { }
