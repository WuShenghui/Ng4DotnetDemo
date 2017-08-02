import { Component, OnInit } from '@angular/core';

declare let fabric;

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  private canvas;
  private drawingObj;
  private state = [];
  private mods = 0;
  private isMouseDown = false;
  private isDrawingLine = false;

  constructor() { }

  ngOnInit() {
    this.canvas = new fabric.Canvas('canvas', {
      width: 500,
      height: 500,
    });

    this.canvas.on(
      'object:modified', function () {
        this.updateModifications(true);
      },
      'object:added', function () {
        this.updateModifications(true);
      });

    this.canvas.__onMouseDown = (e) => this.mouseDownHandler(e, this);
    this.canvas.__onMouseMove = (e) => this.mouseMoveHandler(e, this);
    this.canvas.__onMouseUp = (e) => this.isMouseDown = false;
  }

  public type() {
    fabric.ITextbox = fabric.util.createClass(fabric.Textbox, fabric.Observable, {
      type: 'i-textbox',
      initialize: function (text, options) {
        this.ctx = fabric.util.createCanvasElement().getContext('2d');
        this.callSuper('initialize', text, options);
      },
      _measureText: function (ctx, text, lineIndex, charOffset) {
        return ctx.measureText(text).width;
      }
    });
    fabric.ITextbox.fromObject = function (object) {
      return new fabric.ITextbox(object.text, fabric.util.object.clone(object));
    };
    fabric.ITextbox.instances = [];

    const text = new fabric.ITextbox('input here', {
      left: 20,
      top: 20,
      width: 100,
      fontSize: 20,
    });
    this.canvas.add(text);
    this.updateModifications(true);
  }

  public line() {
    this.isDrawingLine = true;
    this.updateModifications(true);
  }

  public undo() {
    if (this.mods < this.state.length) {
      this.canvas.clear().renderAll();
      this.canvas.loadFromJSON(this.state[this.state.length - 1 - this.mods - 1]);
      this.canvas.renderAll();
      this.mods += 1;
    }
  }

  public redo() {
    if (this.mods > 0) {
      this.canvas.clear().renderAll();
      this.canvas.loadFromJSON(this.state[this.state.length - 1 - this.mods + 1]);
      this.canvas.renderAll();
      this.mods -= 1;
    }
  }

  public clear() {
    this.canvas.clear().renderAll();
  }

  private mouseDownHandler(event, host) {
    if (!host.isDrawingLine) return;
    host.isMouseDown = true;
    const pointer = host.canvas.getPointer(event);
    const points = [pointer.x, pointer.y, pointer.x, pointer.y];
    const line = new fabric.Line(points, {
      strokeWidth: 5,
      fill: 'red',
      stroke: 'red',
      originX: 'center',
      originY: 'center'
    });
    host.canvas.add(line);
    host.drawingObj = line;
  }

  private mouseMoveHandler(event, host) {
    if (!host.isDrawingLine || !host.isMouseDown) return;
    var pointer = host.canvas.getPointer(event);
    host.drawingObj.set({ x2: pointer.x, y2: pointer.y });
    host.canvas.renderAll();
  }

  /**
   * 
   * @param saveHistory 
   * @see {@link http://fiddle.jshell.net/keyur12/evfnsy20/ }
   */
  private updateModifications(saveHistory) {
    if (saveHistory === true) {
      const history = JSON.stringify(this.canvas);
      this.state.push(history);
    }
  }
}
