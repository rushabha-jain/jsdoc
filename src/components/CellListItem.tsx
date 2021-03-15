import React from "react";
import { Cell } from "../state";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";
import ActionBar from "./ActionBar";
import "./CellListItem.css";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let renderedCellItem;
  if (cell.type === "code") {
    renderedCellItem = (
      <div className="cell-list-item">
        <div className="action-bar-wrapper">
          <ActionBar cellId={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </div>
    );
  } else {
    renderedCellItem = (
      <div className="cell-list-item">
        <div className="action-bar-wrapper">
          <ActionBar cellId={cell.id} />
        </div>
        <TextEditor cell={cell} />
      </div>
    );
  }
  return <div>{renderedCellItem}</div>;
};

export default CellListItem;
