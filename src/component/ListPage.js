import React from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { changeName, changeAge } from "../redux/modules/boardSlice";
import { Link } from "react-router-dom";
import { useState } from "react";

//Subpage
import Card from "./Card";
function List(props) {
  const board_list = props.board.list.map((l, idx) => {
    return (
      <Link key={idx} id={idx} to={`/card/${parseInt(idx)}`}>
        <li key={idx}>
          <div>
            <p>{l.name}</p>
            <p>({l.contents})</p>
            <img src={l.image} />
          </div>
          <div>
            <p>좋아요 ?개</p>
            <p>댓글 ?개</p>
            <button>하트버튼</button>
          </div>
        </li>
      </Link>
    );
  });
  return <ul>{board_list}</ul>;
}

const Comment = (props) => {
  return null;
};

const ListPage = () => {
  const board = useSelector((state) => state.board);
  const dispatch = useDispatch();
  return (
    <>
      <List board={board} />
    </>
  );
};

export default ListPage;
