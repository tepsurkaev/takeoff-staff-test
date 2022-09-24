import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { instance } from "../../utils/axiosInstance";

export interface ContactsResponse {
  id: number;
  phone: string;
  name: string;
  email: string;
}

interface ContactAddResponse {
  phone: string;
  name: string;
  email: string;
}

interface initialStateI {
  contacts: ContactsResponse[];
  loading: boolean;
  error: string | undefined;
  searchText: string;
}

export const fetchAllContacts = createAsyncThunk<
  ContactsResponse[],
  undefined,
  { rejectValue: string }
>("fetch/contacts", async (_, { rejectWithValue }) => {
  try {
    const response = await instance("/contacts");

    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      return rejectWithValue(e.message);
    }
  }
});

export const addNewContact = createAsyncThunk<
  ContactsResponse,
  ContactAddResponse,
  { rejectValue: string }
>("add/contact", async (values: ContactAddResponse, { rejectWithValue }) => {
  try {
    const response = await instance.post("/contacts", {
      ...values,
    });

    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      return rejectWithValue(e.message);
    }
  }
});

export const deleteContact = createAsyncThunk<
  {},
  number,
  { rejectValue: string }
>("delete/contact", async (id: number, { rejectWithValue }) => {
  try {
    const response = await instance.delete(`/contacts/${id}`);

    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      return rejectWithValue(e.message);
    }
  }
});

export const editContact = createAsyncThunk<
  ContactsResponse | undefined,
  ContactsResponse,
  { rejectValue: string }
>("edit/contact", async (values: ContactsResponse, { rejectWithValue }) => {
  try {
    await instance.patch(`/contacts/${values.id}`, {
      name: values.name,
      email: values.email,
      phone: values.phone,
    });
  } catch (e) {
    if (e instanceof Error) {
      return rejectWithValue(e.message);
    }
  }
});

const initialState: initialStateI = {
  contacts: [],
  loading: false,
  error: "",
  searchText: "",
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: initialState,
  reducers: {
    setSearchText(state, { payload }) {
      state.searchText = payload;
    },
    searching(state) {
      state.contacts = state.contacts.filter(
        (contact) => contact.name.toLowerCase().indexOf(state.searchText) > -1
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllContacts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllContacts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.contacts = payload;
    });
    builder.addCase(fetchAllContacts.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message;
    });

    builder.addCase(addNewContact.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNewContact.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.contacts.push(payload);
    });
    builder.addCase(addNewContact.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message;
    });

    builder.addCase(deleteContact.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.loading = false;
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.meta.arg
      );
    });
    builder.addCase(deleteContact.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message;
    });

    builder.addCase(editContact.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editContact.fulfilled, (state, action) => {
      state.loading = false;
      state.contacts = state.contacts.map((contact) => {
        if (contact.id === action.meta.arg.id) {
          return {
            ...contact,
            ...action.meta.arg,
          };
        }
        return contact;
      });
    });
    builder.addCase(editContact.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message;
    });
  },
});

export const { setSearchText, searching } = contactsSlice.actions;

export default contactsSlice.reducer;
