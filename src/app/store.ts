import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import contacts from "../features/contacts/contactsSlice";
import users from "../features/users/usersSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, users);

const rootReducer = {
  users: persistedReducer,
  contacts,
};

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
