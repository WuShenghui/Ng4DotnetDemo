import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TreeNode } from 'primeng/primeng';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NodeService {

    constructor(private http: HttpClient) {}

    getFiles(): Observable<any> {
        return this.http.get('assets/data/files.json');
    }
}
