import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface StrapiUser {
  loggedUsername: string;
  loggedEmail: string;
  confirmed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface authSlice {
  jwt: null | string;
  user: null | {
    id: string;
    email: string;
    username: string;
  };
  loggedUser: null | StrapiUser;
}

type authPayload = {
  jwt: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
};

const initialState: authSlice = {
  jwt: null,
  user: null,
  loggedUser: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<authPayload>) => {
      state.jwt = action.payload.jwt;
      state.user = action.payload.user;
    },
    setLoggedUser: (state, action: PayloadAction<StrapiUser>) => {
      state.loggedUser = { ...action.payload };
    },
  },
});

export const { setAuth, setLoggedUser } = authSlice.actions;

export default authSlice.reducer;
