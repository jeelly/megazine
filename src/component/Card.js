import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch, createDispatchHook } from "react-redux";

const Card = () => {
  const board = useSelector((state) => state.board);
  const { _id } = useParams();
  console.log(_id);
  //   console.log(board.list[_id].comment);
  return (
    <ul key={Number(_id)}>
      <li>{board.list[_id].comment}</li>
    </ul>
  );
};

export default Card;
