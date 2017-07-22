import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    RouterModule.forRoot([
      // { path: '', component: HomeComponent },
      { path: 'crud', loadChildren: './crud-demo/crud-demo.module#CrudDemoModule' },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
