interface ITodo {
  id: string,
  title: string,
  completed: boolean
}


interface ITodoItemProps {
  key: string,
  todo: ITodo;
  editing?: boolean,
  onSave: (val: any) => void,
  onDestroy: () => void,
  onEdit: () => void;
  onCancel: (event: any) => void;
  onToggle: () => void;
}


interface ITodoItemState {
  editText: string
}

interface ITodoFooterProps {
  completedCount: number;
  onClearCompleted: any;
  nowShowing: string;
  count: number;
}


interface ITodoModel {
  key: any,
  todos: Array<ITodo>;
  onChanges: Array<any>;
  subscribe(onChange);
  inform();
  addTodo(title: string);
  toggleAll(checked): void;
  toggle(todoToToggle);
  toggleFirst(): void;
  destroy(todo);
  save(todoToSave, text);
  clearCompleted();

}

interface ITimer {
  second: number;
  min: number;
  total: number,
  reset(total?: number): void;
  countDown(): number;
  setIntervalID(id: number): void;
  clearInterval(): void;
}

interface ITimerProps {
  min?: number;
  sec?: number;
  timerObject: ITimer;
  todoModel: ITodoModel;
}

interface ITimerStates {
  min?: number;
  sec?: number;
  onStart?: Boolean;
}
interface IAppProps {
  model: ITodoModel;
  timer: ITimer;
  onChanges?: Array<any>;
}

interface IAppState {
  editing?: string;
  nowShowing?: string;
}










