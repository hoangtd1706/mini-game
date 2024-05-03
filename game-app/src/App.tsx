import React from "react";
import "./App.css";
import AppContextProvider from "./contexts/app.context";
import Caro from "./screens/Caro";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/app.layout";
import Home from "./screens/Home";
import Sudoku from "./screens/Sudoku";

function App() {
  return (
    <AppContextProvider>
      <Routes>
        <Route>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="karooo" element={<Caro />} />
            <Route path="soodookoo" element={<Sudoku />} />
          </Route>
        </Route>
      </Routes>
    </AppContextProvider>
  );
}

export default App;
