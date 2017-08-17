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

    if (this.drawingShape) {
      const pointer = this.getPointer(event);
      this.shapesFactory.provider.get(this.drawingShape).preDraw(pointer);
    }
  }

  private mouseMoveHandler(event) {
    if (!this.isMouseDown) { return; }

    if (this.drawingShape) {
      const pointer = this.getPointer(event);
      this.shapesFactory.provider.get(this.drawingShape).drawing(pointer);
    }
  }

  private mouseUpHandler(event) {
    this.isMouseDown = false;

    if (this.clipping) {
      this.clipping = false;
      this.clipToRectangle();
      this.afterDone();
    }

    if (this.drawingShape) {
      this.shapesFactory.provider.get(this.drawingShape).postDraw();
    }
  }

  private afterDone() {
    this.drawingShape = null;
    this.clipping = false;
  }

  private loadImage(src: string, options: any) {
    this.imageObject = fabric.Image.fromURL(src, (img) => {
      img.set(options);
      this.imageObject = img;
      this.canvas.add(this.imageObject);
      this.canvas.renderAll();
    });
  }

  private clipToRectangle() {
    const drawingObj = this.shapesFactory.provider.get(this.drawingShape).drawingObj;
    const drawingObjInfo = {
      left: drawingObj.left,
      top: drawingObj.top,
      width: drawingObj.width,
      height: drawingObj.height
    };

    this.canvas.remove(drawingObj);
    const cropped = new Image();
    cropped.src = this.canvas.toDataURL(drawingObjInfo);

    this.canvas.clear();
    const options = Object.assign({}, { selectable: true }, drawingObjInfo);
    this.loadImage(cropped.src, options);
  }

  private groupAllObjects() {
    const objects = this.canvas.getObjects();
    this.imageObject = new fabric.Group([...objects]);
    this.canvas.clear().renderAll();
    this.canvas.add(this.imageObject);
  }

  public addImage(src: string) {
    const options = {
      left: 0,
      top: 0,
      selectable: false
    };
    this.loadImage(src, options);
  }

  public clip() {
    this.groupAllObjects();
    this.imageObject.selectable = false;
    this.clipping = true;
    this.isMouseDown = true;
    this.drawingShape = Shapes.ClipRectangle;
    this.canvasHistory.step();
  }

  public draw(shape: Shapes) {
    this.drawingShape = shape;
    this.isMouseDown = true;
    this.canvasHistory.step();
  }

  public type() {
    const text = new fabric.IText('Enter text here...', {
      left: 20,
      top: 20,
      width: 100,
      fontSize: 40,
      fill: '#FFFCF2'
    });
    this.canvas.add(text).setActiveObject(text);
    text.enterEditing();
    text.selectAll();
  }

  public undo = () => this.canvasHistory.undo();

  public redo = () => this.canvasHistory.redo();
}
