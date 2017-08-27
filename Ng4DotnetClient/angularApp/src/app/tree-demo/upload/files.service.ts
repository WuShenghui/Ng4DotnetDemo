import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment as config } from '../../../environments/environment';
import { SystemFile } from './system-file';

@Injectable()
export class FilesService {

  constructor(private http: HttpClient) { }

  getFiles(): Observable<SystemFile[]> {
    const url = `${config.apiUrl}/api/Files/SystemFiles`;
    return this.http.get<SystemFile[]>(url);
  }

  deleteFile(file: SystemFile): Observable<string> {
    const url = `${config.apiUrl}/api/Files`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<string>(url,
      JSON.stringify(file),
      { headers });
  }
}
