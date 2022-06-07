import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const tempSlice = createSlice({
  name: "temp",
  initialState: {
    list: [],
  },
  reducers: {
    addtemp(state, action) {
      console.log("슬라이스값", action.payload);
      state.list.push(action.payload);
    },
  },
});

// export const boardActions = userSlice.actions;
export const { loadtemp, addtemp } = tempSlice.actions;
export default tempSlice.reducer;
