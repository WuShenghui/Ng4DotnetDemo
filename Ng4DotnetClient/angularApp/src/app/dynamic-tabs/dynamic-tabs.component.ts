import { Component, OnInit, ViewChildren, QueryList, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, TabPanel } from 'primeng/primeng';

import { DynamicContainerComponent } from '../share/lazy-load/dynamic-container.component';
import { EventAggregator } from '../share/event-aggregator/event.aggregator';
import { MessageSentEvent } from '../share/event-aggregator/events/message.sent.event';
import { MessageSentEventPayload } from '../share/event-aggregator/events/message.sent.event.payload';

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
    private route: ActivatedRoute,
    private eventAggregator: EventAggregator
  ) { }

  ngOnInit() {
    this.eventAggregator.getEvent(MessageSentEvent).subscribe(this.onMessageReceived);
  }

  ngAfterViewInit() {
    this.dynamicContainers.changes.subscribe(() => {
      this.tabIndex = this.tabs.length;
      this.handleChange({ index: this.tabs.length });
      this.changeDetectionRef.detectChanges();
    });
  }

  ngOnDestroy() {
    this.eventAggregator.getEvent(MessageSentEvent).unsubscribe(this.onMessageReceived);
  }

  private onMessageReceived = (payload: MessageSentEventPayload) => {
    const tab = this.newTab({
      header: 'Canvas',
      modulePath: './canvas/canvas.module',
      moduleName: 'CanvasModule'
    });
    this.tabs.push(tab);
  }

  selected(e) {
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
