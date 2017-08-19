import { Shapes } from './shapes';
import { ClientXY, ToolSetting } from './canvas-util.model';
declare let fabric;

interface DrawFactory {
  preDraw(startPointer: ClientXY);
  drawing(currentPointer: ClientXY);
  postDraw();
}

export class ShapesFactory {
  public provider = new Map<Shapes, ShapesProvider>();

  constructor(private canvas, private toolSetting: ToolSetting) {
    this.provider.set(Shapes.Line, new Line(this.canvas, this.toolSetting));
    this.provider.set(Shapes.ClipRectangle, new ClipRectangle(this.canvas, this.toolSetting));
    this.provider.set(Shapes.Arrow, new Arrow(this.canvas, this.toolSetting));
    this.provider.set(Shapes.Ellipse, new Ellipse(this.canvas, this.toolSetting));
    this.provider.set(Shapes.Circle, new Circle(this.canvas, this.toolSetting));
    this.provider.set(Shapes.Rectangle, new Rectangle(this.canvas, this.toolSetting));
  }
}

abstract class ShapesProvider implements DrawFactory {
  public drawingObj;
  constructor(protected canvas, protected toolSetting: ToolSetting) { }

  preDraw(startPointer: ClientXY) { }
  drawing(currentPointer: ClientXY) { }
  postDraw() { }
}

class Line extends ShapesProvider {
  preDraw(startPointer: ClientXY) {
    const points = [startPointer.x, startPointer.y, startPointer.x, startPointer.y];
    this.drawingObj = new fabric.Line(points, {
      fill: 'red',
      stroke: this.toolSetting.color,
      strokeWidth: this.toolSetting.strokeWidth,
      originX: 'center',
      originY: 'center'
    });

    this.canvas.add(this.drawingObj);
  }

  drawing(currentPointer: ClientXY) {
    if (!this.drawingObj) { return; }
    this.drawingObj.set({ x2: currentPointer.x, y2: currentPointer.y });
    this.canvas.renderAll();
  }
}

class ClipRectangle extends ShapesProvider {
  preDraw(startPointer: ClientXY) {
    this.drawingObj = new fabric.Rect({
      fill: 'transparent',
      left: startPointer.x,
      top: startPointer.y,
      originX: 'left',
      originY: 'top',
      stroke: '#ccc',
      strokeDashArray: [2, 2],
      opacity: 1,
      width: 1,
      height: 1
    });

    this.canvas.add(this.drawingObj);
  }

  drawing(currentPointer: ClientXY) {
    if (!this.drawingObj) { return; }

    if (currentPointer.x - this.drawingObj.left > 0) {
      this.drawingObj.width = currentPointer.x - this.drawingObj.left;
    }

    if (currentPointer.y - this.drawingObj.top > 0) {
      this.drawingObj.height = currentPointer.y - this.drawingObj.top;
    }
    this.canvas.renderAll();
  }
}

class Arrow extends ShapesProvider {
  private line: any;
  private arrow: any;

  private arrowAngle() {
    const dx = this.line.x2 - this.line.x1;
    const dy = this.line.y2 - this.line.y1;

    let angle = Math.atan2(dy, dx);
    angle *= 180 / Math.PI;
    angle += 90;

    return angle;
  }

  preDraw(startPointer: ClientXY) {
    const arrowLinePoints = [startPointer.x, startPointer.y, startPointer.x, startPointer.y];

    this.line = new fabric.Line(arrowLinePoints, {
      fill: 'transparent',
      stroke: this.toolSetting.color,
      strokeWidth: this.toolSetting.strokeWidth,
    });

    const angle = this.arrowAngle();

    this.arrow = new fabric.Triangle({
      angle: angle,
      fill: this.toolSetting.color,
      top: this.line.y2,
      left: this.line.x2,
      width: 15,
      height: 15,
      originX: 'center',
      originY: 'center',
      stroke: this.toolSetting.color,
      strokeWidth: this.toolSetting.strokeWidth,
    });

    this.drawingObj = this.line;

    this.canvas.add(this.line);
    this.canvas.add(this.arrow);
  }

