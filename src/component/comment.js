import React, { useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadCommentFB, addCommentFB } from "../shared/FB/Comment";
import { addCommentRnkFB } from "../shared/FB/Board";
import { auth } from "../shared/firebase";
//style
import styled from "styled-components";

const Comment = (props) => {
  const text = React.useRef(null);
  const comment = useSelector((state) => state.comment);
  const board = useSelector((state) => state.board);
  const card_uid = comment.list[props._id];
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const RnkId = board.list[props._id]?.id;

  //닉네임 구하는 필터
  const user_id = users.list.filter((l, idx) => {
    return l.user_id === auth.currentUser?.email;
  });

  // console.log(board.list[props._id].id);
  //데이터를 리덕스에 옮김
  const addBoardData = () => {
    const new_contents_obj = {
      text: text.current.value,
      name: user_id[0]?.name,
      content_id: board.list[props._id].id,
      // content_id:
    };
    dispatch(addCommentFB({ ...new_contents_obj }));
    let input = document.getElementById("text");
    input.value = "";
  };

  //댓글 필터 쓴 글 마다
  const comment_list = comment.list.filter((l, idx) => {
    console.log(l.content_id, board.list[props._id].id);
    return board.list[props._id].id === l.content_id;
    // 게시글의 아이디와 코멘트작성시 넣은 id값이 같을 경우 출력
  });

  console.log(comment_list.length);

  const addCommentLength = () => {
    const new_contents_obj = {
      commentLength: comment_list.length + 1,
    };
    dispatch(addCommentRnkFB({ ...new_contents_obj }, RnkId));
  };

  const commentList = comment_list.map((l, idx) => {
    return (
      <CommentInner key={idx}>
        <strong>{l.name}</strong>
        <p>{l.text}</p>
      </CommentInner>
    );
  });

  return (
    <>
      <p>
        <CommentInput
          type="text"
          name="content"
          id="text"
          ref={text}
          placeholder="댓글을 입력해주세요."
        />
        <CommentBtn
          type="button"
          onClick={() => {
            addBoardData();
            addCommentLength();
          }}
          value="입력"
        />
      </p>
      <CommentWrap>{commentList}</CommentWrap>
      {/* {board.list[props._id].id === l.content_id ? (
        
      ) : null} */}
    </>
  );
};

export default Comment;

const CommentWrap = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-top: 20px;
`;
const CommentInner = styled.div`
  display: flex;
`;

const CommentInput = styled.input`
  width: 500px;
  height: 50px;
  border: none;
  border-bottom: 1px solid #cbb271;
  padding-left: 20px;
  padding-bottom: 0px;
`;
const CommentBtn = styled.input`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #ffe4a0;
  color: white;
  font-weight: bold;
  margin-top: 50px;
  transition: opacity 0.5s, transform 3s;
  &:hover {
    opacity: 0.5;
  }
`;
