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
  },
});

export const commentActions = commentSlice.actions;
export const { loadComment, addComment } = commentSlice.actions;
export default commentSlice.reducer;
