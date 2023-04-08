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

const editExisitngTask = (state: Task[], action: PayloadAction<Task>) => {
  const elementIndex = state.findIndex((task) => task.id === action.payload.id);
  if (elementIndex) {
    state[elementIndex].summary = action.payload.summary;
    state[elementIndex].dueDate = action.payload.dueDate;
  }
  return state;
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: createNewTask,
    deleteTask: deleteExistingTask,
    editTask: editExisitngTask,
  },
});

export const { addTask, deleteTask, editTask } = todoSlice.actions;
export default todoSlice.reducer;
