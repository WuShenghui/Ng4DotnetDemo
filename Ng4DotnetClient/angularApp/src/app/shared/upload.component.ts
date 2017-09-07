import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { FileUpload } from 'primeng/primeng';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-upload',
  template: `
    <p-fileUpload #fileUpload name="myfile[]"
        [url]="url"
        [multiple]="multiple"
        [accept]="accept"
        [maxFileSize]="maxFileSize"
        [auto]="auto"
        [customUpload]="customUpload"
        (onUpload)="onUpload($event)"
        (onSelect)="onSelect($event)"
        (uploadHandler)="customUploadHandler($event)">
      <ng-template let-file let-i="index" pTemplate="file">
          <div class="ui-fileupload-row">
              <div><img [src]="file.objectURL" *ngIf="fileUpload.isImage(file)" [width]="fileUpload.previewWidth" /></div>
              <div>{{file.name}}</div>
              <div>{{fileUpload.formatSize(file.size)}}</div>
              <div><button type="button" icon="fa-close" pButton (click)="fileUpload.remove(i)"></button></div>
          </div>
      </ng-template>
      <ng-template pTemplate="content">
          <ul *ngIf="uploadedFiles.length">
              <li *ngFor="let file of uploadedFiles">{{file.name}} - {{file.size}} bytes</li>
          </ul>
      </ng-template>
    </p-fileUpload>
  `
})
export class UploadComponent {

  @ViewChild('fileUploader') fileUploader: FileUpload;

  @Input() url: string;

  @Input() multiple = '';

  @Input() accept: string;

  @Input() auto = false;

  @Input() maxFileSize: number;

  @Input() fileLimit = 1;

  @Input() customUpload = false;

  @Output() uploadHandler: EventEmitter<any> = new EventEmitter();

  uploadedFiles: any[] = [];

  onUpload(event) {

  }

  onSelect(event) {
    if (event.files && event.files.length + this.uploadedFiles.length > this.fileLimit) {
      console.log(`more than ${this.fileLimit} ..`);
    }
  }

  customUploadHandler(event) {
    if (this.customUpload) {
      this.uploadHandler.emit({
        files: event.files
      });
    }
  }
}
