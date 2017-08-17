import { Component, OnInit, ViewChild, ElementRef, Type } from '@angular/core';

import { CanvasUtil } from '../shared/canvas-util/canvas-util';
import { Shapes } from '../shared/canvas-util/shapes';

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
  constructor() { }

  ngOnInit() {
    this.canvas = new CanvasUtil(this.canvasRef.nativeElement);
    this.canvas.addImage(this.src);
  }

  type = () => this.canvas.type();

  clip = () => this.canvas.clip();

  draw = (shap: Shapes) => this.canvas.draw(shap);

  undo = () => this.canvas.undo();

  redo = () => this.canvas.redo();

  clear = () => this.canvas.clear().renderAll();
}
