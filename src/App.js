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
import { Route, Routes } from "react-router-dom";
//Sub page
import Signup from "./Signup";
import Login from "./Login";
import Test from "./component/Test";

const Home = () => {
  return (
    <>
      <h1>환영합니다!</h1>
      <button
        onClick={() => {
          //Firebase 로그아웃
          signOut(auth);
        }}
      >
        로그아웃
      </button>
    </>
  );
};

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
      <Routes>
        <Route path="/signup" element={<Signup />} />
        {is_login ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
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
