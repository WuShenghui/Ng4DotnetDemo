import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/primeng';
import { NodeService } from './../node.service';

@Component({
  selector: 'app-tree-table-demo',
  templateUrl: './tree-table-demo.component.html',
  styleUrls: ['./tree-table-demo.component.css']
})
export class TreeTableDemoComponent implements OnInit {

  files: TreeNode[];

  constructor(private nodeService: NodeService, ) { }

  ngOnInit() {
    this.nodeService.getFiles()
      .subscribe(files => this.files = files.data);
  }

  sizeChanged(event, node) {
    const value = this.getChangedValue(node);
    this.changedParentNodeSize(node, value);
  }

  private getChangedValue(node) {
    const sibling = node.parent.children;

    let siblingTotalSize = 0;
    sibling.forEach(item => {
      siblingTotalSize += item.data.size;
    });

    return siblingTotalSize - node.parent.data.size;
  }

  private changedParentNodeSize(node, value) {
    if (!node) { return; }

    if (node.data.type === 'Folder') {
      node.data.size += value;
    }

    this.changedParentNodeSize(node.parent, value);
  }

}
