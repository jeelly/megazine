import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { modifyBoardFB } from "../shared/FB/Board";
import { auth } from "../shared/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../shared/firebase";
//style
import styled from "styled-components";
import { documentId } from "firebase/firestore";

const Update = () => {
  console.log();
  const board = useSelector((state) => state.board);
  const { _id } = useParams();
  const [img, setImg] = React.useState("");
  const file_link_ref = React.useRef(""); //
  const dispatch = useDispatch();
  const id = board.list[_id]?.id;
  const [imageSrc, setImageSrc] = React.useState(board.list[_id]?.image);
  const users = useSelector((state) => state.user);
  const user_id = users.list.filter((l, idx) => {
    return l.user_id === auth.currentUser?.email;
  });
  let navigate = useNavigate();

  const text = React.useRef(null);
  // console.log(board.list[_id].id);
  //Radio 값 받아오기
  const [LayoutStyle, setLayoutStyle] = useState();
  //시간 받아오기
  const todayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    const hours = ("0" + today.getHours()).slice(-2);
    const minutes = ("0" + today.getMinutes()).slice(-2);

    return year + "-" + month + "-" + day + "-" + hours + ":" + minutes;
  };
  //넘겨줄 데이터를 함수에 담음
  const getInputData = () => {
    const content = text.current.value;
    const layoutStyles = LayoutStyle;
    const today = todayString(); // 입력한 날짜
    const image = imageSrc;
    if (!content) {
      alert("글 내용을 입력해주세요.");
      return false;
    } else if (!image) {
      alert("사진을 첨부해 주세요!");
      return false;
    } else if (!layoutStyles) {
      alert("레이아웃을 선택해 주세요");
      return false;
    }
    // 반환할 object
    const contents_obj = {
      content: content,
      today: today,
      image: image,
      name: user_id[0]?.name,
      layouts: layoutStyles,
      id: board.list[_id]?.id,
      commentLength: 0,
      LikeLength: 0,
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
    dispatch(modifyBoardFB({ ...new_contents_obj }, id));
  };

  //사진 스토리지에 올림
  const upLoadFB = async (e) => {
    const uploded_file = await uploadBytes(
      ref(storage, `images/${img.name}`), //경로
      img //어떤파일 올릴지
    );
    const file_url = await getDownloadURL(uploded_file.ref);
    //링크를 담는다.
    file_link_ref.current = { url: file_url };
  };

  //사진 미리보기
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  return (
    <>
      <FormWrap>
        <h3>게시글 작성</h3>
        이미지 :{""}
        <input
          type="file"
          accept="image/png, image/jpeg"
          // value=
          onChange={(e) => {
            encodeFileToBase64(e.target.files[0]);
            setImg(e.target.files[0]);
          }}
        />
        <p>레이아웃 고르기</p>
        <LeftLabelWrap>
          <RadioWrap>
            왼쪽에 배치
            <input
              type="radio"
              name="layout"
              value="left"
              onChange={(e) => setLayoutStyle(e.target.value)}
            />
          </RadioWrap>
          {imageSrc && <Img src={imageSrc} alt="preview-img" />}
        </LeftLabelWrap>
        <RightLabelWrap>
          <RadioWrap>
            오른쪽에 이미지 왼쪽에 텍스트
            <input
              type="radio"
              name="layout"
              value="right"
              onChange={(e) => setLayoutStyle(e.target.value)}
            />
          </RadioWrap>
          {imageSrc && <Img src={imageSrc} alt="preview-img" />}
        </RightLabelWrap>
        <BottomLabelWrap>
          {imageSrc && <Img src={imageSrc} alt="preview-img" />}
          <RadioBottomWrap>
            상단에 이미지 하단에 텍스트
            <input
              type="radio"
              name="layout"
              value="bottom"
              onChange={(e) => setLayoutStyle(e.target.value)}
            />
          </RadioBottomWrap>
        </BottomLabelWrap>
        <div>
          <p>게시물 내용</p>
          <Textinput
            rows="10"
            cols="40"
            name="content"
            id="content"
            ref={text}
            defaultValue={board.list[_id]?.content}
          ></Textinput>
        </div>
        <WriteBtn
          type="button"
          onClick={() => {
            upLoadFB();
            setTimeout(function () {
              updateBoardData();
              navigate(-1);
            }, 1500);
          }}
          value="게시글 작성"
        />
      </FormWrap>
    </>
  );
};

export default Update;

const FormWrap = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LeftLabelWrap = styled.label`
  border: 1px solid #ffe4a0;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
`;
const Textinput = styled.textarea`
  border: 1px solid #ffe4a0;
`;
const RightLabelWrap = styled.label`
  border: 1px solid #ffe4a0;
  display: flex;
  justify-content: space-between;
`;
const BottomLabelWrap = styled.label`
  border: 1px solid #ffe4a0;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const RadioBottomWrap = styled.div`
  width: 300px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const RadioWrap = styled.div`
  width: 300px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const Img = styled.img`
  width: 300px;
`;

const WriteBtn = styled.input`
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #ffe4a0;
  color: white;
  font-weight: bold;
  margin-top: 20px;
  transition: background-color 0.5s, transform 3s;
  &:hover {
    opacity: 0.5;
  }
`;
