import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  TreeModule,
  ContextMenuModule,
  FileUploadModule,
  DialogModule,
  TreeTableModule,
  TreeNode,
  SharedModule
} from 'primeng/primeng';
import { TreeDemoComponent } from './tree-demo.component';
import { TreeDemoRoutingModule } from './tree-demo.routing.module';
import { NodeService } from './node.service';
import { ShareModule } from '../shared/shared.module';
import { FilesService } from './upload/files.service';
import { TreeTableDemoComponent } from './tree-table-demo/tree-table-demo.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    TreeModule,
    ContextMenuModule,
    DialogModule,
    TreeTableModule,
    TreeDemoRoutingModule,
    ShareModule,
  ],
  declarations: [
    TreeDemoComponent,
    TreeTableDemoComponent
  ],
  providers: [
    NodeService,
    FilesService
  ]
})
export class TreeDemoModule { }
