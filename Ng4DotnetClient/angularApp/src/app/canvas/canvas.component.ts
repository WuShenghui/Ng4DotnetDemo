import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { CanvasUtil } from '../shared/canvas-util/canvas-util';

declare let fabric;

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvasRef') private canvasRef: ElementRef;
  private canvas;
  constructor() { }

  ngOnInit() {
    this.canvas = new CanvasUtil(this.canvasRef.nativeElement);
  }

  public type() {

    const text = new fabric.IText('Enter text here...', {
      left: 20,
      top: 20,
      width: 100,
      fontSize: 20,
      hasRotatingPoint: true
    });
    this.canvas.add(text).setActiveObject(text);
    text.enterEditing();
  }

  line = () => this.canvas.drawLine();

  undo = () => this.canvas.undo();

  redo = () => this.canvas.redo();

  clear = () => this.canvas.clear().renderAll();
}
