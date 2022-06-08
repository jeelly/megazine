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
          <HeaderLeft>
            <LoginLink to="/">🏚️</LoginLink>
            <UserId>{user_id[0]?.name}님 안녕하세요!</UserId>
          </HeaderLeft>
          <HeaderRight>
            <Link to="/noti">🔔</Link>
            <Logout
              onClick={() => {
                signOut(auth);
              }}
            >
              Logout
            </Logout>
          </HeaderRight>
        </HeaderWrap>
      ) : (
        <LoginWrap>
          <LogoutLink to="signup">Singup</LogoutLink>
          <LogoutLink to="/">Login</LogoutLink>
        </LoginWrap>
      )}
    </>
  );
};

export default Header;

const HeaderWrap = styled.header`
  height: 5vh;
  background-color: #ffe4a0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const LoginWrap = styled.header`
  height: 5vh;
  background-color: #ffe4a0;
  display: flex;
  align-items: center;
`;
const LogoutLink = styled(Link)`
  color: black;
  font-weight: bold;
  margin-left: 1vw;
`;

const LoginLink = styled(Link)`
  color: skyblue;
  font-weight: bold;
  font-size: 30px;
  margin-left: 1vw;
`;
const UserId = styled.strong`
  margin-left: 1vw;
`;
const Logout = styled.button`
  border: none;
  font-weight: bold;
  font-size: 16px;
  background-color: transparent;
  margin: 0 1vw;
  cursor: pointer;
`;

const HeaderLeft = styled.div``;
const HeaderRight = styled.div`
  font-size: 20px;
`;
