import { db } from "../firebase";
import {
  loadBoard,
  addBoard,
  deleteBoard,
  modifyBoard,
} from "../../redux/modules/boardSlice";
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
export const loadBoardFB = () => {
  return async function (dispatch) {
    const board_data = await getDocs(collection(db, "board")); //DB의 보드 데이터를 받아온다
    let board = [];
    board_data.forEach((doc) => {
      board.push({ id: doc.id, ...doc.data() });
    });
    // console.log("FB", ...board);
    dispatch(loadBoard(board));
  };
};
//ADD(CREATE)
export const addBoardFB = (board) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "board"), board); //DB의 보드 데이터를 받아온다
    const board_data = { id: docRef.id, ...board };
    // console.log("리덕스", board);
    dispatch(addBoard(board_data));
  };
};
//DELETE
export const deleteBoardFB = (board_id) => {
  return async function (dispatch, getState) {
    if (!board_id) {
      window.alert("아이디가 없습니다.");
      return;
    }
    const docRef = doc(db, "board", board_id);
    await deleteDoc(docRef);

    const _board_list = getState().board.list;
    const board_index = _board_list.findIndex((b) => {
      return b.id === board_id;
    });
    // console.log(board_index);
    dispatch(deleteBoard(board_index));
  };
};
//MODIFY
export const modifyBoardFB = (board, board_id) => {
  return async function (dispatch) {
    console.log("dasd", board);
    const docRef = doc(db, "board", board_id);
    await updateDoc(docRef, board);
    dispatch(modifyBoard(board));
  };
};
