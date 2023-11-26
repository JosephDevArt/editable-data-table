// components/TableRow.jsx
import React, { useContext } from "react";
import TableCell from "./TableCell";
import { TableContext } from "./App";
import { ITableContext, DataRow } from "../types";

interface IPropos {
  row: DataRow;
  parentRowId?: string;
  draggable: boolean;
}

const TableRow = ({ row, draggable, parentRowId }: IPropos) => {
  const { filteredColumns, handleGroup } = useContext(
    TableContext
  ) as ITableContext;

  const handleDrag = (e: React.DragEvent, rowId: string) => {
    e.dataTransfer.setData("rowId", rowId);
  };

  const handleDrop = (e: React.DragEvent, droppedOnRowId: string) => {
    handleGroup(droppedOnRowId, e.dataTransfer.getData("rowId"));
  };

  const handleDragOver = (e: React.DragEvent) => {
    // must preventDefault to make Drag&Drop work properly
    if (draggable) e.preventDefault();
  };

  return (
    <>
      <tr
        draggable={draggable}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, row.id)}
        onDragStart={(e) => {
          handleDrag(e, row.id);
        }}
      >
        {Object.entries(filteredColumns).map((column) => (
          <TableCell
            key={column[0]}
            rowId={row.id}
            parentRowId={parentRowId}
            column={column[1]}
            columnId={column[0]}
            value={row[column[0]]}
          />
        ))}
      </tr>
    </>
  );
};

export default TableRow;
