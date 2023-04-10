// import the createStore function from the Redux library
import { createStore } from "redux";

// define constant variables for the ADD and DEL action types
const ADD = "ADD";
const DEL = "DEL";

// define an interface for the Todo object with a text property and an id property
export interface Todo {
  text: string;
  id: number;
}

// define a function that creates an ADD action object with a text payload
const addToDo = (text: string) => {
  return {
    type: ADD,
    text,
  };
};

// define a function that creates a DEL action object with an id payload
const delToDo = (id: number) => {
  return {
    type: DEL,
    id,
  };
};

// define a reducer function that takes the current state and an action object as input
// the state is initialized as an empty array of Todo objects
const reducer = (
  state: Todo[] = JSON.parse(localStorage.getItem("toDos") || "[]"),
  action: any
) => {
  // use a switch statement to determine what to do based on the action type
  switch (action.type) {
    // if the action type is ADD, create a new Todo object with the text and a unique id
    // and add it to the state array using the spread operator
    case ADD:
      localStorage.setItem(
        "toDos",
        JSON.stringify([...state, { text: action.text, id: Date.now() }])
      );
      console.log(localStorage.getItem("toDos"));
      return [...state, { text: action.text, id: Date.now() }];
    // if the action type is DEL, log the current state and the action id to the console
    // and filter out the Todo object with the matching id from the state array
    case DEL:
      localStorage.removeItem("toDos");
      localStorage.setItem(
        "toDos",
        JSON.stringify(state.filter((toDo) => toDo.id !== action.id))
      );
      console.log(localStorage.getItem("toDos"));
      return state.filter((toDo) => toDo.id !== action.id);
    // if the action type is not recognized, return the current state
    default:
      return state;
  }
};

// create a new store with the reducer function as input
const store = createStore(reducer);

// export an object with the addToDo and delToDo functions as properties
export const actionCreators = {
  addToDo,
  delToDo,
};

// export the store as the default export
export default store;
