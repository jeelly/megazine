import React from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { changeName, changeAge } from "../redux/modules/boardSlice";
import { auth } from "../shared/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { useState } from "react";
import { deleteBoardFB } from "../shared/FB/Board";
//style
import styled from "styled-components";
//Subpage
import Card from "./Card";

function List(props) {
  // console.log("ASDasd", props);
  const uId = auth.currentUser?.uid;
  const dispatch = useDispatch();
  const [is_login, setIsLogin] = React.useState(false);
  const board_list = props.board.list.map((l, idx) => {
    // const loginCheck = async (users) => {
    //   if (l.uid === uId) {
    //     setIsLogin(true);
    //   } else {
    //     setIsLogin(false);
    //   }
    // };
    return (
      <StyledList key={idx}>
        <Link key={idx} id={idx} to={`/card/${parseInt(idx)}`}>
          {/* <Link key={idx} id={idx} to={`/card/l.id}`}> */}
          <Today>{l.today}</Today>
          <UserName>{l.name}</UserName>
          <MainContents layoutstyle={l.layouts}>
            <ImgStyle src={l.image} />
            <MainWrite>{l.content}</MainWrite>
          </MainContents>
        </Link>
        <HeartButton>🤍</HeartButton>
        {l.uid === uId ? (
          <div>
            <Link id={idx} to={`/update/${idx}`}>
              Update
            </Link>
          </div>
        ) : null}
        <CommentWrap>
          <p>좋아요 ?개</p>
          <p>댓글 ?개</p>
        </CommentWrap>
      </StyledList>
    );
  });
  return (
    <>
      <ListWrap>{board_list}</ListWrap>
    </>
  );
}

const Comment = (props) => {
  return null;
};

const ListPage = () => {
  const board = useSelector((state) => state.board);
  return (
    <>
      <List board={board} />
    </>
  );
};

export default ListPage;

const StyledList = styled.li`
  border: 1px solid white;
  width: 50%;
  margin: 0 auto;
  /* height: 200px; */
  /* background-color: gray; */
  padding: 20px;
`;

const Today = styled.p`
  text-align: right;
`;
const UserName = styled.p`
  text-align: right;
`;
const ListWrap = styled.ul`
  /* width: 100vw; */
  /* height: 5vh; */
  display: flex;
  flex-direction: column-reverse;
  /* align-items: center; */
  /* justify-content: center; */
`;
const MainContents = styled.div`
  display: flex;
  /* flex-direction: row-reverse; */
  /* flex-direction: ; // 이걸 바꿔야함 */
  flex-direction: ${(props) =>
    props.layoutstyle === "right"
      ? "row-reverse"
      : props.layoutstyle === "left"
      ? "row"
      : "column"};
  align-items: center;
  justify-content: space-between;
`;
const MainWrite = styled.p`
  display: flex;
  width: 50%;
  height: 50vh;
  justify-content: center;
  align-items: center;
`;
const ImgStyle = styled.img`
  width: 50%;
`;
const CommentWrap = styled.div`
  display: flex;
  margin: 10px 0;
`;

const HeartButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 30px;
  float: right;
`;
