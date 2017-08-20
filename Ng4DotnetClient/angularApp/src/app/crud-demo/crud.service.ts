import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment as config } from '../../environments/environment';
import { PagedResults } from '../shared/paged-results';
import { createRequestOption } from '../shared/request-util';
import { CrudModel } from './crud.model';

@Injectable()
export class CrudService {

  constructor(private http: HttpClient) { }

  public getPagedList(req?: any): Observable<PagedResults<CrudModel>> {
    const options = createRequestOption(req);
    return this.http.get<PagedResults<CrudModel>>(
      `${config.apiUrl}/crud/page`,
      { params: options });
  }

  public getById(id: string): Observable<CrudModel> {
    return this.http.get<CrudModel>(`${config.apiUrl}/crud/${id}`);
  }

  public add(model: CrudModel): Observable<CrudModel> {
    return this.http.post<CrudModel>(`${config.apiUrl}/crud`, model);
  }

  public update(model: CrudModel): Observable<CrudModel> {
    return this.http.put<CrudModel>(`${config.apiUrl}/crud`, model);
  }

  public delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${config.apiUrl}/crud/${id}`);
  }
}
