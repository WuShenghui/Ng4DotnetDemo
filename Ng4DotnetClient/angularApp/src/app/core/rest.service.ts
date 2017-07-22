import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/from';

import { AppConfig } from '../app.config';
import { PagedResults } from '../share/paged-results';
import { createRequestOption } from '../share/request-util';

@Injectable()
export class RESTService {

  constructor(private http: Http, private config: AppConfig) { }

  getList(url: string, req?: any): Observable<any[]> {
    const options = createRequestOption(req);
    return this.http.get(`${this.config.apiUrl}/${url}`, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getPagedList<T>(url: string, req?: any): Observable<PagedResults<T[]>> {
    const options = createRequestOption(req);
    return this.http.get(`${this.config.apiUrl}/${url}`, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getById(id: number | string, url: string): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/${url}/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  add(entity: any, url: string): Observable<any> {
    return this.http.post(`${this.config.apiUrl}/${url}`, this.prepareRecord(entity))
      .map(this.extractData)
      .catch(this.handleError);
  }

  update(entity: any, url: string): Observable<any> {
    return this.http.put(`${this.config.apiUrl}/${url}`, this.prepareRecord(entity))
      .map(this.extractData)
      .catch(this.handleError);
  }

  remove(entity: any, url: string): Observable<any> {
    return this.http.delete(`${this.config.apiUrl}/${url}/${entity.id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  prepareRecord(record: any) {
    return record;
  }

  extractData(res: any) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }

    const obj =
      (res && !!res._body && res.json()) ||
      res.data ||
      { id: res.url.match(/[^\/]+$/)[0] };

    return obj;
  }

  handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    const id = error.url.match(/[^\/]+$/)[0]; // if DELETE_FAIL, get id from resp.url

    return Observable.throw({ errMsg, id });
  }

}
