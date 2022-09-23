import React, { useEffect } from "react";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { LoginPage } from "../components/LoginPage";
import { ContactsPage } from "../components/ContactsPage";
import { Header } from "../components/Header";
import { useAppSelector } from "./hooks";

function App() {
  const { token } = useAppSelector((state) => state.users);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <>
      <Header />
      <Routes>
        {token && <Route path="/" element={<ContactsPage />} />}
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
