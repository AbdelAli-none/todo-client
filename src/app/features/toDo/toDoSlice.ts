import type { TdefaultToDo } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TdefaultToDo = {
  title: "",
  category: {
    name: "",
    iconCategory: "",
    color: "",
  },
  priority: {
    iconPriority: "",
    level: "",
    value: 0,
  },
  description: "",
  isDone: false,
};

const toDoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    
  },
});



export default toDoSlice.reducer;
