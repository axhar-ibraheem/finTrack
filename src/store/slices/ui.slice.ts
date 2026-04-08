import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Theme } from "@fintrack/types";
import { ThemeUtils } from "@fintrack/utils";

interface UIState {
  theme: Theme;
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
}

const initialState: UIState = {
  theme: ThemeUtils.getStoredTheme(),
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
      ThemeUtils.storeTheme(action.payload);
    },
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },

    toggleMobileSidebar(state) {
      state.mobileSidebarOpen = !state.mobileSidebarOpen;
    },

    closeMobileSidebar(state) {
      state.mobileSidebarOpen = false;
    },
  },
});

export const {
  setTheme,
  toggleSidebar,
  toggleMobileSidebar,
  closeMobileSidebar,
} = uiSlice.actions;

export default uiSlice.reducer;
