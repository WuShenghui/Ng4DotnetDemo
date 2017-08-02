import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    RouterModule.forRoot([
      // { path: '', component: HomeComponent },
      { path: 'crud', loadChildren: './crud-demo/crud-demo.module#CrudDemoModule' },
      { path: 'canvas', loadChildren: './canvas/canvas.module#CanvasModule' },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
