/// <reference path="./interface.d.ts" />
import {Utils} from 'base/Browser/utils'

export class TodoModel implements ITodoModel {
  public key: string;
  public todos: Array<ITodo>;
  public onChanges: Array<any>;

  constructor(key) {
    this.key = key;
    this.todos = Utils.store(key);
    this.onChanges = [];
  }



  public subscribe(onChange) {
    this.onChanges.push(onChange);
  }

  public inform() {
    Utils.store(this.key, this.todos)
    this.onChanges.forEach((cb) => cb())
  }

  public addTodo(title: string) {
    var d = new Date();
    var date = [d.getFullYear(), d.getMonth() + 1, d.getDate()]

    this.todos = this.todos.concat({
      id: Utils.uuid(),
      title: title,
      completed: false,
      date: { 'year': date[0], 'month': date[1], 'date': date[2] }
    })
    this.inform()
  }

  public toggleAll(checked) {

    this.todos = this.todos.map<ITodo>((todo: ITodo) => {
      return Utils.extend(
        {}, todo, { completed: checked }
      );
    })
    this.inform();
  }

  public toggle(todoToToggle): void {
    this.todos = this.todos.map<ITodo>((todo: ITodo) => {
      return todo !== todoToToggle ?
        todo :
        Utils.extend(
          {}, todo, { completed: !todo.completed }
        )
    })
    this.inform()
  }

  //toggle first which wait to do 
  public toggleFirst(): void {
    var count = 0;
    this.todos = this.todos.map<ITodo>((todo: ITodo) => {
      if (count !== 1 && !todo.completed) {
        todo.completed = true;
        count = 1;
      }
      return todo
    })
    this.inform();
  }

  public destroy(todo) {
    this.todos = this.todos.filter((candidate) => {
      return candidate !== todo;
    })
    this.inform();
  }

  public save(todoToSave, text) {
    console.log(todoToSave, text)
    this.todos = this.todos.map((todo) => {
      return todo !== todoToSave
        ? todo
        : Utils.extend({}, todo, { title: text })
    })
    this.inform()
  }

  public clearCompleted(): void {
    this.todos = this.todos.filter(
      (todo) => { return !todo.completed }
    )
    this.inform()
  }
}

