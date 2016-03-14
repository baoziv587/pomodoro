
   
//MODEL
import {TodoModel} from './todoModel'
import {TimerModel} from 'app/todo/timerModel'

//JSX 




var model = new TodoModel('react-todos');
var timer = new TimerModel(1);
import  TodoApp = require('./app')

function renderTodo() {
  ReactDOM.render(
    <TodoApp model={model} timer={timer}/>,
    document.getElementsByTagName('section')[0]
  )
}
model.subscribe(renderTodo);
renderTodo();
