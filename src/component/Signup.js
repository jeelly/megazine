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
    <div>
      아이디 : <input ref={id_ref} /> <br />
      이름 : <input ref={name_ref} /> <br />
      비밀번호 : <input ref={pw_ref} type="password" />
      <br />
      비밀번호 확인 : <input ref={pw2_ref} type="password" />
      <br />
      <button
        onClick={() => {
          passwordCheck();
        }}
      >
        회원가입
      </button>
    </div>
  );
};

export default Signup;
