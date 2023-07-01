import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Task {
  summary: string;
  id: number;
  dueDate: string;
  completed: boolean;
}

const initialState = [
  {
    id: 1,
    summary: "Clear garbage",
    completed: false,
    dueDate: "2023-04-30",
  },
  {
    id: 2,
    summary: "Buy Groceries",
    completed: true,
    dueDate: "2023-07-02",
  },
  {
    id: 3,
    summary: "Pick up dry cleaning",
    completed: false,
    dueDate: "2023-07-15",
  },
  {
    id: 4,
    summary: "Pay bills",
    completed: false,
    dueDate: "2023-12-08",
  },
  { id: 5, summary: "Dicta nihil eos", completed: true, dueDate: "2023-06-06" },
  {
    id: 6,
    summary: "Nemo delectus beatae est",
    completed: true,
    dueDate: "2023-09-04",
  },
  {
    id: 7,
    summary: "Praesentium autem",
    completed: false,
    dueDate: "2023-04-30",
  },
  { id: 8, summary: "id dolore quis", completed: true, dueDate: "2023-11-10" },
  {
    id: 9,
    summary: "Hic qui ut sapiente ipsa aut",
    completed: true,
    dueDate: "2023-07-02",
  },
  {
    id: 10,
    summary: "Ad dolores quidem ut molestias",
    completed: false,
    dueDate: "2023-04-16",
  },
  { id: 11, summary: "ipsum", completed: false, dueDate: "2023-06-13" },
  {
    id: 12,
    summary: "Laudantium modi animi repudiandae",
    completed: true,
    dueDate: "2023-11-14",
  },
  {
    id: 13,
    summary: "Recusandae et vitae dolorem amet quae quam.",
    completed: false,
    dueDate: "2023-04-30",
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

const deleteExistingTask = (state: Task[], action: PayloadAction<number>) => {
  return state.filter((task) => task.id !== action.payload);
};

const editExisitngTask = (
  state: Task[],
  action: PayloadAction<{ summary: string; dueDate: string; id: number }>
) => {
  const elementIndex = state.findIndex((task) => task.id === action.payload.id);
  state[elementIndex].summary = action.payload.summary;
  state[elementIndex].dueDate = action.payload.dueDate;
  return state;
};

const changeExisitingTaskStatus = (
  state: Task[],
  action: PayloadAction<number>
) => {
  const elementIndex = state.findIndex((task) => task.id === action.payload);
  state[elementIndex].completed = !state[elementIndex].completed;
  return state;
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: createNewTask,
    deleteTask: deleteExistingTask,
    editTask: editExisitngTask,
    changeTaskStatus: changeExisitingTaskStatus,
  },
});

export const { addTask, deleteTask, editTask, changeTaskStatus } =
  todoSlice.actions;
export default todoSlice.reducer;
