// components/DataTable.jsx
import { useState, createContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import uuid from "react-uuid";

import SearchBar from "./SearchBar";
import FilterList from "./FilterList";
import Button from "./Button";
import Table from "./Table";

import { data, columns } from "../mockData";
import { DataRow, ITableContext, TableData } from "../types";
import {
  convertColumnsListToObject,
  filterDataBySearchTerm,
  updateOptionsArray,
  updateValueInData,
} from "../helpers";
import RowsAmountSelect from "./RowsAmountSelect";

const tableData: TableData = {
  data,
  columns,
};

const sortedColumns = tableData.columns
  .slice()
  .sort((a, b) => a.ordinalNo - b.ordinalNo);

const reducedToObjectColumns = convertColumnsListToObject(sortedColumns);

export const TableContext = createContext<ITableContext | null>(null);

const App = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState(reducedToObjectColumns);
  const [filters, setFilters] = useState<any>({});
  const [rowsToShow, setRowsToShow] = useState(50); // Default value
  const [searchParams, setSearchParams] = useSearchParams({
    searchTerm: "",
  });
  const searchTerm = searchParams.get("searchTerm") || "";

  useEffect(() => {
    const storedData = localStorage.getItem("tableData");

    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      setData(tableData.data);
    }
  }, []);

  const handleSaveClick = () => {
    localStorage.setItem("tableData", JSON.stringify(data));
  };

  const handleCancelChangesClick = () => {
    localStorage.removeItem("tableData");
  };

  const handleSearch = (searchTerm: string) => {
    setSearchParams(
      (prev) => {
        prev.set("searchTerm", searchTerm);
        return prev;
      },
      { replace: true }
    );
  };

  const handleCheckboxChange = (columnId: string) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      [columnId]: !prevFilters[columnId],
    }));
  };

  const handleGroup = (droppedOnRowId: string, draggedRowId: string) => {
    const index1 = data.findIndex((obj) => obj.id === droppedOnRowId);
    const index2 = data.findIndex((obj) => obj.id === draggedRowId);

    // Check if both objects were found
    if (index1 !== -1 && index2 !== -1) {
      const groupedRow = {
        id: uuid(),
        groupedRow: true,
        subRows: [data[index1], data[index2]],
      };

      const newData = [...data];

      // Replace the first object with the grouped object
      newData[index1] = groupedRow;
      newData.splice(index2, 1);

      // Update the state to re-render the component
      setData(newData);
    } else {
      console.error("Invalid rows's IDs ");
    }
  };

  const handleUngroup = (groupId: string) => {
    const groupIndex = data.findIndex((obj) => obj.id === groupId);
    const newData = [...data];
    newData.splice(groupIndex, 1, ...data[groupIndex].subRows);

    setData(newData);
  };

  const handleEdit = (
    rowId: string,
    columnId: string,
    value: any,
    parentRowId?: string
  ) => {
    const newData = updateValueInData(
      [...data],
      rowId,
      parentRowId,
      columnId,
      value
    );

    setData(newData);
  };

  const handleSelect = (
    rowId: string,
    columnId: string,
    value: string,
    parentRowId?: string
  ) => {
    const newData = updateOptionsArray(
      [...data],
      rowId,
      parentRowId,
      columnId,
      value
    );

    setData(newData);
  };

  // Function to handle dropdown change
  const handleRowsChange = (event: any) => {
    const selectedRows = parseInt(event.target.value, 10);
    setRowsToShow(selectedRows);
  };

  // Slice the data based on the selected number of rows
  const slicedData = data.slice(0, rowsToShow);

  const columnsAsArray = Object.entries(reducedToObjectColumns);
  const filteredColumns = Object.fromEntries(
    columnsAsArray.filter((column) => !filters[column[0]])
  );

  const filteredData = filterDataBySearchTerm(
    slicedData,
    filteredColumns,
    searchTerm
  );

  return (
    <section>
      <TableContext.Provider
        value={{
          columns,
          filteredColumns,
          filteredData,
          handleEdit,
          handleSelect,
          handleSearch,
          handleGroup,
          handleUngroup,
        }}
      >
        <div className="search-block">
          <SearchBar searchTerm={searchTerm} />
          <Button
            className="btn btn-save"
            text="Save"
            handleClick={handleSaveClick}
          />
          <Button
            className="btn btn-cancelChanges"
            text="Clean local storage"
            handleClick={handleCancelChangesClick}
          />
          <RowsAmountSelect
            handleChange={handleRowsChange}
            rowsToShow={rowsToShow}
          />
        </div>
        <div className="table-block">
          <Table />
        </div>
        <FilterList
          filters={filters}
          handleCheckboxChange={handleCheckboxChange}
        />
      </TableContext.Provider>
    </section>
  );
};

export default App;
