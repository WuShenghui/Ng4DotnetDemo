export class CanvasHistory {
  private state = [];
  private mods = 0;

  constructor(private canvas) {
    this.canvas.on(
      'object:modified', function () {
        this.updateModifications(true);
      },
      'object:added', function () {
        this.updateModifications(true);
      });
  }

  public undo() {
    if (this.mods < this.state.length) {
      this.canvas.clear().renderAll();
      this.canvas.loadFromJSON(this.state[this.state.length - 1 - this.mods - 1]);
      this.canvas.renderAll();
      this.mods += 1;
    }
  }

  public redo() {
    if (this.mods > 0) {
      this.canvas.clear().renderAll();
      this.canvas.loadFromJSON(this.state[this.state.length - 1 - this.mods + 1]);
      this.canvas.renderAll();
      this.mods -= 1;
    }
  }

  step() {
    this.updateModifications(true);
  }

  /**
   * @param saveHistory
   * @see {@link http://fiddle.jshell.net/keyur12/evfnsy20/ }
   */
  private updateModifications(saveHistory) {
    if (saveHistory === true) {
      const history = JSON.stringify(this.canvas);
      this.state.push(history);
    }
  }
}
