import { useContext } from "react";
import { ITableContext } from "../types";
import { TableContext } from "./App";

const TableHeaders = () => {
  const { filteredColumns } = useContext(TableContext) as ITableContext;

  return (
    <thead>
      <tr>
        {Object.entries(filteredColumns).map((column) => (
          <th className="table-header" key={column[0]}>
            {column[1].title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeaders;
