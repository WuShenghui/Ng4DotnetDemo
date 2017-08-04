import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DynamicTabsComponent } from './dynamic-tabs.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: DynamicTabsComponent },
      { 
        path: 'lazyMod', 
        loadChildren: './modules/tree/tree.module#TreeModule' }
    ])
  ],
  exports: [RouterModule]
})
export class DynamicTabsRoutingModule { }
