import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IDsSlice {
  idCategoryToEdit: string | null;
  idCategoryToDelete: string | null;
  idTodoToDelete: string | null;
  idCategoryToEditTodo: string | null;
  idPriorityToEditTodo: string | null;
}

const initialState: IDsSlice = {
  idCategoryToEdit: null,
  idCategoryToDelete: null,
  idTodoToDelete: null,
  idCategoryToEditTodo: null,
  idPriorityToEditTodo: null,
};

const IDsSlice = createSlice({
  name: "IDsSlice",
  initialState,
  reducers: {
    setCategoryIdToEdit: (state, action: PayloadAction<string>) => {
      state.idCategoryToEdit = action.payload;
    },
    setCategoryIdToDelete: (state, action: PayloadAction<string>) => {
      state.idCategoryToDelete = action.payload;
    },
    setIdTodoToDelete: (state, action: PayloadAction<string>) => {
      state.idTodoToDelete = action.payload;
    },
    setIdCategoryToEditTodo: (state, action: PayloadAction<string>) => {
      state.idCategoryToEditTodo = action.payload;
    },
    setIdPriorityToEditTodo: (state, action: PayloadAction<string>) => {
      state.idPriorityToEditTodo = action.payload;
    },
  },
});

export const {
  setCategoryIdToEdit,
  setCategoryIdToDelete,
  setIdTodoToDelete,
  setIdCategoryToEditTodo,
  setIdPriorityToEditTodo,
} = IDsSlice.actions;

export default IDsSlice.reducer;
