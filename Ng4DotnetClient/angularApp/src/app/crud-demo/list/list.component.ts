import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message, DataTable } from 'primeng/primeng';

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
  @ViewChild(DataTable) dataTableComponent: DataTable;
  data: PagedResults<CrudModel>;
  selectedItem: CrudModel;
  msgs: Message[] = [];

  constructor(
    private http: CrudService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super();
    this.data = {
      totalCount: 8,
      items: []
    };
  }

  ngOnInit() {

  }

  onPageLoad() {
    console.log(`page: ${this.skip}, size: ${this.take}`);

    this.http.getPagedList({
      skip: this.skip,
      take: this.take,
      sort: '',
      query: ''
    }).subscribe(response => { this.data = response; });
  }

  edit() {
    this.router.navigate(['form', this.selectedItem[0].id]);
  }

  delete() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.http.delete(this.selectedItem[0].id.toString())
          .subscribe(() => {
            this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
            // this.onPageLoad();
            this.dataTableComponent.reset();
          });
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }
}
