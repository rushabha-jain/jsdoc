import React from "react";
import { useDispatch } from "react-redux";
import { insertCellAfter } from "../state";
import "./AddCell.css";
import { FaPlus } from "react-icons/fa";

interface AddCellProps {
  insertCellAfterId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({
  insertCellAfterId,
  forceVisible
}) => {
  const dispatch = useDispatch();

  return (
    <div className={`add-cell-wrapper ${forceVisible && "force-visible"}`}>
      <button
        className="button is-rounded is-primary is-small"
        onClick={() => dispatch(insertCellAfter(insertCellAfterId, "code"))}
      >
        <FaPlus className="icon" color="#f6f6f6" size={14} />
        <span>Code</span>
      </button>
      <button
        onClick={() => dispatch(insertCellAfter(insertCellAfterId, "text"))}
        className="button is-rounded is-primary is-small"
      >
        <FaPlus className="icon" color="#f6f6f6" size={14} />
        <span>Text</span>
      </button>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
