declare var Router: any;

var TodoModel = app.models.TodoModel
var TodoFotter = app.componets.TodoFooter
var TodoItem = app.componets.TodoItem
var TIMER = app.componets.TimerCounter

namespace app.componets {
  export class TodoApp extends
    React.Component<IAppProps, IAppState>{

    constructor(props: IAppProps) {
      super(props);
      this.state = {
        nowShowing: app.constants.ALL_TODOS,
        editing: null
      }
    }

    public componentDidMount() {
      var setState = this.setState;
      var router = Router({
        '/': setState.bind(this, { nowShowing: app.constants.ALL_TODOS }),
        '/active': setState.bind(this, { nowShowing: app.constants.ACTIVE_TODOS }),
        '/completed': setState.bind(this, { nowShowing: app.constants.COMPLETED_TODOS })
      })
      router.init('/active');
    }

    public handleNewTodoKeyDown(event) {
      if (event.keyCode !== app.constants.ENTER_KEY) { return; }
      event.preventDefault();

      var val = ReactDOM
        .findDOMNode<HTMLInputElement>
        (this.refs['newField']).value.trim()

      if (val) {
        this.props.model.addTodo(val);
        ReactDOM.findDOMNode<HTMLInputElement>
          (this.refs['newField']).value = '';
      }
    }

    public toggleAll(event) {
      var checked = event.target.checked;
      this.props.model.toggleAll(checked)
    }

    public toggle(todoToToggle) {
      this.props.model.toggle(todoToToggle)
    }

    public destroy(todo) {
      this.props.model.destroy(todo)
    }

    public edit(todo) {
      this.setState({ editing: todo.id })
    }

    public save(todoToSave, text) {
      this.props.model.save(todoToSave, text);
      this.setState({ editing: null })
    }

    public cancel() {
      this.setState({ editing: null })
    }

    public clearCompleted() {
      this.props.model.clearCompleted()
    }



    public render() {
      var footer;
      var main;
      var todos = this.props.model.todos;
      var showTodos = todos.filter((todo) => {
        switch (this.state.nowShowing) {
          case app.constants.ACTIVE_TODOS:
            return !todo.completed;
          case app.constants.COMPLETED_TODOS:
            return todo.completed;
          default:
            return true;
        }
      })

      var todoItems = showTodos.map((todo) =>
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={this.toggle.bind(this, todo) }
          onDestroy={this.destroy.bind(this, todo) }
          onEdit={this.edit.bind(this, todo) }
          editing={this.state.editing == todo.id}
          onSave={this.save.bind(this, todo) }
          onCancel={e => this.cancel() }
          />
      )

      var activeTodoCount = todos.reduce((accum, todo) => {
        return todo.completed ? accum : accum + 1
      }, 0)

      var completedCount = todos.length - activeTodoCount;

      if (activeTodoCount || completedCount) {
        footer = <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={this.state.nowShowing}
          onClearCompleted={e => this.clearCompleted() }
          />
      }

      if (todos.length) {
        main = (
          <section className="main">
            <input
              type="checkbox"
              className="toggle-all"
              onChange={e => this.toggleAll(e) }
              checked={activeTodoCount === 0}/>
            <ul className="todo-list">
              {todoItems}
            </ul>

          </section>
        )
      }




      return (

        <header className="header">
          <TIMER timerObject={this.props.timer}  todoModel={this.props.model} />
          <input type="text"
            ref="newField"
            className="new-todo"
            placeholder="waht needs to be done"
            onKeyDown={e => this.handleNewTodoKeyDown(e) }
            autoFocus={true}/>
          {main}
          {footer}
        </header>
      )
    }
  }
}


var model = new TodoModel('react-todos');
var timer = new app.utils.Timer(1);
var TodoApp = app.componets.TodoApp;

function render() {
  ReactDOM.render(
    <TodoApp model={model} timer={timer}/>,
    document.getElementsByTagName('section')[0]
  )
}

model.subscribe(render);
render();
