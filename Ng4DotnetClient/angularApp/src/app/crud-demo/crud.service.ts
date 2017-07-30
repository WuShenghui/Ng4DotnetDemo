import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  public getById(id: string): Observable<CrudModel> {
    return this.http.get<CrudModel>(`${this.config.apiUrl}/crud/${id}`);
  }

  public add(model: CrudModel): Observable<CrudModel> {
    return this.http.post<CrudModel>(`${this.config.apiUrl}/crud`, model);
  }

  public update(model: CrudModel): Observable<CrudModel> {
    return this.http.put<CrudModel>(`${this.config.apiUrl}/crud`, model);
  }

  public delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.config.apiUrl}/crud/${id}`);
  }
}
