import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "./App.css";
import React from "react";
import { useState } from "react";
import { auth } from "./shared/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
//Router
import { Route, Routes } from "react-router-dom";
//Sub page
import Signup from "./component/Signup";
import Login from "./component/Login";
import Write from "./component/Write";
import Test from "./component/Test";
import Home from "./component/Home";
import Card from "./component/Card";
import Header from "./component/Header";
import Update from "./component/Update";
import Comment from "./component/Comment";
import NotFound from "./component/NotFound";

import FileLeader from "./component/FileLeader";

import { useSelector, useDispatch } from "react-redux";
import { loadBoardFB } from "./shared/FB/Board";
import { loadCommentFB } from "./shared/FB/Comment";
import { loadUserFB } from "./shared/FB/user";
function App() {
  const dispatch = useDispatch();
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
    dispatch(loadBoardFB());
    dispatch(loadCommentFB());
    dispatch(loadUserFB());
  }, []);
  return (
    <div className="App">
      <Header is_login={is_login} />
      <Routes>
        {is_login ? (
          <>
            <Route path="/" element={<Home auth={auth} />} />
            <Route path="/test" element={<Test />} />
            <Route path="/write" element={<Write auth={auth} />} />
            <Route path="/card/:_id" element={<Card />} />
            <Route path="/update/:_id" element={<Update />} />
            <Route path="/comment" element={<Comment />} />
            {/* 연습용  */}
            <Route path="/fileleader" element={<FileLeader />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login auth={auth} />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
