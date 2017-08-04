import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    RouterModule.forRoot([
      // { path: '', component: HomeComponent },
      { path: 'crud', loadChildren: './crud-demo/crud-demo.module#CrudDemoModule' },
      { path: 'canvas', loadChildren: './canvas/canvas.module#CanvasModule' },
      { path: 'dynamictabs', loadChildren: './dynamic-tabs/dynamic-tabs.module#DynamicTasModule' },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
