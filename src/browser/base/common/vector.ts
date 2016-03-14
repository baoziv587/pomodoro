class Vector {
  private x: number;
  private y: number;

  constructor(_x: number, _y: number) {
    this.x = _x;
    this.y = _y;
  }

  add(v: Vector) {
    this.x = this.x + v.x;
    this.y = this.y + v.y;
  }

  sub(v: Vector) {
    this.x = this.x - v.x;
    this.y = this.y - v.y;
  }

  mult(n: number) {
    this.y = this.y * n;
    this.x = this.x * n;
  }

  div(n: number) {
    this.x = this.x / n;
    this.y = this.y / n;
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    var m = this.mag();
    if (m != 0) {
      this.div(m);
    }
  }
}
