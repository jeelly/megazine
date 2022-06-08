//Signup.js
import React from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../shared/firebase";
import { collection, addDoc } from "firebase/firestore";
import { storage } from "../shared/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import styled from "styled-components";

const Signup = (props) => {
  //ref
  const id_ref = React.useRef(null);
  const name_ref = React.useRef(null);
  const pw_ref = React.useRef(null);
  const pw2_ref = React.useRef(null);

  //회원가입
  const signupFB = async () => {
    const user = await createUserWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    );

    const user_data = await addDoc(collection(db, "users"), {
      user_id: user.user.email,
      name: name_ref.current.value,
    });
  };

  const passwordCheck = () => {
    if (
      !id_ref.current.value ||
      !pw_ref.current.value ||
      !name_ref.current.value
    ) {
      alert("아직 입력하지 않은 항목이 있습니다.");
      return false;
    }
    if (pw_ref.current.value === pw2_ref.current.value) {
      signupFB();
    } else {
      window.alert("비밀번호가 일치 하지 않습니다.");
    }
  };

  return (
    <SignupWrap>
      <InputWrap ref={id_ref} placeholder="아이디(이메일)을 입력해주세요." />
      <InputWrap ref={name_ref} placeholder="닉네임을 입력해주세요." />
      <InputWrap
        ref={pw_ref}
        type="password"
        placeholder="비밀번호를 입력하세요."
      />
      <InputWrap
        ref={pw2_ref}
        type="password"
        placeholder="비밀번호를 한번 더 입력하세요."
      />
      <SignupBtn
        onClick={() => {
          passwordCheck();
        }}
      >
        회원가입
      </SignupBtn>
    </SignupWrap>
  );
};

export default Signup;

const SignupWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;
const InputWrap = styled.input`
  width: 300px;
  height: 50px;
  border: none;
  border-bottom: 2px solid #ffe4a0;
  margin-top: 20px;
`;

const SignupBtn = styled.button`
  border: none;
  background-color: #cbb271;
  color: white;
  border-radius: 5px;
  padding: 8px 18px;
  font-weight: bold;
  font-size: 16px;
  margin-top: 20px;
  transition: opacity 0.5s, transform 3s;
  &:hover {
    opacity: 0.5;
  }
`;
