import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AccordionModule } from 'primeng/components/accordion/accordion';
import { MenuItem } from 'primeng/components/common/api';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { AppConfig } from './app.config';
import { ShareModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AccordionModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ShareModule.forRoot()
  ],
  providers: [AppConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
