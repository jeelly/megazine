import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
  },
  reducers: {
    loadUser: (state, action) => {
      state.list.push(...action.payload);
    },
  },
});

// export const boardActions = userSlice.actions;
export const { loadUser } = userSlice.actions;
export default userSlice.reducer;
