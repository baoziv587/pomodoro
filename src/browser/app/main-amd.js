
requirejs.config({
  baseUrl: './../',
  paths: {
    'todo': 'app/todo'
  }
})


requirejs([], function() {
  requirejs(['todo/index'], function() {
    console.log('success')
  })
})