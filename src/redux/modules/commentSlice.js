import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    list: [],
  },
  reducers: {
    loadComment: (state, action) => {
      state.list.push(...action.payload);
    },
    addComment(state, action) {
      // console.log("addBoard", action.payload);
      state.list.push(action.payload);
    },
    // deleteComment(state, action) {
    //   const newState = state.list.filter((l, idx) => {
    //     return parseInt(action.payload) !== idx;
    //   });
    //   state.list = newState;
    // },
  },
});

export const commentActions = commentSlice.actions;
export const { loadComment, addComment, deleteComment } = commentSlice.actions;
export default commentSlice.reducer;
