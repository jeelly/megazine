import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const boardSlice = createSlice({
  name: "board",
  initialState: {
    list: [],
  },

  reducers: {
    // changeName: (state, action) => {
    //   //액션생성함수
    //   //슬라이스는 뭘 해야되는까지 넣어준다.
    //   state.name = action.payload;
    // },
    loadBoard: (state, action) => {
      // console.log("loadBoard", action.payload);
      state.list.push(...action.payload);
    },
    addBoard(state, action) {
      // console.log("addBoard", action.payload);
      state.list.push(action.payload);
    },
    deleteBoard(state, action) {
      const newState = state.list.filter((l, idx) => {
        // console.log("asd", action.payload, idx, l);
        return parseInt(action.payload) !== idx;
      });
      state.list = newState;
    },
    modifyBoard(state, action) {
      const newState = state.list.filter((l, idx) => {
        return l.id !== action.payload.id;
      });
      const newwState = [...newState, action.payload];
      state.list = newwState;
    },
    addCommentRnk(state, action) {
      const newState = [...state.list, ...action.payload];
      state.list = newState;
    },
  },
});

export const boardActions = boardSlice.actions;
export const { loadBoard, addBoard, deleteBoard, modifyBoard, addCommentRnk } =
  boardSlice.actions;
export default boardSlice.reducer;
