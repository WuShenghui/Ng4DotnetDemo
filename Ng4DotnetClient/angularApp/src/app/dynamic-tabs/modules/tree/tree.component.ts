import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tree',
  template: `<h2>Tree</h2>`
})
export class TreeComponent implements OnInit {
  ngOnInit() {
    console.log('ngOnInit inside TreeComponent');
  }
}
