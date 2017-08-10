import { Shapes, ClientXY } from './shapes';
declare let fabric;

interface DrawFactory {
  preDraw(startPointer: ClientXY);
  drawing(currentPointer: ClientXY);
  postDraw();
}

export class ShapesFactory {

  public provider = new Map<Shapes, DrawFactory>();

  constructor(private canvas) {
    this.provider.set(Shapes.Line, new Line(this.canvas));
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

