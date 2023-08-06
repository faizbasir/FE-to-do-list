import {
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

interface Task {
  summary: string;
  id: number;
  dueDate: string;
  completed: boolean;
}

interface State {
  tasks: Task[];
  loading: boolean;
  error: null | SerializedError;
}

export const initialState: State = {
  tasks: [],
  loading: false,
  error: null,
};

// export const initialState = [
//   {
//     id: 1,
//     summary: "Clear garbage",
//     completed: false,
//     dueDate: "2023-04-30",
//   },
//   {
//     id: 2,
//     summary: "Buy Groceries",
//     completed: true,
//     dueDate: "2023-07-02",
//   },
//   {
//     id: 3,
//     summary: "Pick up dry cleaning",
//     completed: false,
//     dueDate: "2023-07-15",
//   },
//   {
//     id: 4,
//     summary: "Pay bills",
//     completed: false,
//     dueDate: "2023-12-08",
//   },
//   { id: 5, summary: "Dicta nihil eos", completed: true, dueDate: "2023-06-06" },
//   {
//     id: 6,
//     summary: "Nemo delectus beatae est",
//     completed: true,
//     dueDate: "2023-09-04",
//   },
//   {
//     id: 7,
//     summary: "Praesentium autem",
//     completed: false,
//     dueDate: "2023-04-30",
//   },
//   { id: 8, summary: "id dolore quis", completed: true, dueDate: "2023-11-10" },
//   {
//     id: 9,
//     summary: "Hic qui ut sapiente ipsa aut",
//     completed: true,
//     dueDate: "2023-07-02",
//   },
//   {
//     id: 10,
//     summary: "Ad dolores quidem ut molestias",
//     completed: false,
//     dueDate: "2023-04-16",
//   },
//   { id: 11, summary: "ipsum", completed: false, dueDate: "2023-06-13" },
//   {
//     id: 12,
//     summary: "Laudantium modi animi repudiandae",
//     completed: true,
//     dueDate: "2023-11-14",
//   },
//   {
//     id: 13,
//     summary: "Recusandae et vitae dolorem amet quae quam.",
//     completed: false,
//     dueDate: "2023-04-30",
//   },
// ];

export const fetchTasks = createAsyncThunk(
  "fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4000/api/tasks");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message as SerializedError);
    }
  }
);

const createNewTask = (
  state: State,
  action: PayloadAction<{
    summary: string;
    dueDate: string;
    id: number;
    completed: boolean;
  }>
) => {
  const task = {
    id: action.payload.id,
    dueDate: action.payload.dueDate,
    summary: action.payload.summary,
    completed: action.payload.completed,
  };
  let taskList = state.tasks;
  taskList.push(task);
  return { ...state, tasks: taskList };
};

const deleteExistingTask = (state: State, action: PayloadAction<number>) => {
  let taskList = state.tasks;
  taskList.filter((task) => task.id != action.payload);
  return { ...state, tasks: taskList };
};

const editExisitngTask = (
  state: State,
  action: PayloadAction<{ summary: string; dueDate: string; id: number }>
) => {
  const elementIndex = state.tasks.findIndex(
    (task) => task.id === action.payload.id
  );
  state.tasks[elementIndex].summary = action.payload.summary;
  state.tasks[elementIndex].dueDate = action.payload.dueDate;
  return state;
};

const changeExisitingTaskStatus = (
  state: State,
  action: PayloadAction<number>
) => {
  const elementIndex = state.tasks.findIndex(
    (task) => task.id === action.payload
  );
  state.tasks[elementIndex].completed = !state.tasks[elementIndex].completed;
  return state;
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: createNewTask,
    deleteTask: deleteExistingTask,
    editTask: editExisitngTask,
    changeTaskStatus: changeExisitingTaskStatus,
  },
  extraReducers(builder) {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      return { ...state, loading: false, tasks: action.payload };
    });
    builder.addCase(fetchTasks.pending, (state, _action) => {
      return { ...state, loading: true };
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload as SerializedError,
      };
    });
  },
});

export const { addTask, deleteTask, editTask, changeTaskStatus } =
  todoSlice.actions;
export default todoSlice.reducer;
