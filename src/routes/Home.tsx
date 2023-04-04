import { ChangeEvent, FormEvent, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import ToDo from "../components/ToDo";
import { Todo, actionCreators } from "../store";

interface Props {
  toDos: Todo[];
  addToDo: (text: string) => void;
}

function Home({ toDos, addToDo }: Props) {
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
      <ul>
        {toDos.map((toDo) => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
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
