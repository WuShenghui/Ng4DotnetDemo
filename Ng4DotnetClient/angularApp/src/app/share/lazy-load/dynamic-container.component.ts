import {
  Component,
  ViewChild,
  OnDestroy,
  Input,
  ViewContainerRef,
  NgModuleFactory,
  ComponentRef,
  SystemJsNgModuleLoader
} from '@angular/core';

import { LazyLoadConfig } from './lazy-load.module';

@Component({
  selector: 'app-dynamic-container',
  template: `
    <ng-template #container></ng-template>
    <div *ngIf="!loaded" class="loader"></div>
  `,
  styles: [`
    .loader {
      position: relative;
      min-height: 100px;
    }

    .loader:after {
      content: 'Loading module. Please waiting...';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `]
})
export class DynamicContainerComponent implements OnDestroy {
  @ViewChild('container', { read: ViewContainerRef }) vcRef: ViewContainerRef;
  loaded: boolean;

  constructor(private moduleLoader: SystemJsNgModuleLoader) { }

  compRef: ComponentRef<any>;

  @Input() modulePath: string;
  @Input() moduleName: string;

  _inited: boolean
  set inited(val: boolean) {
    if (val) {
      this.loadComponent();
    }
    this._inited = val;
  };

  get inited() {
    return this._inited;
  }

  loadComponent() {
    this.moduleLoader.load(`${this.modulePath}#${this.moduleName}`)
      .then((moduleFactory: NgModuleFactory<any>) => {
        const vcRef = this.vcRef;
        const ngModuleRef = moduleFactory.create(vcRef.parentInjector);
        const comp = ngModuleRef.injector.get(LazyLoadConfig).component;
        const compFactory = ngModuleRef.componentFactoryResolver.resolveComponentFactory(comp);
        this.compRef = vcRef.createComponent(compFactory, 0, ngModuleRef.injector);

        this.loaded = true;
      });
  }

  ngOnDestroy() {
    if (this.compRef) {
      this.compRef.destroy();
    }
  }
}
