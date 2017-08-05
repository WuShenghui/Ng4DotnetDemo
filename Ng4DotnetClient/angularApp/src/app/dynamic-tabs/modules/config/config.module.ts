import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigComponent } from './config.component';
import { ShareModule } from '../../../share/share.module';
import { LazyLoadModule } from '../../../share/lazy-load/lazy-load.module';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    LazyLoadModule.forChild({ component: ConfigComponent })
  ],
  declarations: [ConfigComponent],
  entryComponents: [ConfigComponent]
})
export class ConfigModule { }
