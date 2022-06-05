import React, { useState } from "react";
import { auth, db } from "../shared/firebase";
import { useParams, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDocs, where, query, collection } from "firebase/firestore";
import { Link } from "react-router-dom";

const Login = () => {
  //라우트
  let navigate = useNavigate();
  const [name, setName] = React.useState("");
  const id_ref = React.useRef(null);
  const pw_ref = React.useRef(null);

  const loginFB = async () => {
    console.log(id_ref.current.value, pw_ref.current.value);
    const user = await signInWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    );
    console.log(user);

    const user_docs = await getDocs(
      //query 어떤 db의 어떤 컬렉션의 where 어떤 조건
      query(collection(db, "users"), where("user_id", "==", user.user.email))
    );

    //forEach 배열 만들기
    user_docs.forEach((u) => {
      console.log(u.data());
      //   setName(user_docs.name);
    });
  };
  return (
    <div>
      아이디(이메일):
      <input ref={id_ref} /> <br />
      비밀번호:
      <input ref={pw_ref} type="password" /> <br />
      <button onClick={loginFB}>로그인</button>
    </div>
  );
};

export default Login;
