/// <reference path="./interface.d.ts" />

namespace app.componets {
  export class TodoFooter extends
    React.Component<ITodoFooterProps, {}>{
    public render() {
      var activeTodoWord = app
        .miscelanious.Utils
        .pluralize(this.props.count, 'item')
      var clearButton = null;

      if (this.props.completedCount > 0) {
        clearButton = (
          <button
            className="clear-completed"
            onClick={this.props.onClearCompleted}>
            Clear completed
            </button>
        )
      }
      //react idiom for shortcuting to `classSet` since 
      //it'll be userd often
      var cx = classNames;
      var nowShowing = this.props.nowShowing;
      return (
        <footer className="footer">
          <span className="todo-count">
            <strong>{this.props.count}</strong>
            {'个待完成'}
            </span>
            <ul className="filters">
            <li>
              <a href="#/"
                className={
                cx({ selected: nowShowing === app.constants.ALL_TODOS })
                }>
                All
                </a>
              </li>
              {' '}
              <li>
              <a href="#/active" className={cx({ selected: nowShowing === app.constants.ACTIVE_TODOS }) }>
                需要吃掉
                </a>
                </li>
              {' '}
              <li>
              <a
                href="#/completed"
                className={cx({ selected: nowShowing === app.constants.COMPLETED_TODOS }) }>
                已经吃掉
                </a>
                </li>
              </ul>
              {clearButton}
          </footer>
      )
    }
  }

}