import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "./App.css";
import React from "react";
import { useState } from "react";
import { auth, db } from "./shared/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
//Router
import { Route, Routes, Link } from "react-router-dom";
//Sub page
import Signup from "./component/Signup";
import Login from "./component/Login";
import Write from "./component/Write";
import Test from "./component/Test";
import Home from "./component/Home";
import Card from "./component/Card";
import Header from "./component/Header";

function App() {
  const [is_login, setIsLogin] = React.useState(false);

  const loginCheck = async (users) => {
    if (users) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck);
  }, []);

  return (
    <div className="App">
      <Header is_login={is_login} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        {is_login ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/write" element={<Write />} />
            <Route path="/card/:_id" element={<Card />} />
          </>
        ) : (
          <Route path="/" element={<Login />} />
        )}
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
