
requirejs.config({
  baseUrl: './../',
  paths: {
    'todo': 'app/todo',
    'vender':'node_modules',
    'underscore':'vender/underscore/underscore',
    'react-debug':'vender/react/dist/react',
    'react':'vender/react/dist/react.min'
  }
})


requirejs([], function() {
  requirejs(['todo/index'], function() {
    console.log('success')
  })
})