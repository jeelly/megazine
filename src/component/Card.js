import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBoardFB } from "../shared/FB/Board";
const Card = () => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);
  const { _id } = useParams();
  let navigate = useNavigate();

  const id = board.list[_id]?.id;
  console.log(id);

  return (
    <ul key={Number(_id)}>
      <li>
        <button
          onClick={() => {
            dispatch(deleteBoardFB(id));
            navigate(-1);
          }}
        >
          삭제버튼
        </button>
      </li>
      <li>{board.list[_id]?.comment}</li>
    </ul>
  );
};

export default Card;
