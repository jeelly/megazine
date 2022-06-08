import React, { useState } from "react";
import { auth, db } from "../shared/firebase";
import { useParams, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDocs, addDoc, where, query, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  //라우트
  let navigate = useNavigate();
  const [name, setName] = React.useState("닉네임");
  const id_ref = React.useRef(null);
  const pw_ref = React.useRef(null);

  const loginFB = async () => {
    console.log(id_ref.current.value, pw_ref.current.value);
    const user = await signInWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    );

    const user_docs = await getDocs(
      //query 어떤 db의 어떤 컬렉션의 where 어떤 조건
      query(collection(db, "users"), where("user_id", "==", user.user.email))
    );
    //forEach 배열 만들기
    user_docs.forEach((u) => {
      console.log("sad,", u.data().name);
      setName(user_docs.name);
    });
  };

  return (
    <LoginWrap>
      {/* <p>아이디(이메일)</p> */}
      <InputWrap ref={id_ref} placeholder="아이디를 입력하세요." />
      {/* <p>비밀번호</p> */}
      <InputWrap
        ref={pw_ref}
        type="password"
        placeholder="비밀번호를 입력하세요."
      />
      <LoginBtn onClick={loginFB}>로그인</LoginBtn>
    </LoginWrap>
  );
};

export default Login;
const LoginWrap = styled.div`
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
const LoginBtn = styled.button`
  border: none;
  background-color: #cbb271;
  color: white;
  border-radius: 5px;
  padding: 8px 18px;
  font-weight: bold;
  font-size: 16px;
  transition: opacity 0.5s, transform 3s;
  &:hover {
    opacity: 0.5;
  }
`;
