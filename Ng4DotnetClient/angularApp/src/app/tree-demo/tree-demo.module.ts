import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeModule, ContextMenuModule, FileUploadModule, DialogModule } from 'primeng/primeng';
import { TreeDemoComponent } from './tree-demo.component';
import { TreeDemoRoutingModule } from './tree-demo.routing.module';
import { NodeService } from './node.service';
import { ShareModule } from '../shared/shared.module';
import { FilesService } from './upload/files.service';

@NgModule({
  imports: [
    ShareModule,
    CommonModule,
    FormsModule,
    TreeModule,
    ContextMenuModule,
    DialogModule,
    TreeDemoRoutingModule
  ],
  declarations: [TreeDemoComponent],
  providers: [
    NodeService,
    FilesService
  ]
})
export class TreeDemoModule { }
