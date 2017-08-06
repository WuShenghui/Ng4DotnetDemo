import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DynamicTabsComponent } from './dynamic-tabs.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: DynamicTabsComponent },
      {
        path: '/dynamictabs/:newTab',
        children: [
          { path: '', redirectTo: '', component: DynamicTabsComponent }]
      }
    ])
  ],
  exports: [RouterModule]
})
export class DynamicTabsRoutingModule { }
