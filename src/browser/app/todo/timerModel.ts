


export class TimerModel implements ITimer {

  public total: number;
  public min: number;
  public second: number;
  public hasError: Boolean;
  private _defaultTotal: number;
  private _intervalId: number;

  constructor(total: number) {
    this._defaultTotal = 25;

    if (total && total > 0) {
      this.reset(total)
    } else if (alert) {
      alert('total must be great than zero')
    } else {
      this.hasError = true
    }

  }

  public countDown() {
    if (this.min < 0) {
      return
    }

    if (this.second > 0) {
      this.second -= 1;
    } else {
      this.second = 60 - Math.abs(this.second - 1);
      this.min -= 1;
    }

    return this.min;
  }

  public reset(total?: number) {

    if (total) {
      this.total = total;
    } else {
      this.total = this._defaultTotal;
    }
    this.min = this.total;
    this.second = 0;

  }

  public setDefaultTotal(total: number) {
    if (total) { this._defaultTotal = total; return true }
    return false;
  }

  public setIntervalID(id: number) {
    this._intervalId = id;
  }

  public clearInterval() {
    clearInterval(this._intervalId);
    this._intervalId = null;
  }

}
