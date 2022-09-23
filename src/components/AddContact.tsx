import React, { useState } from "react";

import { Box, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styled from "@emotion/styled";

import { useAppDispatch } from "../app/hooks";
import { addNewContact } from "../features/contacts/contactsSlice";

const StyledBox = styled(Box)`
  padding: 20px;
  margin: 20px;
  border: 1px solid #1976d2;
  display: flex;
  justify-content: space-around;
  border-radius: 5px;

  @media (max-width: 474px) {
    flex-direction: column;
  }
`;

const StyledTextField = styled(TextField)`
  @media (max-width: 474px) {
    margin-bottom: 10px;
  }
`;

export const AddContact = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const clearInputs = () => {
    setName("");
    setEmail("");
    setPhone("");
  };

  const handelAddNewContact = () => {
    if (name || email || phone) {
      dispatch(addNewContact({ name, email, phone }));
    }
    clearInputs();
  };

  return (
    <StyledBox>
      <StyledTextField
        size="small"
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <StyledTextField
        size="small"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <StyledTextField
        size="small"
        label="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Button variant="contained" onClick={handelAddNewContact}>
        <AddIcon />
      </Button>
    </StyledBox>
  );
};
