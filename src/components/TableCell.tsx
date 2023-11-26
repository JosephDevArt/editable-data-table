// components/TableCell.jsx
import { useContext } from "react";
import { TableContext } from "./App";
import { ColumnConverted, DataColumn, ITableContext } from "../types";

interface IPropos {
  value: any;
  column: ColumnConverted;
  columnId: string;
  rowId: string;
  parentRowId?: string;
}

const TableCell = ({
  column,
  columnId,
  value,
  rowId,
  parentRowId,
}: IPropos) => {
  const isSelectionList = column.type == "selection";
  const { handleEdit, handleSelect } = useContext(
    TableContext
  ) as ITableContext;

  return (
    <td className={parentRowId && "grouped-row"}>
      {isSelectionList ? (
        <select
          className="table-cell"
          style={{ width: "100%" }}
          onChange={(e) =>
            handleSelect(rowId, columnId, e.target.value, parentRowId)
          }
          name="hey"
        >
          {value?.map((option: any) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="table-cell"
          style={{ width: column.width }}
          type={column.type}
          value={value}
          onChange={(e) =>
            handleEdit(rowId, columnId, e.target.value, parentRowId)
          }
        />
      )}
    </td>
  );
};
export default TableCell;
