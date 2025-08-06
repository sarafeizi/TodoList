import React, { useState, useEffect } from "react";
import TodoList from "./TodoList.jsx";
import AddTodo from "./AddTodo.jsx";
import { playClickSound } from "./utils";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Button } from 'primereact/button';

import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState(() => {
    return localStorage.getItem("filter") || "all";
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter]);

  const addTodo = (text) => {
    setTodos([
      ...todos,
      { id: Date.now(), text, done: false, pinned: false },
    ]);
  };

  const toggleDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };
  const togglePin = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, pinned: !todo.pinned } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "done") return todo.done;
      if (filter === "undone") return !todo.done;
      return true;
    })
    .sort((a, b) => b.pinned - a.pinned);

  return (
    <div className="app">
        <ConfirmDialog />
      <h1 className="title">TodoList</h1>
      <AddTodo onAdd={addTodo} />
      <div className="filters">
        <button className="vintage-button undone" onClick={() => {
          playClickSound();
          setFilter("undone");
        }}>
          Undone
        </button>
        <button className="vintage-button done" onClick={() => {
          playClickSound();
          setFilter("done");
        }}>
          Done
        </button>

        <button className="vintage-button all" onClick={() => {
          playClickSound();
          setFilter("all");
        }}>
          All
        </button>
      </div>
      <TodoList
        todos={filteredTodos}
        onToggle={toggleDone}
        onDelete={deleteTodo}
        onPin={togglePin}
      />
    </div>
  );
}

export default App;
