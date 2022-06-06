import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../shared/firebase";
import { signOut } from "firebase/auth";
const Header = (props) => {
  const is_login = props.is_login;
  return (
    <>
      {is_login ? (
        <header>
          <Link to="/">홈버튼</Link>
          <strong>유저이름</strong>
          <Link to="#">알림</Link>
          <button
            onClick={() => {
              signOut(auth);
            }}
          >
            로그아웃
          </button>
        </header>
      ) : (
        <header>
          <Link to="signup">회원가입</Link>
          <Link to="/">로그인</Link>
        </header>
      )}
    </>
  );
};

export default Header;
