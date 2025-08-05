import React, { useState, useEffect } from "react";
import TodoList from "./TodoList.jsx";
import AddTodo from "./AddTodo.jsx";
import { playClickSound } from "./utils"; // ایمپورت تابع پخش صدا

import { Button } from 'primereact/button';

import "./App.css";

function App() {
  // بارگذاری todos از localStorage
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  // بارگذاری فیلتر از localStorage
  const [filter, setFilter] = useState(() => {
    return localStorage.getItem("filter") || "all";
  });

  // تابع پخش صدا داخل utils تعریف شده، اینجا نیازی به تعریف مجدد نیست

  // ذخیره todos در localStorage وقتی تغییر می‌کنن
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ذخیره فیلتر در localStorage وقتی تغییر می‌کنه
  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter]);

  // افزودن تسک جدید
  const addTodo = (text) => {
    setTodos([
      ...todos,
      { id: Date.now(), text, done: false, pinned: false },
    ]);
  };

  // تغییر وضعیت انجام‌شده بودن
  const toggleDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  // تغییر وضعیت پین
  const togglePin = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, pinned: !todo.pinned } : todo
      )
    );
  };

  // حذف تسک
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // فیلتر و مرتب‌سازی
  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "done") return todo.done;
      if (filter === "undone") return !todo.done;
      return true;
    })
    .sort((a, b) => b.pinned - a.pinned); // pinned بره بالا

  return (
    <div className="app">
      <h1 className="title">TodoList</h1>
      <AddTodo onAdd={addTodo} />
      <div className="filters">
        <button className="vintage-button all" onClick={() => {
          playClickSound();
          setFilter("all");
        }}>
          All
        </button>
        <button className="vintage-button done" onClick={() => {
          playClickSound();
          setFilter("done");
        }}>
          Done
        </button>
        <button className="vintage-button undone" onClick={() => {
          playClickSound();
          setFilter("undone");
        }}>
          Undone
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
