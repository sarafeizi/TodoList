import React, { useState, useEffect } from "react";
import TodoList from "./TodoList.jsx";
import AddTodo from "./AddTodo.jsx";
import { playClickSound } from "./utils";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";

import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState(() => {
    return localStorage.getItem("filter") || "all";
  });

  const [showInfo, setShowInfo] = useState(false); // برای دیالوگ اینفو

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

  const editTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
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

      {/* دکمه اینفو سمت راست بالا */}
      <button
        className="info-btn"
        onClick={() => setShowInfo(true)}
        title="Information"
      >
        ℹ️
      </button>

      {/* دیالوگ اطلاعات برنامه */}
<Dialog
  header="درباره برنامه"
  visible={showInfo}
  style={{ width: "350px" , direction: "rtl"}}
  onHide={() => setShowInfo(false)}
  breakpoints={{ "640px": "90vw" }}
  modal
>
  <div style={{ textAlign: "right", lineHeight: "1.6", direction: "rtl", fontFamily: "'Comic Neue', cursive" }}>
    <p>
      قابلیت‌های اصلی برنامه شامل موارد زیر است:
    </p>
    <ul style={{ paddingInlineStart: "20px", margin: 0 }}>
      <li>افزودن تسک‌های جدید با دکمه "Add".</li>
      <li>ویرایش متن تسک‌ها با دکمه ✏️ کنار هر تسک.</li>
      <li>علامت‌گذاری تسک‌ها به عنوان انجام شده یا نشده با چک‌باکس.</li>
      <li>حذف تسک‌ها با دکمه 🗑.</li>
      <li>سنجاق کردن (پین کردن) تسک‌ها برای نمایش بالاتر با دکمه 📍 / 📌.</li>
      <li>
        فیلتر کردن تسک‌ها با سه دکمه‌ی بالا:
        <ul style={{ listStyleType: "disc", paddingInlineStart: "20px", marginTop: "5px" }}>
          <li><b>Undone</b>: نمایش فقط تسک‌های انجام نشده.</li>
          <li><b>Done</b>: نمایش فقط تسک‌های انجام شده.</li>
          <li><b>All</b>: نمایش همه تسک‌ها.</li>
        </ul>
      </li>
    </ul>
    <p>
      این قابلیت‌ها به شما کمک می‌کند تا تسک‌های خود را به‌راحتی مدیریت و سازماندهی کنید.
    </p>
  </div>
</Dialog>


      <h1 className="title">TodoList</h1>
      <AddTodo onAdd={addTodo} />

      <div className="filters">
        <button
          className="vintage-button undone"
          onClick={() => {
            playClickSound();
            setFilter("undone");
          }}
        >
          Undone
        </button>
        <button
          className="vintage-button done"
          onClick={() => {
            playClickSound();
            setFilter("done");
          }}
        >
          Done
        </button>
        <button
          className="vintage-button all"
          onClick={() => {
            playClickSound();
            setFilter("all");
          }}
        >
          All
        </button>
      </div>

      <TodoList
        todos={filteredTodos}
        onToggle={toggleDone}
        onDelete={deleteTodo}
        onPin={togglePin}
        onEdit={editTodo}
      />
    </div>
  );
}

export default App;
