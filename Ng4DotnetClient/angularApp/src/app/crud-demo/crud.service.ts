import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../app.config';
import { PagedResults } from '../share/paged-results';
import { createRequestOption } from '../share/request-util';
import { CrudModel } from './crud.model';

@Injectable()
export class CrudService {

  constructor(private http: HttpClient, private config: AppConfig) { }

  public getPagedList(req?: any): Observable<PagedResults<CrudModel>> {
    const options = createRequestOption(req);
    return this.http.get<PagedResults<CrudModel>>(
      `${this.config.apiUrl}/crud/page`,
      { params: options });
  }
}
