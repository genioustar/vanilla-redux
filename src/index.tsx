import { createStore } from "redux";

// Get the form, input, and unordered list elements from the DOM
const form = document.querySelector("form") as HTMLFormElement;
const input = document.querySelector("input") as HTMLInputElement;
const ul = document.querySelector("ul") as HTMLUListElement;

// Define action types to prevent typo mistakes
const ADD_TODO = "ADD_TODO";
const DEL_TODO = "DEL_TODO";

// Define interfaces for the Todo, AddTodoAction, and DeleteTodoAction objects
interface Todo {
  text: string;
  id: number;
}

interface AddTodoAction {
  type: typeof ADD_TODO;
  text: string;
}

interface DeleteTodoAction {
  type: typeof DEL_TODO;
  id: number;
}

// Define a type for the actions to be used in the reducer
type TodoActionTypes = AddTodoAction | DeleteTodoAction;

// Create an action creator function to add a new todo
const addToDo = (text: string): AddTodoAction => {
  return {
    type: ADD_TODO,
    text,
  };
};

// Create an action creator function to delete an existing todo
const deleteToDo = (id: number): DeleteTodoAction => {
  return {
    type: DEL_TODO,
    id,
  };
};

// Create a reducer function to update the state based on the action received
const reducer = (state: Todo[] = [], action: TodoActionTypes): Todo[] => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: state.length + 1 }];
    case DEL_TODO:
      return state.filter((toDo: Todo) => toDo.id !== action.id);
    default:
      return state;
  }
};

// Create a store with the reducer
const store = createStore(reducer);

// Create a function to dispatch the ADD_TODO action
const dispatchAddToDo = (text: string) => {
  store.dispatch(addToDo(text));
};

// Create a function to dispatch the DEL_TODO action
const delToDo = (e: any) => {
  console.dir(e);
  const id = parseInt(e.target.parentNode!.id);
  store.dispatch(deleteToDo(id));
};

// Create a function to render the todos to the UI
const paintToDos = () => {
  if (ul) ul.innerHTML = "";
  const toDos = store.getState();
  toDos.forEach((toDo: Todo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", delToDo);
    li.id = toDo.id.toString();
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul?.appendChild(li);
  });
};

// Subscribe to the store to console log the state changes
store.subscribe(() => {
  console.log(store.getState());
});

// Subscribe to the store to render the todos to the UI
store.subscribe(paintToDos);

// Create a function to handle form submission
const onSubmit = (e: Event) => {
  e.preventDefault();
  if (input) {
    const toDo = input.value;
    input.value = "";
    dispatchAddToDo(toDo);
  }
};

// Add a submit event listener to the form element
form?.addEventListener("submit", onSubmit);
