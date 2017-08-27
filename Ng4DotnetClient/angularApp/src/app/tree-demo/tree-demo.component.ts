import { MenuItem } from 'primeng/components/common/api';
import { Component, OnInit } from '@angular/core';
import { TreeNode, FileUpload } from 'primeng/primeng';
import { Observable } from 'rxjs/Observable';
import { NodeService } from './node.service';

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

  uploadedFiles: any[] = [];

  constructor(private nodeService: NodeService) { }

  ngOnInit() {
    this.nodeService.getFiles()
      .subscribe(files => this.files = files.data);

    this.items = [
      { label: 'Rename', icon: 'fa-close', command: (event) => this.rename(this.selectedFile) }
    ];
  }

  nodeSelect(event) {
    // event.node = selected node
    console.log('onNodeSelect..', event, this.files);
  }

  nodeUnselect(event) {
    console.log('onNodeUnselect..', event);
  }

  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  private rename(selectedFile) {
    this.isRename = true;
    console.log(selectedFile);
  }
}
