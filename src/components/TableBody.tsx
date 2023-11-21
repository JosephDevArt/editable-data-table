import { useContext } from "react";
import TableRow from "./TableRow";
import { TableContext } from "./App";
import TableRowGroup from "./TableRowGroup";
import { ITableContext } from "../types";

const TableBody = () => {
  const { filteredData } = useContext(TableContext) as ITableContext;

  return (
    <tbody>
      {filteredData.map((row) =>
        row.groupedRow ? (
          <TableRowGroup key={row.id} draggable={false} row={row} />
        ) : (
          <TableRow key={row.id} draggable={true} row={row} />
        )
      )}
    </tbody>
  );
};

export default TableBody;
