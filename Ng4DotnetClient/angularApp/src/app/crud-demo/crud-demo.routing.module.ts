import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: ListComponent },
      { path: 'list', component: ListComponent },
      { path: 'form/:id', component: FormComponent },
    ])
  ],
  exports: [RouterModule]
})
export class CrudRoutingModule { }
