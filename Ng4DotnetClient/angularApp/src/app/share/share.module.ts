import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyLoadModule } from './lazy-load/lazy-load.module';
import { DynamicContainerComponent } from './lazy-load/dynamic-container.component';
import { EventAggregator } from './event-aggregator/event.aggregator';

@NgModule({
  imports: [
    CommonModule,
    LazyLoadModule
  ],
  declarations: [DynamicContainerComponent],
  exports: [DynamicContainerComponent]
})
export class ShareModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ShareModule,
            providers: [EventAggregator]
        };
    }
 }