  drawing(currentPointer: ClientXY) {
    if (!this.drawingObj) { return; }

    this.line.set({
      x2: currentPointer.x,
      y2: currentPointer.y,
    });

    const angle = this.arrowAngle();

    this.arrow.set({
      top: this.line.y2,
      left: this.line.x2,
      angle,
      width: 15,
      height: 15
    });

    this.canvas.renderAll();
  }

  postDraw() {
    this.canvas.deactivateAll();
    this.canvas.remove(this.line);
    this.canvas.remove(this.arrow);

    this.drawingObj = new fabric.Group([this.line, this.arrow], {
      hasBorders: false,
      hasControls: false,
    });

    this.canvas.add(this.drawingObj);
    this.canvas.renderAll();
  }
}

class Ellipse extends ShapesProvider {
  startPointer: ClientXY;

  preDraw(startPointer: ClientXY) {
    this.startPointer = startPointer;

    this.drawingObj = new fabric.Ellipse({
      fill: 'transparent',
      left: startPointer.x,
      top: startPointer.y,
      originX: 'center',
      originY: 'center',
      stroke: this.toolSetting.color,
      strokeWidth: this.toolSetting.strokeWidth,
      rx: 5,
      ry: 1,
      width: 1,
      height: 1
    });

    this.canvas.add(this.drawingObj);
  }

  drawing(currentPointer: ClientXY) {
    if (!this.drawingObj) { return; }

    this.drawingObj.set({
      rx: Math.abs(this.startPointer.x - currentPointer.x),
      ry: Math.abs(this.startPointer.y - currentPointer.y)
    });

    this.canvas.renderAll();
  }
}

class Circle extends ShapesProvider {
  private startPointer: ClientXY;
  public preDraw(position: ClientXY) {
    this.startPointer = position;
    this.drawingObj = new fabric.Circle({
      left: position.x,
      top: position.y,
      originX: 'left',
      originY: 'top',
      radius: 0,
      angle: 0,
      fill: '',
      stroke: this.toolSetting.color,
      strokeWidth: this.toolSetting.strokeWidth,
    });
    this.canvas.add(this.drawingObj);
  }

  public drawing(currentPointer: ClientXY): void {
    let radiusVal = Math.max(Math.abs(this.startPointer.y - currentPointer.y), Math.abs(this.startPointer.x - currentPointer.x)) / 2;
    if (radiusVal > this.drawingObj.strokeWidth) {
      radiusVal -= this.drawingObj.strokeWidth / 2;
    }
    this.drawingObj.set({ radius: radiusVal });

    if (this.startPointer.x > currentPointer.x) {
      this.drawingObj.set({ originX: 'right' });
    } else {
      this.drawingObj.set({ originX: 'left' });
    }

    if (this.startPointer.y > currentPointer.y) {
      this.drawingObj.set({ originY: 'bottom' });
    } else {
      this.drawingObj.set({ originY: 'top' });
    }

    this.canvas.renderAll();
  }
}

class Rectangle extends ShapesProvider {
  private startPointer: ClientXY;
  public preDraw(position: ClientXY) {
    this.startPointer = position;

    this.drawingObj = new fabric.Rect({
      left: position.x,
      top: position.y,
      width: 0,
      height: 0,
      stroke: this.toolSetting.color,
      strokeWidth: this.toolSetting.strokeWidth,
      fill: ''
    });

    this.canvas.add(this.drawingObj);
  }

  public drawing(currentPointer: ClientXY): void {
    if (this.startPointer.x > currentPointer.x) {
      this.drawingObj.set({ left: Math.abs(currentPointer.x) });
    }
    if (this.startPointer.y > currentPointer.y) {
      this.drawingObj.set({ top: Math.abs(currentPointer.y) });
    }

    this.drawingObj.set({ width: Math.abs(this.startPointer.x - currentPointer.x) });
    this.drawingObj.set({ height: Math.abs(this.startPointer.y - currentPointer.y) });

    this.canvas.renderAll();
  }
}
