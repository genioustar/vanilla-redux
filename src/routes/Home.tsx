import { useState } from "react";

export default function Home() {
  const [text, setText] = useState<string>("");

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setText("");
  }

  return (
    <div>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={text}
          onChange={onChange}
          placeholder="Write ToDo List"
        />
        <button>Add</button>
      </form>
      <ul></ul>
    </div>
  );
}
