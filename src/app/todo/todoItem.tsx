

/// <reference path="./interface.d.ts" />
declare var classNames;
namespace app.componets {
  export class TodoItem extends
    React.Component<ITodoItemProps, ITodoItemState>{

    constructor(props: ITodoItemProps) {
      super(props);
      this.state = { editText: this.props.todo.title }
    }

    public handleSubmit(event) {
      var val = this.state.editText.trim();
      if (val) {
        this.props.onSave(val);
        this.setState({ editText: val })
      } else {
        this.props.onDestroy();
      }
    }

    public handleEdit() {
      this.props.onEdit();
      this.setState({ editText: this.props.todo.title })
    }

    public handleKeyDown(event) {
      if (event.which === app.constants.ESCAPE_KEY) {
        this.setState({ editText: this.props.todo.title })
        this.props.onCancel(event);
      } else if (event.which === app.constants.ENTER_KEY) {
        this.handleSubmit
      }
    }

    public handleChange(event) {
      this.setState({ editText: event.target.value })
    }

    public shouldComponetUpdate(nextProps, nextState) {
      return (
        nextProps.todo !== this.props.todo ||
        nextProps.editing !== this.props.editing ||
        nextState.editText !== this.state.editText
      )
    }

    public componetDidUpdate(prevProps) {
      if (!prevProps.editing && this.props.editing) {
        var node = ReactDOM
          .findDOMNode<HTMLInputElement>
          (this.refs["editField"]);
        node.focus();
        node.setSelectionRange(
          node.value.length, node.value.length
        )
      }
    }

    public render() {
      var classname = classNames({
        completed: this.props.todo.completed,
        editing: this.props.editing
      })
      return (
        <li className={classname }>
        <div className="view">
          <input className="toggle"
            type="checkbox"
            checked={this.props.todo.completed}
            onChange={this.props.onToggle}/>
            <label onDoubleClick={e=> { this.handleEdit() } }>
              {this.props.todo.title}
              </label>
            <button className="destroy"
              onClick={this.props.onDestroy}/>
          </div>
          <input type="text" className="edit"
            ref="editField"
            value={this.state.editText}
            onChange={e=> this.handleChange(e) }
            onKeyDown={e=> this.handleKeyDown(e) }
            onBlur={e=> this.handleSubmit(e) }
            />
          </li>
      )
    }
  }
}