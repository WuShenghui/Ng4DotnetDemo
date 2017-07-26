import { Component, OnInit } from '@angular/core';

import { PagedResults } from '../../share/paged-results';
import { CrudModel } from '../crud.model';
import { PageList } from '../../share/page-list';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends PageList implements OnInit {
  data: PagedResults<CrudModel>;

  constructor(private http: CrudService) {
    super();
    this.data = {
      totalCount: 8,
      items: []
    };
  }

  ngOnInit() {

  }

  onPageLoad() {
    console.log(`page: ${this.page}, size: ${this.size}`);

    this.http.getPagedList({
      page: this.page,
      size: this.size,
      sort: '',
      query: ''
    }).subscribe(response => { this.data = response; });
  }
}
