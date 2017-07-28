import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  PanelModule,
  ToolbarModule,
  DataTableModule,
  PaginatorModule,
  InputTextModule,
  ButtonModule,
  CheckboxModule,
  RadioButtonModule,
  CalendarModule,
  ConfirmDialogModule,
  ConfirmationService
} from 'primeng/primeng';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';

import { CoreModule } from '../core/core.module';
import { CrudRoutingModule } from './crud-demo.routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { CrudService } from './crud.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PanelModule,
    ToolbarModule,
    DataTableModule,
    PaginatorModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    CalendarModule,
    CoreModule,
    CrudRoutingModule,
    ConfirmDialogModule
  ],
  declarations: [ListComponent, FormComponent],
  providers: [CrudService, ConfirmationService]
})
export class CrudDemoModule { }
