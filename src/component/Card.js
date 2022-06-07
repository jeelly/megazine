import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBoardFB } from "../shared/FB/Board";
import { auth } from "../shared/firebase";
//style
import styled from "styled-components";
//Subpage
import Comment from "./Comment";
const Card = () => {
  const uId = auth.currentUser?.uid;
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);
  const comment = useSelector((state) => state.comment);
  const { _id } = useParams();
  let navigate = useNavigate();

  const card_uid = board.list[_id]?.uid;
  const id = board.list[_id]?.id;

  //게시글이랑 댓글의 id가 같은것만 출력
  // console.log("aa", board.list[_id]?.id);
  // console.log("bb", comment.list);
  return (
    <CardWrap key={Number(_id)}>
      <StyledList>
        <>
          <div>
            <p>{board.list[_id]?.today}dasdsa</p>
            <ImgStyle src={board.list[_id]?.image} />
            <p>{board.list[_id]?.name}</p>
            <p>{board.list[_id]?.content}</p>
          </div>
          <CommentWrap>
            <p>좋아요 ?개</p>
            <p>댓글 ?개</p>
          </CommentWrap>
        </>
        {card_uid === uId ? (
          <>
            <Link id={_id} to={`/update/${_id}`}>
              Update
            </Link>
            <button
              onClick={() => {
                dispatch(deleteBoardFB(id));
                navigate(-1);
              }}
            >
              삭제버튼
            </button>
          </>
        ) : null}
      </StyledList>
      <Comment _id={_id}></Comment>
    </CardWrap>
  );
};

export default Card;

const CardWrap = styled.ul`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
`;
const StyledList = styled.li`
  /* border: 1px solid white;
  background-color: gray;
  padding: 20px; */
`;
const CommentWrap = styled.div`
  /* display: flex;
  margin: 10px 0; */
`;
const ImgStyle = styled.img`
  /* width: 700px; */
`;
