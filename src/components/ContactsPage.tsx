import React, { useEffect } from "react";

import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchAllContacts } from "../features/contacts/contactsSlice";
import { ContactsList } from "./ContactsList";
import { Search } from "./Search";

export const ContactsPage = () => {
  const dispatch = useAppDispatch();

  const { loading, contacts } = useAppSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  loading && (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <CircularProgress />
    </Box>
  );

  return (
    <>
      <Search />
      <ContactsList contacts={contacts} />
    </>
  );
};
