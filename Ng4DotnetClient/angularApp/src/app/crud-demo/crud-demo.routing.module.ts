import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: ListComponent },
      { path: 'list', component: ListComponent },
    ])
  ],
  exports: [RouterModule]
})
export class CrudRoutingModule { }
