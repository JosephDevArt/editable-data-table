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
        {filteredColumns.map((column) => (
          <TableCell
            key={column.id}
            rowId={row.id}
            parentRowId={parentRowId}
            column={column}
            value={row[column.id]}
          />
        ))}
      </tr>
    </>
  );
};

export default TableRow;
