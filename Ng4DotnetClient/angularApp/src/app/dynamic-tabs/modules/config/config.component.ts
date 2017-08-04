import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config',
  template: `<h2>Config</h2>`
})
export class ConfigComponent implements OnInit {
  ngOnInit() {
    console.log('ngOnInit inside ConfigComponent');
  }
}
