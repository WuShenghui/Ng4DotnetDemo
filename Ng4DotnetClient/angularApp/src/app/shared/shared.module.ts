import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/primeng';

import { LazyLoadModule } from './lazy-load/lazy-load.module';
import { DynamicContainerComponent } from './lazy-load/dynamic-container.component';
import { EventAggregator } from './event-aggregator/event.aggregator';
import { UploadComponent } from './upload.component';

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule,
    LazyLoadModule
  ],
  declarations: [
    DynamicContainerComponent,
    UploadComponent
  ],
  exports: [
    DynamicContainerComponent,
    UploadComponent
  ]
})
export class ShareModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ShareModule,
            providers: [EventAggregator]
        };
    }
 }

