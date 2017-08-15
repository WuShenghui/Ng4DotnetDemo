import { ShapesFactory } from './shapes-factory';
import { Shapes } from './shapes';
import { CanvasHistory } from './canvas-history';

declare let fabric;

export class CanvasUtil {
  private canvas;
  private isMouseDown = false;
  private drawingShape: Shapes;
  private shapesFactory: ShapesFactory;
  private canvasHistory: CanvasHistory;
  private imageObject: any;
  private clipping = false;

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvas = new fabric.Canvas(canvasElement, {});
    this.shapesFactory = new ShapesFactory(this.canvas);
    this.canvasHistory = new CanvasHistory(this.canvas);

    this.canvas.on({
      'mouse:down': (event) => this.mouseDownHandler(event),
      'mouse:move': (event) => this.mouseMoveHandler(event),
      'mouse:up': (event) => this.mouseUpHandler(event)
    });
  }

  private getPointer = (event) => this.canvas.getPointer(event.e);

  private mouseDownHandler(event) {
    this.isMouseDown = true;

    if (this.drawingShape !== null) {
      const pointer = this.getPointer(event);
      this.shapesFactory.provider.get(this.drawingShape).preDraw(pointer);
    }
  }

  private mouseMoveHandler(event) {
    if (!this.isMouseDown) { return; }

    if (this.drawingShape !== null) {
      const pointer = this.getPointer(event);
      this.shapesFactory.provider.get(this.drawingShape).drawing(pointer);
    }
  }

  private mouseUpHandler(event) {
    this.isMouseDown = false;

    if (this.clipping) {
      this.clipping = false;
      this.clipToRectangle();
    }
  }

  private clipToRectangle() {
    const drawingObj = this.shapesFactory.provider.get(this.drawingShape).drawingObj;

    // const left = drawingObj.left - this.imageObject.width / 2;
    // const top = drawingObj.top - this.imageObject.height / 2;
    // const width = drawingObj.width;
    // const height = drawingObj.height;
    // this.imageObject.clipTo = function (ctx) {
    //   ctx.rect(left, top, width, height);
    // };
    // this.imageObject.selectable = true;
    // this.imageObject.strokeWidth = 0;
    // this.canvas.remove(drawingObj);
    // this.canvas.renderAll();

    this.canvas.remove(drawingObj);
    const cropped = new Image();
    cropped.src = this.canvas.toDataURL({
      left: drawingObj.left,
      top: drawingObj.top,
      width: drawingObj.width,
      height: drawingObj.height
    });
    this.canvas.clear();
    this.imageObject = fabric.Image.fromURL(cropped.src, (img) => {
      img.set({
        selectable: false
      });
      this.imageObject = img;
      this.canvas.add(this.imageObject);
      this.canvas.renderAll();
    });
  }

  public loadImage(src: string) {
    this.imageObject = fabric.Image.fromURL(src, (img) => {
      img.set({
        left: 0,
        top: 0,
        selectable: false
      });

      this.imageObject = img;
      this.canvas.add(this.imageObject);
      this.canvas.renderAll();
    });
  }

  public clip() {
    this.clipping = true;
    this.drawingShape = Shapes.ClipRectangle;
    this.isMouseDown = true;
    this.canvasHistory.step();
  }

  public drawLine() {
    this.drawingShape = Shapes.Line;
    this.isMouseDown = true;
    this.canvasHistory.step();
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

  public undo = () => this.canvasHistory.undo();

  public redo = () => this.canvasHistory.redo();
}
