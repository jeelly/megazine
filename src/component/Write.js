import React, { useRef } from "react";
//router
import { useNavigate } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import { addBoard } from "../redux/modules/boardSlice";
import { addBoardFB } from "../shared/FB/Board";

//firebase
// import { auth } from "./shared/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../shared/firebase";

const Write = (props) => {
  let navigate = useNavigate();
  const text = React.useRef(null);
  const dispatch = useDispatch();
  const uid = props.auth.currentUser?.uid;
  const file_link_ref = React.useRef(null); //

  //시간 구하는 함수
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const hours = ("0" + today.getHours()).slice(-2);
  const minutes = ("0" + today.getMinutes()).slice(-2);
  const todayString =
    year + "-" + month + "-" + day + "-" + hours + ":" + minutes;

  //사진 업로드
  const upLoadFB = async (e) => {
    console.log(e.target.files);

    const uploded_file = await uploadBytes(
      //경로
      ref(storage, `images/${e.target.files[0].name}`),
      // 어떤파일 올릴지
      e.target.files[0]
    );
    const file_url = await getDownloadURL(uploded_file.ref);
    //링크를 담는다.
    file_link_ref.current = { url: file_url };
  };

  //넘겨줄 데이터를 함수에 담음
  const getInputData = () => {
    const content = text.current.value;
    const today = todayString;
    if (!content) {
      alert("아직 입력하지 않은 항목이 있습니다.");
      return false;
    }
    // 반환할 object
    const contents_obj = {
      content: content,
      image: file_link_ref.current?.url || null,
      today: today,
      uid: uid,
    };
    return contents_obj;
  };

  //데이터를 리덕스에 옮김
  const addBoardData = () => {
    const contents_obj = getInputData();
    if (!contents_obj) return;
    const new_contents_obj = {
      ...contents_obj,
    };
    // console.log(new_contents_obj);
    dispatch(addBoardFB({ ...new_contents_obj }));
    // console.log(board);
    // window.location.href = "/"; // 페이지 이동
  };
  const board = useSelector((state) => state.board);

  return (
    <>
      <form>
        <h3>게시글 작성</h3>
        이미지 : <input type="file" onChange={upLoadFB} />
        <p>레이아웃 고르기</p>
        <p>
          <label>
            왼쪽에 배치
            <input type="radio" name="layout" value="left" />
          </label>
          <img src={file_link_ref.current?.url} />
        </p>
        <p>
          <label>
            오른쪽에 이미지 왼쪽에 텍스트
            <input type="radio" name="layout" value="right" />
          </label>
          <img src={file_link_ref.current?.url} />
        </p>
        <p>
          <label>
            하단에 이미지 상단에 텍스트
            <input type="radio" name="layout" value="bottom" />
          </label>
          <img src={file_link_ref.current?.url} />
        </p>
        <div>
          <p>게시물 내용</p>
          <textarea rows="10" cols="80" name="content" ref={text}></textarea>
        </div>
        {/* {is_edit ? (
          <input type="button" value="게시글 수정" />
        ) : (
          <input type="button" onClick={addBoardData} value="게시글 작성" />
        )} */}
        <input type="button" onClick={addBoardData} value="게시글 작성" />
      </form>
    </>
  );
};

export default Write;
