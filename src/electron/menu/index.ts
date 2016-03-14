

import {Reg} from './menu'
import {MenuItem} from 'electron'

var MenuRegister = Reg

MenuRegister.registe({
  label: '编辑',
  submenu: [{ label: '复制', }]
})

MenuRegister.registe({
  label: '编辑',
  submenu: []
})



var template = MenuRegister.getTemplate()

export =template;