import React from "react";
import { useDispatch } from "react-redux";
import { insertCellAfter } from "../state";

interface AddCellProps {
  insertCellAfterId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ insertCellAfterId }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <button
        onClick={() => dispatch(insertCellAfter(insertCellAfterId, "code"))}
      >
        Code
      </button>
      <button
        onClick={() => dispatch(insertCellAfter(insertCellAfterId, "text"))}
      >
        Text
      </button>
    </div>
  );
};

export default AddCell;
