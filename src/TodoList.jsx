import React from "react";
import TodoItem from "./TodoItem";
function TodoList({ todos, onToggle, onDelete, onPin, onEdit }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggle(todo.id)}
          onDelete={() => onDelete(todo.id)}
          onPin={() => onPin(todo.id)}
          onEdit={(newText) => onEdit(todo.id, newText)}
        />
      ))}
    </ul>
  );
}

export default TodoList;
