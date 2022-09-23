import React, { useState } from "react";

import { Stack, TextField, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userLogin } from "../features/users/usersSlice";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {} = useAppSelector((state) => state.users);

  const onSubmit = () => {
    dispatch(userLogin({ email, password, navigate }));
  };

  return (
    <Stack
      component="form"
      sx={{
        width: "400px",
        margin: "0 auto",
      }}
      spacing={3}
      noValidate
      autoComplete="off"
      color="primary"
    >
      <Typography variant="h5" color="primary" sx={{ textAlign: "center" }}>
        Авторизация
      </Typography>
      <TextField
        onChange={(e) => setEmail(e.target.value)}
        size="small"
        label="Email"
      />
      <TextField
        onChange={(e) => setPassword(e.target.value)}
        size="small"
        label="Password"
      />
      <Button onClick={onSubmit} variant="contained">
        Войти
      </Button>
    </Stack>
  );
};
