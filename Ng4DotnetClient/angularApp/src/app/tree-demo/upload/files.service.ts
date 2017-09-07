import { RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment as config } from '../../../environments/environment';
import { SystemFile } from './system-file';

export class Files {
  data?: any;
  files: File[];
}

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

  public upload(req?: Files): Observable<void> {

    const formData = new FormData();

    for (let i = 0; i < req.files.length; i++) {
      formData.append(`files[]`, req.files[i], req.files[i].name);
    }

    if (req.data !== '' && req.data !== undefined && req.data !== null) {
      for (const property in req.data) {
        if (req.data.hasOwnProperty(property)) {
          formData.append(property, req.data[property]);
        }
      }
    }

    return this.http.request<void>(
      'POST',
      `${config.apiUrl}/api/upload`,
      { body: formData });
  }
}
