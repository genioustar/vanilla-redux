import { ChangeEvent, FormEvent, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { actionCreators, Todo } from "../store";

interface Props {
  toDos: Todo[];
  addToDo: (text: string) => void;
}

function Home({ toDos, addToDo }: Props) {
  console.log(toDos);

  const [text, setText] = useState("");

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addToDo(text);
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
      <ul>{JSON.stringify(toDos)}</ul>
    </div>
  );
}

function mapStateToProps(state: Todo[]) {
  return { toDos: state };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    addToDo: (text: string) => dispatch(actionCreators.addToDo(text)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
