import React, { useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadCommentFB, addCommentFB } from "../shared/FB/Comment";
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
  };

  //댓글 필터 쓴 글 마다
  const comment_list = comment.list.filter((l, idx) => {
    console.log(l.content_id, board.list[props._id].id);
    return board.list[props._id].id === l.content_id;
    // 게시글의 아이디와 코멘트작성시 넣은 id값이 같을 경우 출력
  });

  const commentList = comment_list.map((l, idx) => {
    return (
      <div key={idx}>
        <p>댓글{comment_list.length}개</p>
        <strong>{l.name}</strong>
        <p>{l.text}</p>
      </div>
    );
  });

  return (
    <>
      <p>
        <input type="text" name="content" ref={text} />
        <input
          type="button"
          onClick={() => {
            addBoardData();
          }}
          value="댓글"
        />
      </p>
      <div>{commentList}</div>
      {/* {board.list[props._id].id === l.content_id ? (
        
      ) : null} */}
    </>
  );
};

export default Comment;
