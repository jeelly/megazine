import React from "react";
// //firebase
// import { auth, db } from "../shared/firebase";
// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
// } from "firebase/auth";
//router
import { Link } from "react-router-dom";
//style-components
import styled from "styled-components";

//sub-page
import ListPage from "./ListPage";

const Home = () => {
  return (
    <>
      <ListPage />
      <Link to="write">
        <WriteBtn>Write</WriteBtn>
      </Link>
    </>
  );
};

export default Home;

const WriteBtn = styled.button`
  width: 200px;
  height: 50px;
  color: white;
  padding: 10px 0;
  text-align: center;
  /* font-weight: bold; */
  font-size: 24px;
  margin: 0 10px;
  border-radius: 5px;
  border: none;
  background-color: #2467dc;
  /* background-color: rgba(0, 0, 0, 0.4); */
  cursor: pointer;
  transition: background-color 0.5s, transform 3s;
  &:hover {
    background-color: rgba(36, 103, 220, 0.5);
  }
`;
