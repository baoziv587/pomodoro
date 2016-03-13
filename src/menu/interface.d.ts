interface IMenuReg {
  registe(menuItem: Electron.MenuItemOptions): this;
  getTemplate(): Array<any>;
}