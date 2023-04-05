import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Task {
  summary: string;
  id: string;
  completed: boolean;
}

const initialState = [
  { id: "SDFKM", summary: "Buy Groceries", completed: false },
  { id: "DSKLDF", summary: "Pick up dry cleaning", completed: false },
  { id: "HKSJHF", summary: "Pay bills", completed: true },
];

const createNewTask = (state: Task[], action: PayloadAction<Task>) => {
  state.push({
    id: action.payload.id,
    summary: action.payload.summary,
    completed: false,
  });
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: createNewTask,
  },
});

export const { addTask } = todoSlice.actions;
export default todoSlice.reducer;
