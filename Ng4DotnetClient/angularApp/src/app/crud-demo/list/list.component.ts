import { Component, OnInit } from '@angular/core';

import { RESTService } from '../../core/rest.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [RESTService]
})
export class ListComponent implements OnInit {
  data: any;

  constructor(private http: RESTService) { }

  ngOnInit() {
  }

  getData() {
    console.log('geting data...');
    this.http.getList('values', {
      sort: ''
    }).subscribe(response => { this.data = response; });
  }
}
