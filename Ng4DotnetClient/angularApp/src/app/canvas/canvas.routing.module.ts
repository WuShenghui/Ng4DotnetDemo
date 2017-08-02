import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CanvasComponent } from "./canvas.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: CanvasComponent }
    ])
  ],
  exports: [RouterModule]
})
export class CanvasRoutingModule { }
