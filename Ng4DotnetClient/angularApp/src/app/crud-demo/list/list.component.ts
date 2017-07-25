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
  data: PagedResults<CrudModel[]>;

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

    // this.http.getPagedList<CrudModel>('values', {
    //   page: this.page,
    //   size: this.size,
    //   sort: '',
    //   query: {}
    // }).subscribe(response => { this.data = response; });
  }

  getData() {
    // console.log('geting data...');
    // this.http.getList('values', {
    //   sort: ''
    // }).subscribe(response => { this.data = response; });

    return [
      { id: 1, content: 'content...', createdDate: new Date('2017/07/23 17:40'), type: 1, email: "test@email.com", count: 20, activated: true, languages: ['en-us', 'en-us'] },
      { id: 2, content: 'content...', createdDate: new Date('2017/07/23 17:40'), type: 1, email: "test@email.com", count: 20, activated: true, languages: ['en-us', 'en-us'] },
      { id: 3, content: 'content...', createdDate: new Date('2017/07/23 17:40'), type: 1, email: "test@email.com", count: 20, activated: true, languages: ['en-us', 'en-us'] },
      { id: 4, content: 'content...', createdDate: new Date('2017/07/23 17:40'), type: 1, email: "test@email.com", count: 20, activated: true, languages: ['en-us', 'en-us'] },
      { id: 5, content: 'content...', createdDate: new Date('2017/07/23 17:40'), type: 1, email: "test@email.com", count: 20, activated: true, languages: ['en-us', 'en-us'] },
      { id: 6, content: 'content...', createdDate: new Date('2017/07/23 17:40'), type: 1, email: "test@email.com", count: 20, activated: true, languages: ['en-us', 'en-us'] },
      { id: 7, content: 'content...', createdDate: new Date('2017/07/23 17:40'), type: 1, email: "test@email.com", count: 20, activated: true, languages: ['en-us', 'en-us'] },
      { id: 8, content: 'content...', createdDate: new Date('2017/07/23 17:40'), type: 1, email: "test@email.com", count: 20, activated: true, languages: ['en-us', 'en-us'] },
    ];
  }
}
