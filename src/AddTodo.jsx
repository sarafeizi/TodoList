import React, { useState } from "react";
import { playClickSound } from "./utils"; // import تابع

function AddTodo({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      playClickSound();
      onAdd(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write ..."
      />
           <button type="submit">Add</button>
    </form>
  );
}

export default AddTodo;
