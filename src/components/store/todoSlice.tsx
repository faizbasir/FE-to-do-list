import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Task {
  summary: string;
  id: string;
  dueDate: string;
  completed: boolean;
}

const initialState = [
  {
    id: "SDFKM",
    summary: "Buy Groceries",
    completed: false,
    dueDate: "2023-12-08",
  },
  {
    id: "DSKLDF",
    summary: "Pick up dry cleaning",
    completed: false,
    dueDate: "2023-12-08",
  },
  {
    id: "HKSJHF",
    summary: "Pay bills",
    completed: true,
    dueDate: "2023-12-08",
  },
];

const createNewTask = (state: Task[], action: PayloadAction<Task>) => {
  state.push({
    id: action.payload.id,
    dueDate: action.payload.dueDate,
    summary: action.payload.summary,
    completed: action.payload.completed,
  });
};

const deleteExistingTask = (state: Task[], action: PayloadAction<string>) => {
  return state.filter((task) => task.id !== action.payload);
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: createNewTask,
    deleteTask: deleteExistingTask,
  },
});

export const { addTask, deleteTask } = todoSlice.actions;
export default todoSlice.reducer;
