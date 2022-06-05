import React from "react";

const Write = () => {
  return (
    <>
      <form>
        <h3>게시글 작성</h3>
        이미지 : <input type="file" />
        <p>레이아웃 고르기</p>
        <p>
          <label>
            왼쪽에 배치
            <input type="radio" name="layout" value="left" />
          </label>
        </p>
        <p>
          <label>
            오른쪽에 이미지 왼쪽에 텍스트
            <input type="radio" name="layout" value="right" />
          </label>
        </p>
        <p>
          <label>
            하단에 이미지 상단에 텍스트
            <input type="radio" name="layout" value="bottom" />
          </label>
        </p>
        <p>
          <p>게시물 내용</p>
          <textarea rows="10" cols="80" name="contents"></textarea>
        </p>
        <input type="button" value="게시글 작성" />
      </form>
    </>
  );
};

export default Write;
