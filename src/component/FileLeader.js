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

const FileLeader = () => {
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
  const todayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    const hours = ("0" + today.getHours()).slice(-2);
    const minutes = ("0" + today.getMinutes()).slice(-2);

    return year + "-" + month + "-" + day + "-" + hours + ":" + minutes;
  };
  console.log("어스", auth);
  const getInputData = () => {
    const content = text.current.value;
    const today = todayString(); // 입력한 날짜
    // const image = file_link_ref.current?.url || null;
    const image = file_link_ref.current?.url;
    console.log("이미지", image);
    if (!content) {
      alert("아직 입력하지 않은 항목이 있습니다.");
      return false;
    }
    // 반환할 object
    const contents_obj = {
      content: content,
      today: today,
      uid: uid,
      image: image,
      name: user_id[0]?.name,
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
    // const a = img;
    const uploded_file = await uploadBytes(
      ref(storage, `images/${img.name}`), //경로
      img //어떤파일 올릴지
    );
    const file_url = await getDownloadURL(uploded_file.ref);
    //링크를 담는다.
    file_link_ref.current = { url: file_url };
  };

  const LayoutImg = [
    { name: "RIGHT", hex: "RIGHT" },
    { name: "LEFT", hex: "LEFT" },
    { name: "BOTTOM", hex: "BOTTOM" },
  ];
  return (
    <>
      <FormWrap>
        <h3>게시글 작성</h3>
        이미지 :{" "}
        <input
          type="file"
          onChange={(e) => {
            encodeFileToBase64(e.target.files[0]);
            setImg(e.target.files[0]);
          }}
        />
        <p>레이아웃 고르기</p>
        <LeftLabelWrap>
          <RadioWrap>
            왼쪽에 배치
            <input type="radio" name="layout" value="left" />
          </RadioWrap>
          {imageSrc && <Img src={imageSrc} alt="preview-img" />}
        </LeftLabelWrap>
        <RightLabelWrap>
          <RadioWrap>
            오른쪽에 이미지 왼쪽에 텍스트
            <input type="radio" name="layout" value="right" />
          </RadioWrap>
          {imageSrc && <Img src={imageSrc} alt="preview-img" />}
        </RightLabelWrap>
        <BottomLabelWrap>
          <RadioWrap>
            하단에 이미지 상단에 텍스트
            <input type="radio" name="layout" value="bottom" />
          </RadioWrap>
          {imageSrc && <Img src={imageSrc} alt="preview-img" />}
        </BottomLabelWrap>
        <div>
          <p>게시물 내용</p>
          <textarea rows="10" cols="110" name="content" ref={text}></textarea>
        </div>
        <input
          type="button"
          onClick={() => {
            upLoadFB();
            addBoardData();
            // navigate(-1);
          }}
          value="게시글 작성"
        />
      </FormWrap>
    </>
  );
};
export default FileLeader;

const FormWrap = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LeftLabelWrap = styled.label`
  display: flex;
  flex-direction: row-reverse;
  width: 600px;
  justify-content: space-between;
`;
const RightLabelWrap = styled.label`
  display: flex;
  width: 600px;
  justify-content: space-between;
`;
const BottomLabelWrap = styled.label`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 600px;
`;

const RadioWrap = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Img = styled.img`
  width: 300px;
`;
