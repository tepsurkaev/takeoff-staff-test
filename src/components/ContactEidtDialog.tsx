import React, { useState } from "react";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { ContactsResponse } from "../features/contacts/contactsSlice";
import { useAppDispatch } from "../app/hooks";
import { editContact } from "../features/contacts/contactsSlice";

interface ContactEditDialogProps {
  contact: ContactsResponse;
}

export const ContactEditDialog = ({ contact }: ContactEditDialogProps) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [phone, setPhone] = useState(contact.phone);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditContact = () => {
    dispatch(editContact({ name, email, phone, id: contact.id }));
    handleClose();
  };

  return (
    <div>
      <EditIcon
        onClick={handleClickOpen}
        sx={{ color: "#fff", cursor: "pointer" }}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Contact edit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Phone"
            type="phone"
            fullWidth
            variant="standard"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditContact}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
