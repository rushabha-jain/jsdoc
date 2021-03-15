import React from "react";
import { Cell } from "../state";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";
import ActionBar from "./ActionBar";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let renderedCellItem;
  if (cell.type === "code") {
    renderedCellItem = (
      <>
        <ActionBar cellId={cell.id} />
        <CodeCell cell={cell} />
      </>
    );
  } else {
    renderedCellItem = (
      <>
        <ActionBar cellId={cell.id} />
        <TextEditor cell={cell} />
      </>
    );
  }
  return <div>{renderedCellItem}</div>;
};

export default CellListItem;
