import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeModule, ContextMenuModule, FileUploadModule } from 'primeng/primeng';
import { TreeDemoComponent } from './tree-demo.component';
import { TreeDemoRoutingModule } from './tree-demo.routing.module';
import { NodeService } from './node.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TreeModule,
    FileUploadModule,
    ContextMenuModule,
    TreeDemoRoutingModule
  ],
  declarations: [TreeDemoComponent],
  providers: [NodeService]
})
export class TreeDemoModule { }
