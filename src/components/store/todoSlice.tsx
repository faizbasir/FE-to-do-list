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

interface Data {
  summary: string;
  id: number;
  completed: boolean;
  dueDate: string;
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
  "fetchTask",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4000/api/tasks");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message as SerializedError);
    }
  }
);

export const addNewTask = createAsyncThunk(
  "addTask",
  async (data: Data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/newTask",
        {
          summary: data.summary,
          id: data.id,
          completed: data.completed,
          dueDate: data.dueDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message as SerializedError);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "deleteTask",
  async (id: Number, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/delete/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message as SerializedError);
    }
  }
);

export const changeTaskStatus = createAsyncThunk(
  "changeTaskStatus",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/taskStatus/${id}`,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message as SerializedError);
    }
  }
);

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

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    editTask: editExisitngTask,
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
    builder.addCase(addNewTask.fulfilled, (state: State, action) => {
      state.tasks.push(action.payload.task);
      state.loading = false;
      return state;
    });
    builder.addCase(addNewTask.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(addNewTask.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload as SerializedError,
      };
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      console.log(typeof action.payload.id);
      let newState = state.tasks.filter((task) => task.id != action.payload.id);
      return { ...state, loading: false, tasks: newState };
    });
    builder.addCase(deleteTask.pending, (state, action) => {
      return { ...state, laoding: false };
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload as SerializedError,
      };
    });
    builder.addCase(changeTaskStatus.fulfilled, (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      state.tasks[index].completed = !state.tasks[index].completed;
      state.loading = false;
      return state;
    });
    builder.addCase(changeTaskStatus.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(changeTaskStatus.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload as SerializedError,
      };
    });
  },
});

export const { editTask } = todoSlice.actions;
export default todoSlice.reducer;
