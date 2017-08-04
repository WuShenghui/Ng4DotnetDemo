import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigComponent } from './config.component';
import { LazyLoadModule } from '../../laza-load/lazy-load.module';

@NgModule({
  imports: [
    CommonModule,
    LazyLoadModule.forChild({ component: ConfigComponent })
  ],
  declarations: [ConfigComponent],
  entryComponents: [ConfigComponent]
})
export class ConfigModule { }
