import { ShapesFactory } from './shapes-factory';
import { Shapes } from './shapes';
import { CanvasHistory } from './canvas-history';
import { ZoomType, ToolSetting } from './canvas-util.model';

declare let fabric;

export class CanvasUtil {
  private canvas;
  private isMouseDown = false;
  private drawingShape: Shapes;
  private shapesFactory: ShapesFactory;
  private canvasHistory: CanvasHistory;
  private imageObject: any;
  private clipping = false;
  private toolSetting: ToolSetting;

  constructor(canvasElement: HTMLCanvasElement, toolSetting: ToolSetting) {
    this.canvas = new fabric.Canvas(canvasElement, {});
    this.toolSetting = toolSetting;
    this.shapesFactory = new ShapesFactory(this.canvas, this.toolSetting);
    this.canvasHistory = new CanvasHistory(this.canvas);

    this.canvas.on({
      'mouse:down': (event) => this.mouseDownHandler(event),
      'mouse:move': (event) => this.mouseMoveHandler(event),
      'mouse:up': (event) => this.mouseUpHandler(event)
    });
    
    this.canvas.wrapperEl.onmousewheel = (event: MouseWheelEvent) => this.mousewheelHandler(event);
    this.canvas.upperCanvasEl.ondblclick = (event: MouseEvent) => this.dblclickHandler(event);
  }

  private getPointer = (event) => this.canvas.getPointer(event.e);

  private mouseDownHandler(event) {
    this.isMouseDown = true;

    if (this.drawingShape && this.isInRange(event)) {
      const pointer = this.getPointer(event);
      this.shapesFactory.provider.get(this.drawingShape).preDraw(pointer);
    }
  }

  private mouseMoveHandler(event) {
    if (!this.isMouseDown) { return; }

    if (this.drawingShape && this.isInRange(event)) {
      const pointer = this.getPointer(event);
      this.shapesFactory.provider.get(this.drawingShape).drawing(pointer);
    }
  }

  private mouseUpHandler(event) {
    this.isMouseDown = false;
    
    if (this.drawingShape) {
      if (this.clipping) {
        this.clipping = false;
        this.clipToRectangle();
        this.resetOperator();
      } else {
        this.shapesFactory.provider.get(this.drawingShape).postDraw();
      }
    }
  }
  
  private mousewheelHandler(event: MouseWheelEvent) {
    const target = this.canvas.findTarget(event);
    const delta = event.wheelDelta / 120;

    if (target) {
      target.scaleX += delta;
      target.scaleY += delta;

      // constrain
      if (target.scaleX < 0.1) {
        target.scaleX = 0.1;
        target.scaleY = 0.1;
      }
      // constrain
      if (target.scaleX > 10) {
        target.scaleX = 10;
        target.scaleY = 10;
      }
      target.setCoords();
      this.canvas.renderAll();
      return false;
    }
  }

  private dblclickHandler(event: MouseEvent) {
    this.imageSelectable(false);

    const eventPointer = this.canvas.getPointer(event);
    const options = {
      top: eventPointer.y,
      left: eventPointer.x
    };
    this.addText(options);
  }

  private isInRange(event: MouseEvent) {
    const eventPointer = this.getPointer(event);
    return this.imageObj.containsPoint(eventPointer);
  }

  private resetOperator() {
    this.drawingShape = null;
    this.clipping = false;
  }

  private loadImage(src: string, options: any, scaleToWidth: boolean = false) {
    this.imageObject = fabric.Image.fromURL(src, (img) => {
      img.set(options);
      this.imageObject = img;
      
      if (scaleToWidth) {
        this.imageObject.scaleToWidth(this.canvas.width);
      }
      this.canvas.add(this.imageObject);
      this.canvas.setActiveObject(this.imageObject);
      this.resetOperator();
      this.canvas.renderAll();
      this.canvasHistory.step();
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

  private imageSelectable(selectable: boolean) {
    this.imageObj.selectable = selectable;
    this.imageObj.evented = selectable;
    this.imageObj.lockMovementX = !selectable;
    this.imageObj.lockMovementY = !selectable;
    this.imageObj.lockRotation = !selectable;
    this.imageObj.lockScalingX = !selectable;
    this.imageObj.lockScalingY = !selectable;
    this.imageObj.lockUniScaling = !selectable;
    this.imageObj.hasControls = selectable;
    this.imageObj.hasBorders = selectable;
  }
  
  private addText(options?: any) {
    const baseOptions = {
      left: 50,
      top: 50,
      width: 100,
      fontSize: 40,
      fill: this.toolSetting.color
    };

    const text = new fabric.IText('input here', Object.assign({}, baseOptions, (options || {})));
    this.canvas.setActiveObject(text);
    text.selectAll();
    text.enterEditing();
    this.canvas.add(text);
    this.canvasHistory.step();
  }
  
  public addImage(src: string) {
    const options = {
      left: 0,
      top: 0,
      selectable: false
    };
    this.loadImage(src, options, true);
  }

  public clip() {
    this.drawingShape = Shapes.ClipRectangle;
    this.groupAllObjects();
    this.imageSelectable(false);
    this.clipping = true;
  }

  public draw(shape: Shapes) {
    this.drawingShape = shape;
    this.groupAllObjects();
    this.imageSelectable(false);
  }

  public previewResult() {
    this.groupAllObjects();
    this.resetOperator();
    return this.imageObj.toDataURL('png');
  }

  public type() {
    this.addText();
    this.resetOperator();
  }

  public rotate(angleOffset: number) {
    this.groupAllObjects();
    const angle = this.imageObj.angle + angleOffset;
    this.imageObj.setAngle(angle).setCoords();
    this.canvas.renderAll();
    this.canvasHistory.step();
    this.resetOperator();
  }

  public zoom(type: ZoomType) {
    switch (type) {
      case ZoomType.ZoomIn: {
        this.canvas.setZoom(this.canvas.getZoom() * 1.5);
        break;
      }
      default: {
        this.canvas.setZoom(this.canvas.getZoom() / 1.5);
        break;
      }
    }
    this.canvasHistory.step();
    this.resetOperator();
  }

  public undo() {
    this.canvasHistory.undo();
    this.resetOperator();
  }

  public redo() {
    this.canvasHistory.redo();
    this.resetOperator();
  }
}
