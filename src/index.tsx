import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DEL_TODO = "DEL_TODO";

// action만 리턴하는 함수들을 reducer 위에 다가 정의한다.(일반적으로)
const addToDo = (text: string) => {
  return {
    type: ADD_TODO,
    text,
  };
};

const deleteToDo = (id: number) => {
  return {
    type: DEL_TODO,
    id,
  };
};

const reducer = (state: any = [], action: any) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: state.length + 1 }]; // new array를 만들어서 return해야함!!! state.push(action.text)하면 안됨!
    case DEL_TODO:
      return state.filter((toDo: any) => toDo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);
const dispatchAddToDo = (text: string) => {
  store.dispatch(addToDo(text));
};
const delToDo = (e: any) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

const paintToDos = () => {
  if (ul) ul.innerHTML = "";
  const toDos = store.getState();
  toDos.forEach((toDo: any) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", delToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul?.appendChild(li);
  });
};

store.subscribe(() => {
  console.log(store.getState());
});

store.subscribe(paintToDos);

const onSubmit = (e: any) => {
  e.preventDefault();
  if (input) {
    const toDo = input.value;
    input.value = "";
    dispatchAddToDo(toDo);
  }
};

form?.addEventListener("submit", onSubmit);
