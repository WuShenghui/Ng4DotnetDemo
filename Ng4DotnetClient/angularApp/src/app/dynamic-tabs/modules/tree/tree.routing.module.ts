import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TreeComponent } from './tree.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: TreeComponent }
    ])
  ],
  exports: [RouterModule]
})
export class TreeRoutingModule { }
