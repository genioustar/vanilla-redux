// import the createStore function from the Redux library

import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
// define an interface for the Todo object with a text property and an id property
export interface Todo {
  text: string;
  id: number;
}
/*
// define constant variables for the ADD and DEL action types
const addToDo = createAction<string>("ADD");
const delToDo = createAction<number>("DEL");

export interface Todo {
  text: string;
  id: number;
}

// define a reducer function that takes the current state and an action object as input
// the state is initialized as an empty array of Todo objects
const reducer = createReducer<Todo[]>(
  JSON.parse(localStorage.getItem("toDos") || "[]"),
  {
    [addToDo.type]: (state, action) => {
      localStorage.setItem(
        "toDos",
        JSON.stringify([...state, { text: action.payload, id: Date.now() }])
      );
      state.push({ text: action.payload, id: Date.now() });
    },
    [delToDo.type]: (state, action) => {
      localStorage.removeItem("toDos");
      localStorage.setItem(
        "toDos",
        JSON.stringify(state.filter((toDo) => toDo.id !== action.payload))
      );
      return state.filter((toDo) => toDo.id !== action.payload);
    },
  }
);

// create a new store with the reducer function as input
const store = configureStore({ reducer });
*/

const toDos = createSlice({
  name: "toDosReducer",
  initialState: JSON.parse(localStorage.getItem("toDos") || "[]"),
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      localStorage.setItem(
        "toDos",
        JSON.stringify([...state, { text: action.payload, id: Date.now() }])
      );
      state.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action: PayloadAction<number>) => {
      localStorage.removeItem("toDos");
      localStorage.setItem(
        "toDos",
        JSON.stringify(state.filter((toDo: any) => toDo.id !== action.payload))
      );
      return state.filter((toDo: any) => toDo.id !== action.payload);
    },
  },
});

export const { add, remove } = toDos.actions;

export default configureStore({ reducer: toDos.reducer });
