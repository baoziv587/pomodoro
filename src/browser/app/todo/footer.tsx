/// <reference path="./interface.d.ts" />
import {ACTIVE_TODOS, ALL_TODOS, COMPLETED_TODOS} from './constants'
import {Utils} from 'base/Browser/utils'
declare var classNames: any;

export class TodoFooter extends
  React.Component<ITodoFooterProps, {}>{
  public render() {
    var activeTodoWord = Utils.pluralize(this.props.count, 'item')

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
                cx({ selected: nowShowing === ALL_TODOS })
              }>
              All
            </a>
          </li>
          {' '}
          <li>
            <a href="#/active" className={cx({ selected: nowShowing === ACTIVE_TODOS }) }>
              需要吃掉
            </a>
          </li>
          {' '}
          <li>
            <a
              href="#/completed"
              className={cx({ selected: nowShowing === COMPLETED_TODOS }) }>
              已经吃掉
            </a>
          </li>
        </ul>
        {clearButton}
      </footer>
    )
  }
}
