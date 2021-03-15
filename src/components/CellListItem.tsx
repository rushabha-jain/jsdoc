import React from "react";
import { Cell } from "../state";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let renderedCellItem;
  if (cell.type === "code") {
    renderedCellItem = <CodeCell cell={cell} />;
  } else {
    renderedCellItem = <TextEditor cell={cell} />;
  }
  return <div>{renderedCellItem}</div>;
};

export default CellListItem;
