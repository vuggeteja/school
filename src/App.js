import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; // ✅ make sure this is imported
// import theme from './theme'; // ✅ your theme file (adjust path if needed)

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import Fees from "./pages/Fees";
import Homework from "./pages/Homework";
import Marks from "./pages/Marks";
import Schools from "./pages/Schools";

function App() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    //-<ThemeProvider theme={theme}>   {/* ✅ Wrap everything */}
      <Router>
        <Routes>
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
          <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />

          {(user.role === 'admin' || user.role === 'superadmin') && (
            <>
              <Route path="/students" element={<Students />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/fees" element={<Fees />} />
              <Route path="/homework" element={<Homework />} />
              <Route path="/marks" element={<Marks />} />
            </>
          )}

          {user.role === 'superadmin' && (
            <Route path="/schools" element={<Schools />} />
          )}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    // </ThemeProvider>
  );
}

export default App;