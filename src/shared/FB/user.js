import { db } from "../firebase";
import { loadUser } from "../../redux/modules/userSlice";
import {
  collection,
  doc,
  docRef, // 업데이트항목
  getDoc,
  getDocs, // 데이터 가져오기
  addDoc, //데이터 추가
  updateDoc,
  deleteDoc,
  startAfter,
} from "firebase/firestore";

//미들웨어
//LOAD
export const loadUserFB = () => {
  return async function (dispatch) {
    const user_data = await getDocs(collection(db, "users")); //DB의 보드 데이터를 받아온다
    let users = [];
    user_data.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    dispatch(loadUser(users));
  };
};
