// Import necessary modules
import { ChangeEvent, FormEvent, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import ToDo from "../components/ToDo";
import { Todo, add } from "../store";

// Define the Props interface
interface Props {
  toDos: Todo[];
  addToDo: (text: string) => void;
}

// Define the Home component
function Home({ toDos, addToDo }: Props) {
  // Define the text state and its setter
  const [text, setText] = useState("");

  // Define the onChange handler function
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  // Define the onSubmit handler function
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Dispatch the addToDo action
    addToDo(text);
    // Reset the text state to an empty string
    setText("");
  }

  // Return the JSX markup
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

// Define the mapStateToProps function
function mapStateToProps(state: Todo[]) {
  return { toDos: state };
}

// Define the mapDispatchToProps function
// btn 눌렀을때 addToDo action을 만들기 위해서 아래 함수를 connect에 파라미터로 넘겨서 사용!
function mapDispatchToProps(dispatch: Dispatch) {
  return {
    addToDo: (text: string) => dispatch(add(text)),
  };
}

// Connect the Home component to the Redux store
export default connect(mapStateToProps, mapDispatchToProps)(Home);
