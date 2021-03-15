import React from "react";
import { useDispatch } from "react-redux";
import { moveCell, deleteCell } from "../state";
import { FaArrowUp, FaArrowDown, FaTimes } from "react-icons/fa";
import "./ActionBar.css";

interface ActionBarInterface {
  cellId: string;
}

const ActionBar: React.FC<ActionBarInterface> = ({ cellId }) => {
  const dispatch = useDispatch();

  return (
    <div className="action-bar">
      <button
        className="button is-primary"
        onClick={() => dispatch(moveCell(cellId, "up"))}
      >
        <FaArrowUp size={12} color="#f6f6f6" />
      </button>
      <button
        className="button is-primary"
        onClick={() => dispatch(moveCell(cellId, "down"))}
      >
        <FaArrowDown size={12} color="#f6f6f6" />
      </button>
      <button
        className="button is-primary"
        onClick={() => dispatch(deleteCell(cellId))}
      >
        <FaTimes size={12} color="#f6f6f6" />
      </button>
    </div>
  );
};

export default ActionBar;
