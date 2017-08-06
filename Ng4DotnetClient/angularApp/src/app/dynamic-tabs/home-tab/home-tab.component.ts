import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.component.html',
  styleUrls: ['./home-tab.component.css']
})
export class HomeTabComponent implements OnInit {
  @Output() selected = new EventEmitter<boolean>();
  items = [
    { title: 'tree' },
    { title: 'config' }
  ];

  constructor() { }

  ngOnInit() {
  }

  selectItem(item) {
    console.log(item);
    this.selected.emit(item.title);
  }
}
