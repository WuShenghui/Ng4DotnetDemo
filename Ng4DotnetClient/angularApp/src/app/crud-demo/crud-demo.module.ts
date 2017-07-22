import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { CrudRoutingModule } from './crud-demo.routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    CrudRoutingModule
  ],
  declarations: [ListComponent]
})
export class CrudDemoModule { }
