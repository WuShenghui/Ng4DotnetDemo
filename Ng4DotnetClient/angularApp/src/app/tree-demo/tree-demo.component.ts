import { MenuItem } from 'primeng/components/common/api';
import { Component, OnInit } from '@angular/core';
import { TreeNode, FileUpload } from 'primeng/primeng';
import { Observable } from 'rxjs/Observable';
import { NodeService } from './node.service';
import { FilesService } from './upload/files.service';

@Component({
  selector: 'app-tree-demo',
  templateUrl: './tree-demo.component.html',
  styleUrls: ['./tree-demo.component.css']
})
export class TreeDemoComponent implements OnInit {

  files: TreeNode[];

  items: MenuItem[];

  selectedFile: TreeNode;

  isRename: boolean;

  display = false;

  uploadOptions = {
    url: 'http://localhost:5000/api/upload',
    multiple: 'multiple',
    accept: '.png',
    maxFileSize: 1024000
  };

  contextMenu1 = [
    { label: 'Rename', icon: 'fa-close', command: (event) => this.rename(this.selectedFile) }
  ];

  contextMenu2 = [
    { label: 'Upload', icon: 'fa-close', command: (event) => this.upload(this.selectedFile) }
  ];

  constructor(private nodeService: NodeService, private filesService: FilesService) { }

  ngOnInit() {
    this.nodeService.getFiles()
      .subscribe(files => this.files = files.data);

    this.items = this.contextMenu1;
  }

  nodeSelect(event) {
    // event.node = selected node
    console.log('onNodeSelect..', event, this.files);
    this.items = event.node.data === 'Movies Folder'
      ? this.contextMenu1
      : this.contextMenu2;
  }

  nodeUnselect(event) {
    console.log('onNodeUnselect..', event);
  }

  uploadHandler(event) {
    console.log(event.files);
    this.filesService.upload({ files: event.files }).subscribe();
  }

  private rename(selectedFile) {
    this.isRename = true;
    console.log(selectedFile);
  }

  private upload(selectedFile) {
    this.display = true;

    this.uploadOptions.accept = selectedFile.data === 'Movies Folder'
      ? '.jpg'
      : '.png';
    this.uploadOptions.multiple = selectedFile.data === 'Movies Folder'
      ? 'multiple'
      : '';
  }
}
