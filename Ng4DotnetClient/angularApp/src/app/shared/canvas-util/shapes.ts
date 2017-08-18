export enum Shapes {
  Line = 1,
  Rectangle,
  ClipRectangle,
  Ellipse,
  Arrow
}

export class ClientXY {
  x: number;
  y: number;
}

export interface ToolSetting {
    color: string;
    strokeWidth: number;
}
