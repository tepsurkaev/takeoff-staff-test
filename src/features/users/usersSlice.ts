import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { instance } from "../../utils/axiosInstance";

interface initialStateI {
  token: string | null;
  signingIn: boolean;
  error: string | null | undefined;
}

interface UserLoginValues {
  email: string;
  password: string;
  navigate: (pathname: string) => void;
}

interface LoginResponse {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
}

export const userLogin = createAsyncThunk<
  LoginResponse,
  UserLoginValues,
  { rejectValue: string }
>("user/login", async (values: UserLoginValues, { rejectWithValue }) => {
  try {
    const response = await instance.post("/login", {
      email: values.email,
      password: values.password,
    });

    values.navigate("/");

    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      return rejectWithValue(e.message);
    }
  }
});

const initialState: initialStateI = {
  token: null,
  signingIn: false,
  error: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    logout(state) {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.signingIn = true;
      state.token = null;
      state.error = "";
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.signingIn = false;
      state.token = payload.accessToken;
      state.error = "";
    });
    builder.addCase(userLogin.rejected, (state, { error }) => {
      state.signingIn = false;
      state.token = null;
      state.error = error.message;
    });
  },
});

export const { logout } = usersSlice.actions;

export default usersSlice.reducer;
