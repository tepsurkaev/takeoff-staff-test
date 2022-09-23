import React from "react";

import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAppDispatch } from "../app/hooks";
import { ContactsResponse } from "../features/contacts/contactsSlice";
import { ContactEditDialog } from "./ContactEidtDialog";
import { deleteContact } from "../features/contacts/contactsSlice";

interface ContactItemProps {
  contact: ContactsResponse;
}

const StyledBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background-color: #1976d2;
  padding: 15px 20px;
  width: 20%;
  margin: 15px auto;
  border-radius: 5px;

  @media (max-width: 474px) {
    width: 80%;
    margin: 10px auto;
  }
`;

export const ContactItem = ({ contact }: ContactItemProps) => {
  const dispatch = useAppDispatch();

  const handelDeleteContact = (id: number) => {
    dispatch(deleteContact(id));
  };

  return (
    <StyledBox>
      <Box sx={{ color: "#fff" }}>
        <Typography>Name: {contact.name}</Typography>
        <Typography>Email: {contact.email}</Typography>
        <Typography>Phone: {contact.phone}</Typography>
      </Box>
      <Box>
        <DeleteIcon
          onClick={() => handelDeleteContact(contact.id)}
          sx={{ color: "#fff", cursor: "pointer" }}
        />
        <ContactEditDialog contact={contact} />
      </Box>
    </StyledBox>
  );
};
