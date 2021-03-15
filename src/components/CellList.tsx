import React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import AddCell from "./AddCell";
import CellListItem from "./CellListItem";

const CellList: React.FC = () => {
  const cellListItems = useTypedSelector(state =>
    state.cells.order.map(cellId => state.cells.data[cellId])
  );
  return (
    <div>
      <AddCell insertCellAfterId={null} />
      {cellListItems.map(cell => (
        <div>
          <CellListItem cell={cell} />
          <AddCell insertCellAfterId={cell.id} />
        </div>
      ))}
    </div>
  );
};

export default CellList;
