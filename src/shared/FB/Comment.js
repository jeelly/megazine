import { db } from "../firebase";
import { loadComment, addComment } from "../../redux/modules/commentSlice";
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
export const loadCommentFB = () => {
  return async function (dispatch) {
    const comment_data = await getDocs(collection(db, "comment")); //DB의 보드 데이터를 받아온다
    let comment = [];
    comment_data.forEach((doc) => {
      comment.push({ id: doc.id, ...doc.data() });
    });
    // console.log("FB", ...board);
    dispatch(loadComment(comment));
  };
};
//ADD(CREATE)
export const addCommentFB = (comment) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "comment"), comment); //DB의 보드 데이터를 받아온다
    const comment_data = { id: docRef.id, ...comment };
    // console.log("리덕스", board);
    dispatch(addComment(comment_data));
  };
};
