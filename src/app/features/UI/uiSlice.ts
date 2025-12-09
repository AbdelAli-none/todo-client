import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface uiState {
  isAlertDeleteCategoryOpen: boolean;
  isMainDialogOpen: boolean;
  isEditCategoryOpen: boolean;
  isAddCategoryOpen: boolean;
}

const initialState: uiState = {
  isAlertDeleteCategoryOpen: false,
  isMainDialogOpen: false,
  isEditCategoryOpen: false,
  isAddCategoryOpen: false,
};

const openCloseHandler = createSlice({
  name: "openCloseHandler",
  initialState,
  reducers: {
    deleteCategoryAlertOpen: (state, action: PayloadAction<boolean>) => {
      state.isAlertDeleteCategoryOpen = action.payload;
    },
    mainDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isMainDialogOpen = action.payload;
    },
    editCategory: (state, action: PayloadAction<boolean>) => {
      state.isEditCategoryOpen = action.payload;
    },
    setIsAddCategoryOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddCategoryOpen = action.payload;
    },
  },
});

export const {
  deleteCategoryAlertOpen,
  mainDialogOpen,
  editCategory,
  setIsAddCategoryOpen,
} = openCloseHandler.actions;

export default openCloseHandler.reducer;
