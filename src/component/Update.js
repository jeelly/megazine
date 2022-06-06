import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { modifyBoardFB } from "../shared/FB/Board";

const Update = () => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);
  const { _id } = useParams();
  const id = board.list[_id]?.id;
  let navigate = useNavigate();

  const text = React.useRef(null);

  //넘겨줄 데이터를 함수에 담음
  const getInputData = () => {
    const content = text.current.value;
    if (!content) {
      alert("아직 입력하지 않은 항목이 있습니다.");
      return false;
    }
    // 반환할 object
    const contents_obj = {
      content: content,
    };
    return contents_obj;
  };

  //데이터를 리덕스에 옮김
  const updateBoardData = () => {
    const contents_obj = getInputData();
    if (!contents_obj) return;
    const new_contents_obj = {
      ...contents_obj,
    };
    // console.log(new_contents_obj);
    dispatch(modifyBoardFB({ ...new_contents_obj }, id));
    // board.list[_id], id
    // console.log(board);
    // window.location.href = "/"; // 페이지 이동
  };
  return (
    <>
      <form>
        <h3>게시글 작성</h3>
        <div>
          <p>게시물 내용</p>
          <textarea
            rows="10"
            cols="80"
            name="content"
            ref={text}
            defaultValue={board.list[_id]?.content}
          ></textarea>
        </div>
        <input
          type="button"
          onClick={() => {
            updateBoardData();
            navigate(-1);
          }}
          value="게시글 수정"
        />
      </form>
    </>
  );
};

export default Update;
