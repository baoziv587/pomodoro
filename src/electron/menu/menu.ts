import template = require('./default')



export class MenuRegister implements IMenuReg {
  private _menu: Array<any>;
  constructor() {
    this._menu = template;
  }

  public registe(menuItem: Electron.MenuItemOptions) {
    this._menu.push(menuItem);
    return this
  }

  public getTemplate() {
    return this._menu;
  }

}

export var Reg= new MenuRegister();

 
