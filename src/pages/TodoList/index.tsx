import { FormEvent, useRef } from "react";
import { Signal } from "@preact/signals-react";

import PageTitle from "../../components/PageTitle";

import "./TodoList.scss";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";

export type Todo = {
  id: number;
  content: string;
  done: boolean;
};
type TodoListProps = { todos: Signal<Todo[]> };

const TodoList = ({ todos }: TodoListProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const addTodo = (event: FormEvent) => {
    event.preventDefault();
    if (!inputRef.current?.value) return;

    todos.value = [
      ...todos.value,
      { id: Date.now(), content: inputRef.current.value, done: false },
    ];
    inputRef.current.value = "";
  };

  const toggleTodo = (id: number) =>
    (todos.value = todos.value.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));

  return (
    <div className="todo-list">
      <PageTitle title="Todo List" />
      <h1>Todo List</h1>

      <form className="todo-list__form" onSubmit={addTodo}>
        <Input ref={inputRef} />
        <Button>Add todo</Button>
      </form>

      <div className="todo-list__container">
        {todos.value.map(({ id, content, done }) => (
          <Checkbox
            key={id}
            className={done ? "todo--done" : ""}
            checked={done}
            onChange={() => toggleTodo(id)}
            htmlFor={content}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
