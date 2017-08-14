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

    this.canvas.__onMouseDown = (e) => this.mouseDownHandler(e);
    this.canvas.__onMouseMove = (e) => this.mouseMoveHandler(e);
    this.canvas.__onMouseUp = (e) => this.mouseUpHandler(e);
  }

  private mouseDownHandler(event) {
    this.isMouseDown = true;
    const pointer = this.canvas.getPointer(event);
    this.shapesFactory.provider.get(this.drawingShape).preDraw(pointer);
  }

  private mouseMoveHandler(event) {
    if (!this.isMouseDown) { return; }

    const pointer = this.canvas.getPointer(event);
    this.shapesFactory.provider.get(this.drawingShape).drawing(pointer);
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

    const left = drawingObj.left - this.imageObject.left;
    const top = drawingObj.top - this.imageObject.top;

    const width = drawingObj.width;
    const height = drawingObj.height;

    this.imageObject.clipTo = function (ctx) {
      ctx.rect(left, top, width, height);
    };
    this.imageObject.selectable = true;
    this.canvas.renderAll();
  }

  public loadImage(src: string) {
    this.imageObject = fabric.Image.fromURL(src, (img) => {
      img.set({
        left: 0,
        top: 0,
        selectable: false
      });
      img.hasRotatingPoint = true;

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

  undo = () => this.canvasHistory.undo();

  redo = () => this.canvasHistory.redo();
}
