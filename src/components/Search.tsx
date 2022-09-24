import React, { useState } from "react";

import { TextField, Button, Box } from "@mui/material";
import styled from "@emotion/styled";

import {
  setSearchText,
  searching,
  fetchAllContacts,
} from "../features/contacts/contactsSlice";
import { useAppDispatch } from "../app/hooks";

const StyledTextField = styled(TextField)`
  width: 30%;
  display: flex;
  border-radius: 5px;
  margin-right: 15px;
  border: 1px solid #1976d2;

  @media (max-width: 474px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 5px;
  }
`;

const StyledBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  @media (max-width: 474px) {
    flex-direction: column;
    margin: 20px;
  }
`;

const StyledButton = styled(Button)`
  margin-right: 10px;
  @media (max-width: 474px) {
    width: 100%;
    margin: 5px 0;
  }
`;

export const Search = () => {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");

  dispatch(setSearchText(search));

  const handleClearSearchResult = () => {
    dispatch(fetchAllContacts());
    setSearch("");
  };

  return (
    <StyledBox>
      <StyledTextField
        onChange={(e) => setSearch(e.target.value)}
        variant="outlined"
        placeholder="Search contact by name"
        size="small"
        value={search}
      />
      <StyledButton variant="contained" onClick={() => dispatch(searching())}>
        Search
      </StyledButton>
      <StyledButton onClick={handleClearSearchResult} variant="contained">
        Clear search
      </StyledButton>
    </StyledBox>
  );
};
