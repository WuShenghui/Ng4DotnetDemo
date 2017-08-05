import { NgModule, ModuleWithProviders, Type } from '@angular/core';

export class LazyLoadConfig {
  constructor(public component: Type<any>) { }
}

@NgModule({})
export class LazyLoadModule {
  public static forChild(config: LazyLoadConfig): ModuleWithProviders {
    return {
      ngModule: LazyLoadModule,
      providers: [{ provide: LazyLoadConfig, useValue: config }]
    };
  }
}
