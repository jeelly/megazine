import { useState } from "react";
import React, { useRef } from "react";
//router
import { useNavigate } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import { addBoard } from "../redux/modules/boardSlice";
import { addBoardFB } from "../shared/FB/Board";
//style
import styled from "styled-components";
//firebase
import { auth } from "../shared/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../shared/firebase";

const Write = () => {
  const users = useSelector((state) => state.user);
  const user_id = users.list.filter((l, idx) => {
    return l.user_id === auth.currentUser?.email;
  });

  let navigate = useNavigate();
  const text = React.useRef(null);
  const dispatch = useDispatch();
  const uid = auth.currentUser?.uid;
  const file_link_ref = React.useRef(null); //
  const [imageSrc, setImageSrc] = React.useState("");
  const [img, setImg] = React.useState("");

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

  const getInputData = () => {
    const content = text.current.value;
    const today = todayString(); // 입력한 날짜
    const image = file_link_ref.current?.url;
    const layoutStyles = LayoutStyle;
    console.log(image);
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
      uid: uid,
      image: image,
      layouts: layoutStyles,
      name: user_id[0]?.name,
      commentLength: 0,
      LikeLength: 0,
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
    dispatch(addBoardFB({ ...new_contents_obj }));
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

  const upLoadFB = async (e) => {
    const uploded_file = await uploadBytes(
      ref(storage, `images/${img.name}`), //경로
      img //어떤파일 올릴지
    );

    const file_url = await getDownloadURL(uploded_file.ref);
    //링크를 담는다.
    file_link_ref.current = { url: file_url };
  };

  return (
    <>
      <FormWrap>
        <Title>게시글 작성</Title>
        이미지 :{" "}
        <input
          type="file"
          onChange={(e) => {
            encodeFileToBase64(e.target.files[0]);
            setImg(e.target.files[0]);
          }}
        />
        <SubTitle>레이아웃 고르기</SubTitle>
        <LeftLabelWrap>
          <RadioWrap>
            왼쪽에 이미지 오른쪽에 텍스트
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
          <SubTitle>게시물 내용</SubTitle>
          <Textinput rows="10" cols="40" name="content" ref={text}></Textinput>
        </div>
        <WriteBtn
          type="button"
          onClick={() => {
            upLoadFB();

            setTimeout(function () {
              addBoardData();
              navigate(-1);
            }, 1500);
          }}
          value="게시글 작성"
        />
      </FormWrap>
    </>
  );
};
export default Write;

const Title = styled.h3`
  margin-top: 30px;
`;

const SubTitle = styled.h3`
  text-align: center;
  margin: 20px 0;
`;

const Textinput = styled.textarea`
  border: 1px solid #ffe4a0;
`;
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
