

import MenuRegister = require('./menu')
import {MenuItem} from 'electron'




MenuRegister.registe({
  label: '编辑',
  submenu: [{ label: '复制',  }]
})

MenuRegister.registe({
  label: '编辑',
  submenu: []
})



var template = MenuRegister.getTemplate()

export =template;