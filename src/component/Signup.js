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

const Signup = () => {
  //ref
  const id_ref = React.useRef(null);
  const name_ref = React.useRef(null);
  const pw_ref = React.useRef(null);
  const pw2_ref = React.useRef(null);
  const file_link_ref = React.useRef(null); //

  //사진 업로드
  const upLoadFB = async (e) => {
    console.log(e.target.files);

    const uploded_file = await uploadBytes(
      //경로
      ref(storage, `userimages/${e.target.files[0].name}`),
      // 어떤파일 올릴지
      e.target.files[0]
    );
    console.log(uploded_file);

    const file_url = await getDownloadURL(uploded_file.ref);

    console.log(file_url);

    //링크를 담는다.
    file_link_ref.current = { url: file_url };
  };

  //회원가입
  const signupFB = async () => {
    console.log(file_link_ref);
    const user = await createUserWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    );
    // console.log(user);

    const user_data = await addDoc(collection(db, "users"), {
      user_id: user.user.email,
      name: name_ref.current?.value,
      image_url: file_link_ref.current?.url,
    });
    window.location.href = "/"; // 페이지 이동
    // console.log(user_data.id);
  };

  const passwordCheck = () => {
    if (pw_ref.current.value === pw2_ref.current.value) {
      signupFB();
    } else {
      window.alert("비밀번호가 틀립니다.");
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
      이미지 : <input type="file" onChange={upLoadFB} />
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
