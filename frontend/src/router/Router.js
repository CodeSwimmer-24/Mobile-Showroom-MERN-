import React from "react";
import Header from "../components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Navbar from "../components/Navbar/Navbar";
import Home from "../Pages/Home/Home";
import Index from "./Index";

function router() {
  return (
    <div>
      <BrowserRouter>
        <div className="App">
          <Routes> 
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default router;
