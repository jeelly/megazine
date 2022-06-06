import { createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../../shared/firebase";
import { storage } from "../../shared/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// const boardSlice = createSlice({
//   name: "cat",
//   initialState: {
//     list: [
//       {
//         name: "고양이",
//         content:
//           "고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이",
//         image:
//           "https://firebasestorage.googleapis.com/v0/b/megazine-95aec.appspot.com/o/images%2F123123.jpg?alt=media&token=688433bb-6226-46c3-a078-92c3bedb0865",
//         comment: "1번 댓글입니다.",
//       },
//     ],
//   },

//   reducers: {
//     changeName: (state, action) => {
//       //액션생성함수
//       //슬라이스는 뭘 해야되는까지 넣어준다.
//       state.name = action.payload;
//     },
//     addBoard(state, action) {
//       state.list.push(action.payload);
//     },
//   },
// });

// //사진 업로드
// export const upLoadFB = async (e) => {
//   const uploded_file = await uploadBytes(
//     ref(storage, `userimages/${e.target.files[0].name}`),
//     e.target.files[0]
//   );
//   const file_url = await getDownloadURL(uploded_file.ref);
//   //링크를 담는다.
//   file_link_ref.current = { url: file_url };
// };

// //회원가입
// export const signupFB = async () => {
//   console.log(file_link_ref);
//   const user = await createUserWithEmailAndPassword(
//     auth,
//     id_ref.current.value,
//     pw_ref.current.value
//   );
//   // console.log(user);

//   const user_data = await addDoc(collection(db, "users"), {
//     user_id: user.user.email,
//     name: name_ref.current?.value,
//     image_url: file_link_ref.current?.url,
//   });
//   window.location.href = "/"; // 페이지 이동
//   // console.log(user_data.id);
// };

// //사진 업로드
// const upLoadFB = async (e) => {
//   console.log(e.target.files);

//   const uploded_file = await uploadBytes(
//     //경로
//     ref(storage, `userimages/${e.target.files[0].name}`),
//     // 어떤파일 올릴지
//     e.target.files[0]
//   );
//   console.log(uploded_file);

//   const file_url = await getDownloadURL(uploded_file.ref);

//   console.log(file_url);

//   //링크를 담는다.
//   file_link_ref.current = { url: file_url };
// };

// //회원가입
// const signupFB = async () => {
//     console.log(file_link_ref);
//     const user = await createUserWithEmailAndPassword(
//       auth,
//       id_ref.current.value,
//       pw_ref.current.value
//     );
//     // console.log(user);

//     const user_data = await addDoc(collection(db, "users"), {
//       user_id: user.user.email,
//       name: name_ref.current?.value,
//       image_url: file_link_ref.current?.url,
//     });
//     window.location.href = "/"; // 페이지 이동
//     // console.log(user_data.id);
//   };
