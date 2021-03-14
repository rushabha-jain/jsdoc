import { Cell } from "../cell";
import { Action, Direction } from "../actions";
import { ActionType } from "../action-types";

interface CellsState {
  data: {
    [key: string]: Cell;
  };
  error: string | null;
  loading: boolean;
  order: string[];
}

const initialState: CellsState = {
  data: {},
  error: null,
  loading: false,
  order: []
};

const deleteCellHelper = (data: { [key: string]: Cell }, id: string) => {
  const newData = { ...data };
  delete newData[id];
  return newData;
};

const updateCellHelper = (
  data: { [key: string]: Cell },
  id: string,
  content: string
): { [key: string]: Cell } => {
  const newData = { ...data };
  newData[id].content = content;
  return newData;
};

const moveCellHelper = (
  order: string[],
  id: string,
  direction: Direction
): string[] => {
  const array = order.slice();

  const currentIndex = array.findIndex(cellId => cellId === id);
  const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
  if (targetIndex < 0 || targetIndex > array.length - 1) {
    return order;
  }
  const temp = array[currentIndex];
  array[currentIndex] = array[targetIndex];
  array[targetIndex] = temp;

  return array;
};

const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};

export default function cellReducers(
  state: CellsState = initialState,
  action: Action
): CellsState {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      const updateCellPayload = action.payload;
      return {
        ...state,
        data: updateCellHelper(
          state.data,
          updateCellPayload.id,
          updateCellPayload.content
        )
      };
    case ActionType.DELETE_CELL:
      const deleteCellPayload = action.payload;
      return {
        ...state,
        data: deleteCellHelper(state.data, deleteCellPayload),
        order: state.order.filter(cellId => cellId !== deleteCellPayload)
      };
    case ActionType.MOVE_CELL:
      const moveCellPayload = action.payload;
      return {
        ...state,
        order: moveCellHelper(
          state.order,
          moveCellPayload.id,
          moveCellPayload.direction
        )
      };
    case ActionType.INSET_CELL_BEFORE:
      const insertCellBeforePayload = action.payload;
      const newCell: Cell = {
        id: randomId(),
        content: "",
        type: insertCellBeforePayload.type
      };
      if (!insertCellBeforePayload.id) {
        return {
          ...state,
          data: {
            ...state.data,
            [newCell.id]: newCell
          },
          order: [...state.order, newCell.id]
        };
      }
      // Get the currentIndex of cell before which new cell will be added!
      const foundIndex = state.order.findIndex(
        cellId => cellId === insertCellBeforePayload.id
      );
      return {
        ...state,
        data: {
          ...state.data,
          [newCell.id]: newCell
        },
        order: [
          ...state.order.slice(0, foundIndex),
          newCell.id,
          ...state.order.slice(foundIndex)
        ]
      };
    default:
      return state;
  }
}
