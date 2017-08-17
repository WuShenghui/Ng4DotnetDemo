import { Shapes, ClientXY } from './shapes';
declare let fabric;

interface DrawFactory {
  preDraw(startPointer: ClientXY);
  drawing(currentPointer: ClientXY);
  postDraw();
}

export class ShapesFactory {
  public provider = new Map<Shapes, ShapesProvider>();

  constructor(private canvas) {
    this.provider.set(Shapes.Line, new Line(this.canvas));
    this.provider.set(Shapes.ClipRectangle, new ClipRectangle(this.canvas));
    this.provider.set(Shapes.Arrow, new Arrow(this.canvas));
    this.provider.set(Shapes.Ellipse, new Ellipse(this.canvas));
  }
}

abstract class ShapesProvider implements DrawFactory {
  public drawingObj;
  constructor(protected canvas) { }

  preDraw(startPointer: ClientXY) { }
  drawing(currentPointer: ClientXY) { }
  postDraw() { }
}

class Line extends ShapesProvider {
  preDraw(startPointer: ClientXY) {
    const points = [startPointer.x, startPointer.y, startPointer.x, startPointer.y];
    this.drawingObj = new fabric.Line(points, {
      strokeWidth: 5,
      fill: 'red',
      stroke: 'red',
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
    const color = 'red';
    const arrowLinePoints = [startPointer.x, startPointer.y, startPointer.x, startPointer.y];

    this.line = new fabric.Line(arrowLinePoints, {
      fill: 'transparent',
      stroke: color,
    });

    const angle = this.arrowAngle();

    this.arrow = new fabric.Triangle({
      angle: angle,
      fill: color,
      top: this.line.y2,
      left: this.line.x2,
      width: 15,
      height: 15,
      originX: 'center',
      originY: 'center',
      stroke: color
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
      stroke: 'red',
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
