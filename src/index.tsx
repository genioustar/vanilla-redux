import { createStore } from "redux";

const form = document.querySelector("form") as HTMLFormElement;
const input = document.querySelector("input") as HTMLInputElement;
const ul = document.querySelector("ul") as HTMLUListElement;

// 사용자 실수를 방지하기 위한 변수로 선언!
const ADD_TODO = "ADD_TODO";
const DEL_TODO = "DEL_TODO";

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

type TodoActionTypes = AddTodoAction | DeleteTodoAction;

const addToDo = (text: string): AddTodoAction => {
  return {
    type: ADD_TODO,
    text,
  };
};

const deleteToDo = (id: number): DeleteTodoAction => {
  return {
    type: DEL_TODO,
    id,
  };
};

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

const store = createStore(reducer);

const dispatchAddToDo = (text: string) => {
  store.dispatch(addToDo(text));
};

const delToDo = (e: any) => {
  console.dir(e);
  const id = parseInt(e.target.parentNode!.id);
  store.dispatch(deleteToDo(id));
};

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

store.subscribe(() => {
  console.log(store.getState());
});

store.subscribe(paintToDos);

const onSubmit = (e: Event) => {
  e.preventDefault();
  if (input) {
    const toDo = input.value;
    input.value = "";
    dispatchAddToDo(toDo);
  }
};

form?.addEventListener("submit", onSubmit);
