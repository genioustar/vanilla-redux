import { createStore } from "redux";

const ADD = "ADD";
const DEL = "DEL";

export interface Todo {
  text: string;
  id: number;
}

const addToDo = (text: string) => {
  return {
    type: ADD,
    text,
  };
};

const delToDo = (id: number) => {
  return {
    type: DEL,
    id,
  };
};

const reducer = (state: Todo[] = [], action: any) => {
  switch (action.type) {
    case ADD:
      return [...state, { text: action.text, id: action.id + 1 }];
    case DEL:
      return state.filter((toDo) => toDo !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

export const actionCreators = {
  addToDo,
  delToDo,
};

export default store;
