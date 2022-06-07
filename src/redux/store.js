// import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// //thunk
// import thunk from "redux-thunk";
// import board from "./modules/Board";
// // import { composeWithDevTools } from "redux-devtools-extension";

// const middlewares = [thunk]; // 미들웨어 넣어줌
// const enhancer = applyMiddleware(...middlewares); // 미들웨어를 묶어서 넣어줌
// // const devtools = composeWithDevTools();
// const rootReducer = combineReducers({ board });
// // const rootReducer = combineReducers({ bucket, bucket22}); 이런식으로 여러개의 리듀서를 추가할수있음

// const store = createStore(rootReducer, enhancer);

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./modules/boardSlice";
import userReducer from "./modules/userSlice";
import tempReducer from "./modules/tempSlice";
import commentReducer from "./modules/commentSlice";

const store = configureStore({
  reducer: {
    board: boardReducer,
    user: userReducer,
    comment: commentReducer,
    temp: tempReducer,
  },
});

export default store;
