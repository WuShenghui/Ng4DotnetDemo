import { Component, OnInit, ViewChildren, QueryList, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, TabPanel } from 'primeng/primeng';
import { DynamicContainerComponent } from '../share/lazy-load/dynamic-container.component';

class DynamicTab extends TabPanel {
  type?: string;
  modulePath: string;
  moduleName: string;
}

@Component({
  selector: 'app-dynamic-tabs',
  templateUrl: './dynamic-tabs.component.html',
  styleUrls: ['./dynamic-tabs.component.css']
})
export class DynamicTabsComponent implements OnInit, AfterViewInit {
  @ViewChildren(DynamicContainerComponent) dynamicContainers: QueryList<DynamicContainerComponent>;
  tabIndex: number = 0;
  tabBaseInfo = {
    selected: false,
    disabled: false,
    closable: true,
    closed: false,
    headerStyle: '',
    headerStyleClass: '',
    leftIcon: '',
    rightIcon: '',
    lazy: true,
  };
  tabs: DynamicTab[] = [];

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.tabs = [
    //   {
    //     header: 'Tree',

    //     modulePath: './dynamic-tabs/modules/tree/tree.module',
    //     moduleName: 'TreeModule'
    //   },
    //   {
    //     header: 'Config',
    //     selected: false,
    //     disabled: false,
    //     closable: true,
    //     closed: false,
    //     headerStyle: '',
    //     headerStyleClass: '',
    //     leftIcon: '',
    //     rightIcon: '',
    //     lazy: true,
    //     modulePath: './dynamic-tabs/modules/config/config.module',
    //     moduleName: 'ConfigModule'
    //   },
    //   {
    //     header: 'Canvas',
    //     selected: false,
    //     disabled: false,
    //     closable: true,
    //     closed: false,
    //     headerStyle: '',
    //     headerStyleClass: '',
    //     leftIcon: '',
    //     rightIcon: '',
    //     lazy: true,
    //     modulePath: './canvas/canvas.module',
    //     moduleName: 'CanvasModule'
    //   }
    // ];

    this.route.params.subscribe(params => {
      if (params['newTab']) {
        const tab = this.newTab({
          header: 'Canvas',
          modulePath: './canvas/canvas.module',
          moduleName: 'CanvasModule'
        });
        this.tabs.push(tab);
      }
    });
  }

  selected(e) {debugger
    console.log('selected', this.tabs);
    let tab;
    switch (e) {
      case 'tree': {
        tab = this.newTab({
          header: 'Tree',
          type: 'detail',
          modulePath: './dynamic-tabs/modules/tree/tree.module',
          moduleName: 'TreeModule'
        });
        break;
      }
      case 'config': {
        tab = this.newTab({
          header: 'Config',
          type: 'detail',
          modulePath: './dynamic-tabs/modules/config/config.module',
          moduleName: 'ConfigModule'
        });
        break;
      }
    }

    if (this.tabs.length > 0 && this.tabs[0].type === 'detail') {
      this.tabs[0] = tab;
    }
    else {
      this.tabs.unshift(tab);
    }

    this.refreshDynamicContainer({ index: 1 });
  }

  ngAfterViewInit() {
    this.dynamicContainers.changes.subscribe(() => {
      this.tabIndex = this.tabs.length;
      this.handleChange({ index: this.tabs.length });
      this.changeDetectionRef.detectChanges();
    });
  }

  public handleClose(e) {
    this.tabs.splice(e.index - 1, 1);
  }

  public handleChange(e) {
    console.log('handle', e);

    const dynamicContainer = this.dynamicContainers.toArray()[e.index - 1];
    if (!dynamicContainer || dynamicContainer.inited) { return; }

    // prevent fast clicking and double loading
    dynamicContainer.inited = true;
  }

  private refreshDynamicContainer(e) {
    this.handleChange(e);
    this.reloadDynamicContainer(e);
  }

  private reloadDynamicContainer(e) {
    const dynamicContainer = this.dynamicContainers.toArray()[e.index - 1];
    if (!dynamicContainer) { return; }
    dynamicContainer.inited = false;
  }

  private newTab(tabInfo) {
    return Object.assign(this.tabBaseInfo, tabInfo);
  }
}
