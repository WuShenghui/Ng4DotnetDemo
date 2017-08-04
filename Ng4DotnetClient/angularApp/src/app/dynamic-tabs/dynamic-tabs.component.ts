import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MenuItem, TabPanel } from 'primeng/primeng';
import { DynamicContainerComponent } from './dynamic-container.component';

@Component({
  selector: 'app-dynamic-tabs',
  templateUrl: './dynamic-tabs.component.html',
  styleUrls: ['./dynamic-tabs.component.css']
})
export class DynamicTabsComponent implements OnInit {
  tabs: TabPanel[];
  @ViewChildren(DynamicContainerComponent) dynamicContainers: QueryList<DynamicContainerComponent>;

  constructor() { }

  ngOnInit() {
    // this.tabs = [
    //   {
    //     header: 'tabbdfd',
    //     selected: false,
    //     disabled: false,
    //     closable: true,
    //     closed: false,
    //     headerStyle: '',
    //     headerStyleClass: '',
    //     leftIcon: '',
    //     rightIcon: '',
    //     lazy: true
    //   },
    //   {
    //     header: 'eedddd',
    //     selected: false,
    //     disabled: false,
    //     closable: true,
    //     closed: false,
    //     headerStyle: '',
    //     headerStyleClass: '',
    //     leftIcon: '',
    //     rightIcon: '',
    //     lazy: true
    //   }
    // ];
  }

  handleChange(e) {
    const dynamicContainer = this.dynamicContainers.toArray()[e.index - 1];
    if (!dynamicContainer || dynamicContainer.inited) { return; }

    // prevent fast clicking and double loading
    dynamicContainer.inited = true;
  }
}
