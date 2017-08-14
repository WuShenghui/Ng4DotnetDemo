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
