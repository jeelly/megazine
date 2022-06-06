import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../shared/firebase";
import { signOut } from "firebase/auth";
import styled from "styled-components";

//redux
import { useSelector, useDispatch } from "react-redux";
const Header = (props) => {
  const is_login = props.is_login;
  // const users = useSelector((state) => state.user);
  // console.log(users.list[1].name);
  return (
    <>
      {is_login ? (
        <HeaderWrap>
          <LoginLink to="/">🏚️</LoginLink>
          <UserId>님 안녕하세요!</UserId>
          <LoginLink to="#">🔔</LoginLink>
          <button
            onClick={() => {
              signOut(auth);
            }}
          >
            로그아웃
          </button>
        </HeaderWrap>
      ) : (
        <HeaderWrap>
          <LogoutLink to="signup">회원가입</LogoutLink>
          <LogoutLink to="/">로그인</LogoutLink>
        </HeaderWrap>
      )}
    </>
  );
};

export default Header;

const HeaderWrap = styled.header`
  height: 5vh;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: end;
`;

const LogoutLink = styled(Link)`
  color: skyblue;
  font-weight: bold;
  margin-right: 1vw;
`;

const LoginLink = styled(Link)`
  color: skyblue;
  font-weight: bold;
  margin-right: 1vw;
`;
const UserId = styled.strong`
  color: white;
`;
