import React, { useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { Box, AppBar, Typography, Toolbar, Button } from "@mui/material";

import { AddContact } from "./AddContact";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { logout } from "../features/users/usersSlice";

export const Header = () => {
  const dispatch = useAppDispatch();

  const [newContact, setNewContact] = useState<boolean>(false);

  const { pathname } = useLocation();

  const { token } = useAppSelector((state) => state.users);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Box sx={{ marginBottom: "90px" }}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">Header</Link>
            </Typography>
            {pathname === "/" && (
              <Button
                onClick={() => setNewContact(!newContact)}
                color="inherit"
              >
                Add contact
              </Button>
            )}
            {!token ? (
              <Link to="/login">
                <Button color="inherit">Login</Button>
              </Link>
            ) : (
              <Button onClick={handleLogout} color="inherit">
                Logut
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {newContact && <AddContact />}
    </>
  );
};
