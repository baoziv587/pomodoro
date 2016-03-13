/// <reference path="./../app/typings/electron.d.ts"/>
import {Menu} from 'electron'
import template = require('./default')

interface IMenuReg {
  registe(menuItem: Electron.MenuItemOptions): this;
  getTemplate(): Array<any>;
}


class MenuRegister implements IMenuReg {
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

var Reg :MenuRegister
Reg= new MenuRegister();

export =Reg; 
