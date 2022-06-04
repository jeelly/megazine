import React from "react";
import { storage } from "../shared/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Test = () => {
  const upLoadFB = async (e) => {
    console.log(e.target.files);

    const uploded_file = await uploadBytes(
      //경로
      ref(storage, `images/${e.target.files[0].name}`),
      // 어떤파일 올릴지
      e.target.files[0]
    );
    // console.log(uploded_file);

    const file_url = await getDownloadURL(uploded_file.ref);

    // console.log(file_url);

    //링크를 담는다.
    file_link_ref.current = { url: file_url };
  };

  const file_link_ref = React.useRef(null);

  return (
    <div>
      이미지 : <input type="file" onChange={upLoadFB} />
    </div>
  );
};

export default Test;
