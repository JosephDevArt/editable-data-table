// components/TableRow.jsx
import { useContext, useState } from "react";
import TableRow from "./TableRow";
import { DataRow, ITableContext } from "../types";
import Button from "./Button";
import { TableContext } from "./App";

interface IPropos {
  row: DataRow;
  draggable: boolean;
}

const TableRowGroup = ({ row, draggable }: IPropos) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { handleUngroup } = useContext(TableContext) as ITableContext;

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <tr>
        <td className="cell-btns">
          <Button
            className="btn btn-collapse"
            handleClick={handleCollapse}
            text={isCollapsed ? "Expand" : "Collapse"}
          />
          <Button
            className="btn btn-ungroup"
            handleClick={() => handleUngroup(row.id)}
            text={"Ungroup"}
          />
        </td>
      </tr>
      {!isCollapsed &&
        row.subRows.map((subRow: DataRow) => (
          <TableRow
            key={subRow.id}
            parentRowId={row.id}
            draggable={draggable}
            row={subRow}
          />
        ))}
    </>
  );
};

export default TableRowGroup;
