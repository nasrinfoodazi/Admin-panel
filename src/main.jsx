import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/index.css";
import "./styles/font.css"

import List from "./screens/PostLogin/Product/List";
import { ReactQueryProvider } from "./reactQueryProvider";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import View from "./screens/PostLogin/Product/View";
import LoginPage from "./screens/PreLogin/Login";
import SignUpPage from "./screens/PreLogin/Signup";
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import PreLoginRoute from "./components/PreLoginRoute";
import { SnackbarProvider } from 'notistack'
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SnackbarProvider autoHideDuration={3000} maxSnack={3} variant={'default'}>
      <ReactQueryProvider>
        <Router>
          <AuthProvider>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<List />} />
                <Route path="/product/:id" element={<View />} />
              </Route>

              <Route element={<PreLoginRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
      </ReactQueryProvider>
    </SnackbarProvider>
  </StrictMode>
);
