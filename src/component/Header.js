import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../shared/firebase";
import { signOut } from "firebase/auth";
import styled from "styled-components";
//redux
import { useSelector, useDispatch } from "react-redux";
import { addtemp } from "../redux/modules/tempSlice";
const Header = (props) => {
  const is_login = props.is_login;
  const users = useSelector((state) => state.user);

  const user_id = users.list.filter((l, idx) => {
    return l.user_id === auth.currentUser?.email;
  });

  //리덕스에 filter값 넣으려다 실패.
  // const dispatch = useDispatch();
  // React.useEffect(() => {
  // dispatch(addtemp(user_id));
  // }, []);

  // const temp = useSelector((state) => state.temp);
  // console.log("temp", temp);

  return (
    <>
      {is_login ? (
        <HeaderWrap>
          <LoginLink to="/">🏚️</LoginLink>
          <UserId>{user_id[0]?.name}님 안녕하세요!</UserId>
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
