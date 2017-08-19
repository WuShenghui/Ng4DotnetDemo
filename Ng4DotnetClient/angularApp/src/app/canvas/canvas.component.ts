import { Component, OnInit, ViewChild, ElementRef, Type } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

import { CanvasUtil } from '../shared/canvas-util/canvas-util';
import { Shapes } from '../shared/canvas-util/shapes';
import { ToolSetting } from '../shared/canvas-util/canvas-util.model';

declare let fabric;

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvasRef') private canvasRef: ElementRef;
  private src = '/assets/images/butterfly.jpg';
  private canvas;
  private toolSetting: ToolSetting = { color: '#1b82d7', strokeWidth: 3 };
  public strokeWidthList: SelectItem[] = [
    { label: '4px', value: 4 },
    { label: '6px', value: 6 },
    { label: '8px', value: 8 },
    { label: '10px', value: 10 }
  ];

  constructor() { }

  ngOnInit() {
    this.canvas = new CanvasUtil(this.canvasRef.nativeElement, this.toolSetting);
    this.canvas.addImage(this.src);
  }

  type = () => this.canvas.type();

  clip = () => this.canvas.clip();

  draw = (shap: Shapes) => this.canvas.draw(shap);

  undo = () => this.canvas.undo();

  redo = () => this.canvas.redo();

  clear = () => this.canvas.clear().renderAll();

  preview() {
    // window.open(this.canvas.previewResult());

    const win = window.open();
    win.document.write(`
    <iframe src="${this.canvas.previewResult()}"
      frameborder="0"
      style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;"
      allowfullscreen>
    </iframe>`);
  }
}
