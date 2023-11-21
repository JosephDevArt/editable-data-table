import { useContext } from "react";
import { ITableContext } from "../types";
import { TableContext } from "./App";

const TableHeaders = () => {
  const { filteredColumns } = useContext(TableContext) as ITableContext;

  return (
    <thead>
      <tr>
        {filteredColumns.map((column) => (
          <th className="table-header" key={column.id}>
            {column.title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeaders;
