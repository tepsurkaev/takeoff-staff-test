import React from "react";

import styled from "@emotion/styled";
import { Box } from "@mui/material";

import { ContactItem } from "./ContactItem";
import { ContactsResponse } from "../features/contacts/contactsSlice";

interface ContactsListProps {
  contacts: ContactsResponse[];
}

const StyledBox = styled(Box)`
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 474px) {
    flex-direction: column;
  }
`;

export const ContactsList = ({ contacts }: ContactsListProps) => {
  return (
    <StyledBox>
      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </StyledBox>
  );
};
