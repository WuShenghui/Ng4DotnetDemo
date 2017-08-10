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

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvas = new fabric.Canvas(canvasElement, {});
    this.shapesFactory = new ShapesFactory(this.canvas);
    this.canvasHistory = new CanvasHistory(this.canvas);

    this.canvas.__onMouseDown = (e) => this.mouseDownHandler(e);
    this.canvas.__onMouseMove = (e) => this.mouseMoveHandler(e);
    this.canvas.__onMouseUp = (e) => this.isMouseDown = false;
  }

  private mouseDownHandler(event) {
    if (!this.isMouseDown) { return; }

    const pointer = this.canvas.getPointer(event);
    this.shapesFactory.provider.get(this.drawingShape).preDraw(pointer);
  }

  private mouseMoveHandler(event) {
    if (!this.isMouseDown) { return; }

    const pointer = this.canvas.getPointer(event);
    this.shapesFactory.provider.get(this.drawingShape).drawing(pointer);
  }

  public drawLine() {
    this.drawingShape = Shapes.Line;
    this.isMouseDown = true;
    this.canvasHistory.step();
  }

  undo = () => this.canvasHistory.undo();

  redo = () => this.canvasHistory.redo();
}
