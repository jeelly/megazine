import React from "react";
//router
import { Link } from "react-router-dom";
//style-components
import styled from "styled-components";

//sub-page
import ListPage from "./ListPage";

const Home = () => {
  return (
    <HomeWrap>
      <ListPage />
      <Link to="write">
        <WriteBtn>+</WriteBtn>
      </Link>
    </HomeWrap>
  );
};

export default Home;

const HomeWrap = styled.div`
  background-color: #ffffff;
  /* height: 100vh; */
`;

const WriteBtn = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 30px;
  color: white;
  padding: 10px 0;
  text-align: center;
  /* font-weight: bold; */
  border: none;
  background-color: rgba(203, 178, 113, 0.5);
  /* background-color: rgba(0, 0, 0, 0.4); */
  cursor: pointer;
  position: fixed;
  bottom: 2vh;
  right: 2vw;
  z-index: 100;
  transition: background-color 0.5s, transform 3s;
  &:hover {
    background-color: rgba(203, 178, 113, 1);
  }
`;
