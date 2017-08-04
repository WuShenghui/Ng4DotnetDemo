import { NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/primeng';

import { DynamicContainerComponent } from './dynamic-container.component';
import { DynamicTabsComponent } from './dynamic-tabs.component';
import { DynamicTabsRoutingModule } from './dynamic-tabs.routing.module';
import { HomeTabComponent } from './home-tab/home-tab.component';

@NgModule({
  imports: [
    CommonModule,
    TabViewModule,
    DynamicTabsRoutingModule
  ],
  providers: [SystemJsNgModuleLoader],
  declarations: [DynamicContainerComponent, DynamicTabsComponent, HomeTabComponent]
})
export class DynamicTasModule { }
