import { createSlice } from "@reduxjs/toolkit";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const boardSlice = createSlice({
  name: "cat",
  initialState: {
    list: [
      {
        name: "고양이",
        content:
          "고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이",
        image:
          "https://firebasestorage.googleapis.com/v0/b/megazine-95aec.appspot.com/o/images%2F123123.jpg?alt=media&token=688433bb-6226-46c3-a078-92c3bedb0865",
        comment: "1번 댓글입니다.",
      },
      {
        name: "고냥이",
        content:
          "고냥이고냥이고냥이고냥이고냥이고냥이고냥이고냥이고냥이고냥이고냥이고냥이",
        image:
          "https://firebasestorage.googleapis.com/v0/b/megazine-95aec.appspot.com/o/images%2F123123.jpg?alt=media&token=688433bb-6226-46c3-a078-92c3bedb0865",
        comment: "2번 댓글입니다.",
      },
      {
        name: "돼냥이",
        content:
          "돼냥이돼냥이돼냥이돼냥이돼냥이돼냥이돼냥이돼냥이돼냥이돼냥이돼냥이돼냥이돼냥이",
        image:
          "https://firebasestorage.googleapis.com/v0/b/megazine-95aec.appspot.com/o/images%2F123123.jpg?alt=media&token=688433bb-6226-46c3-a078-92c3bedb0865",
        comment: "3번 댓글입니다.",
      },
      {
        name: "멍멍이",
        content:
          "멍멍이멍멍이멍멍이멍멍이멍멍이멍멍이멍멍이멍멍이멍멍이멍멍이멍멍이멍멍이멍멍이멍멍이멍멍이",
        image:
          "https://firebasestorage.googleapis.com/v0/b/megazine-95aec.appspot.com/o/images%2F123123.jpg?alt=media&token=688433bb-6226-46c3-a078-92c3bedb0865",
        comment: "4번 댓글입니다.",
      },
    ],
  },

  reducers: {
    changeName: (state, action) => {
      //액션생성함수
      //슬라이스는 뭘 해야되는까지 넣어준다.
      state.name = action.payload;
    },
    addBoard(state, action) {
      state.list.push(action.payload);
    },
  },
});

export const boardActions = boardSlice.actions;
export const { changeName, addBoard } = boardSlice.actions;
export default boardSlice.reducer;
