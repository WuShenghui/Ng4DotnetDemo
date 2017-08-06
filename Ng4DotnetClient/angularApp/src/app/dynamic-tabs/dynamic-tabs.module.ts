import { NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule, DataTableModule } from 'primeng/primeng';

import { ShareModule } from '../share/share.module';
import { DynamicTabsComponent } from './dynamic-tabs.component';
import { DynamicTabsRoutingModule } from './dynamic-tabs.routing.module';
import { HomeTabComponent } from './home-tab/home-tab.component';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    TabViewModule,
    DataTableModule,
    DynamicTabsRoutingModule
  ],
  providers: [SystemJsNgModuleLoader],
  declarations: [DynamicTabsComponent, HomeTabComponent]
})
export class DynamicTasModule { }
