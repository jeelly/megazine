import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBoardFB } from "../shared/FB/Board";
import { deleteCommentFB } from "../shared/FB/Comment";
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

  //댓글 필터 쓴 글 마다
  const comment_list = comment.list.filter((l, idx) => {
    console.log(l.content_id, board.list[_id].id);
    return board.list[_id].id === l.content_id;
    // 게시글의 아이디와 코멘트작성시 넣은 id값이 같을 경우 출력
  });
  //게시글이랑 댓글의 id가 같은것만 출력
  // console.log("aa", board.list[_id]?.id);
  // console.log("bb", comment.list);
  const [commentCount, setcommentCount] = React.useState(
    board.list[_id]?.commentLength
  );
  return (
    <CardWrap key={Number(_id)}>
      <StyledList>
        <>
          <div>
            <p style={{ textAlign: "right", marginTop: "30px" }}>
              {board.list[_id]?.today}
            </p>
            <ImgStyle src={board.list[_id]?.image} />
            <p style={{ margin: "30px 0 50px 0 " }}>
              {board.list[_id]?.content}
            </p>
            <p style={{ textAlign: "right" }}>{board.list[_id]?.name}</p>
          </div>
          <CommentWrap>
            {/* <p style={{ marginRight: "20px" }}>
              좋아요 {board.list[_id]?.LikeLength}개
            </p>
            <p>댓글 {commentCount}개</p> */}
          </CommentWrap>
        </>
        {card_uid === uId ? (
          <UdWrap>
            <UpdateLink id={_id} to={`/update/${_id}`}>
              Update
            </UpdateLink>
            <DelBtn
              onClick={() => {
                dispatch(deleteBoardFB(id));
                // dispatch(deleteCommentFB(id, comment_list));
                navigate(-1);
              }}
            >
              {" "}
              삭제
            </DelBtn>
          </UdWrap>
        ) : null}
      </StyledList>
      <Comment _id={_id}></Comment>
    </CardWrap>
  );
};

export default Card;

const CardWrap = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const StyledList = styled.li`
  /* border: 1px solid white;
  background-color: gray;
  padding: 20px; */
`;
const CommentWrap = styled.div`
  display: flex;
  margin: 30px 0 0 0;
`;
const ImgStyle = styled.img`
  /* width: 700px; */
`;

const UdWrap = styled.div`
  float: right;
`;

const DelBtn = styled.button`
  border: none;
  background-color: #cbb271;
  color: white;
  border-radius: 5px;
  padding: 8px 18px;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.5s, transform 3s;
  &:hover {
    opacity: 0.5;
  }
`;
const UpdateLink = styled(Link)`
  border: none;
  background-color: #cbb271;
  color: white;
  border-radius: 5px;
  padding: 8px 18px;
  font-weight: bold;
  font-size: 16px;
  margin-right: 5px;
  transition: opacity 0.5s, transform 3s;
  &:hover {
    opacity: 0.5;
  }
`;
