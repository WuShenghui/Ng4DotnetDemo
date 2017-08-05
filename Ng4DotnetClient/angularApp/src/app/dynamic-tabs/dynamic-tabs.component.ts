import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MenuItem, TabPanel } from 'primeng/primeng';
import { DynamicContainerComponent } from '../share/lazy-load/dynamic-container.component';

class DynamicTab extends TabPanel {
  modulePath: string;
  moduleName: string;
}

@Component({
  selector: 'app-dynamic-tabs',
  templateUrl: './dynamic-tabs.component.html',
  styleUrls: ['./dynamic-tabs.component.css']
})
export class DynamicTabsComponent implements OnInit {
  tabs: DynamicTab[];
  @ViewChildren(DynamicContainerComponent) dynamicContainers: QueryList<DynamicContainerComponent>;

  constructor() { }

  ngOnInit() {
    this.tabs = [
      {
        header: 'Tree',
        selected: false,
        disabled: false,
        closable: true,
        closed: false,
        headerStyle: '',
        headerStyleClass: '',
        leftIcon: '',
        rightIcon: '',
        lazy: true,
        modulePath: './dynamic-tabs/modules/tree/tree.module',
        moduleName: 'TreeModule'
      },
      {
        header: 'Config',
        selected: false,
        disabled: false,
        closable: true,
        closed: false,
        headerStyle: '',
        headerStyleClass: '',
        leftIcon: '',
        rightIcon: '',
        lazy: true,
        modulePath: './dynamic-tabs/modules/config/config.module',
        moduleName: 'ConfigModule'
      },
      {
        header: 'Canvas',
        selected: false,
        disabled: false,
        closable: true,
        closed: false,
        headerStyle: '',
        headerStyleClass: '',
        leftIcon: '',
        rightIcon: '',
        lazy: true,
        modulePath: './canvas/canvas.module',
        moduleName: 'CanvasModule'
      }
    ];
  }

  handleChange(e) {
    const dynamicContainer = this.dynamicContainers.toArray()[e.index - 1];
    if (!dynamicContainer || dynamicContainer.inited) { return; }

    // prevent fast clicking and double loading
    dynamicContainer.inited = true;
  }
}
