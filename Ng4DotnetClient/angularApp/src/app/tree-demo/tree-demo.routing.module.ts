import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TreeDemoComponent } from './tree-demo.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: TreeDemoComponent },
      { path: 'index', component: TreeDemoComponent },
    ])
  ],
  exports: [RouterModule]
})
export class TreeDemoRoutingModule { }
