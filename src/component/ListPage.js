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
  console.log("ASDasd", props);
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
          <div>
            <p>{l.today}</p>
            <ImgStyle src={l.image} />
            <p>{l.name}</p>
            <p>{l.content}</p>
          </div>
          <CommentWrap>
            <p>좋아요 ?개</p>
            <p>댓글 ?개</p>
          </CommentWrap>
        </Link>
        <button>하트버튼</button>
        {l.uid === uId ? (
          <div>
            <button
              onClick={() => {
                dispatch(deleteBoardFB(l.id));
              }}
            >
              삭제버튼
            </button>
            <Link id={idx} to={`/update/${idx}`}>
              Update
            </Link>
          </div>
        ) : null}
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

const ListWrap = styled.ul`
  /* width: 100vw; */
  /* height: 5vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StyledList = styled.li`
  border: 1px solid white;
  background-color: gray;
  padding: 20px;
`;
const ImgStyle = styled.img`
  width: 500px;
`;
const CommentWrap = styled.div`
  display: flex;
  margin: 10px 0;
`;
