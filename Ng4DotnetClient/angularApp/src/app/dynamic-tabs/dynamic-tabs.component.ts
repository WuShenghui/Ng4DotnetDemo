import { Component, OnInit, ViewChildren, QueryList, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, TabPanel } from 'primeng/primeng';

import { DynamicContainerComponent } from '../shared/lazy-load/dynamic-container.component';
import { EventAggregator } from '../shared/event-aggregator/event.aggregator';
import { MessageSentEvent } from '../shared/event-aggregator/events/message.sent.event';
import { MessageSentEventPayload } from '../shared/event-aggregator/events/message.sent.event.payload';

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
export class DynamicTabsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(DynamicContainerComponent) dynamicContainers: QueryList<DynamicContainerComponent>;
  tabs: DynamicTab[] = [];
  tabIndex = 0;
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

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private eventAggregator: EventAggregator
  ) { }

  ngOnInit() {
    this.eventAggregator.getEvent(MessageSentEvent).subscribe(this.onMessageReceived);
  }

  ngAfterViewInit() {
    this.dynamicContainers.changes.subscribe(() => {
      this.tabIndex = this.tabs.length;
      this.handleChange({ index: this.tabIndex });
      this.changeDetectionRef.detectChanges();
    });
  }

  ngOnDestroy() {
    this.eventAggregator.getEvent(MessageSentEvent).unsubscribe(this.onMessageReceived);
  }

  private onMessageReceived = (payload: MessageSentEventPayload) => {
    for (const tab of this.tabs) {
      if (tab.header === 'Canvas') {
        return;
      }
    }
    const tab = this.newTab({
      header: 'Canvas',
      modulePath: './canvas/canvas.module',
      moduleName: 'CanvasModule'
    });
    this.tabs.push(tab);
    this.refreshDynamicContainer({ index: this.tabs.length });
  }

  selected(e) {
    const tab = new DynamicTab();
    switch (e) {
      case 'tree': {
        tab.header = 'Tree';
        tab.modulePath = './dynamic-tabs/modules/tree/tree.module';
        tab.moduleName = 'TreeModule';
        break;
      }
      case 'config': {
        tab.header = 'Config';
        tab.modulePath = './dynamic-tabs/modules/config/config.module';
        tab.moduleName = 'ConfigModule';
        break;
      }
    }

    tab.type = 'detail';
    tab.closable = true;
    if (this.tabs.length > 0 && this.tabs[0].type === 'detail') {
      this.tabs[0] = tab;
    } else {
      this.tabs.unshift(tab);
    }

    this.refreshDynamicContainer({ index: 0 });
  }

  public handleClose(e) {
    this.tabs.splice(e.index - 1, 1);
  }

  public handleChange(e) {
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
