// components/DataTable.jsx
import { useState, createContext, useEffect } from "react";
import SearchBar from "./SearchBar";
import FilterList from "./FilterList";

import Button from "./Button";
import { data, columns } from "../mockData";
import { DataColumn, DataRow, ITableContext, TableData } from "../types";
import uuid from "react-uuid";
import Table from "./Table";
import { moveStringToStartOfArray } from "../helpers";
import { useSearchParams } from "react-router-dom";

const tableData: TableData = {
  data,
  columns,
};

const sortedColumns = tableData.columns
  .slice()
  .sort((a, b) => a.ordinalNo - b.ordinalNo);

export const TableContext = createContext<ITableContext | null>(null);

const App = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState(sortedColumns);
  const [filters, setFilters] = useState<any>({});
  const [searchParams, setSearchParams] = useSearchParams({
    searchTerm: "",
  });
  const searchTerm = searchParams.get("searchTerm") || "";

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

  const handleEdit = (
    rowId: string,
    columnId: string,
    value: any,
    parentRowId?: string
  ) => {
    const newData = [...data];

    if (parentRowId) {
      // loop over subRows
      const parentRowIndex = newData.findIndex((row) => row.id === parentRowId);

      newData[parentRowIndex].subRows.filter(
        (subRow: DataRow) => subRow.id == rowId
      )[0][columnId] = value;
    } else {
      newData.filter((row) => row.id == rowId)[0][columnId] = value;
    }

    setData(newData);
  };

  const handleSelect = (
    rowId: string,
    columnId: string,
    value: string,
    parentRowId?: string
  ) => {
    const newData = [...data];

    if (parentRowId) {
      const parentRowIndex = newData.findIndex((row) => row.id === parentRowId);
      const oldOptionsArray = newData[parentRowIndex].subRows.filter(
        (subRow: DataRow) => subRow.id == rowId
      )[0][columnId];

      const newOptionsArray = moveStringToStartOfArray(oldOptionsArray, value); // without mutation
      newData[parentRowIndex].subRows.filter(
        (subRow: DataRow) => subRow.id == rowId
      )[0][columnId] = newOptionsArray;
    } else {
      const rowIndex = newData.findIndex((row) => row.id === rowId);
      const oldOptionsArray = newData.filter((row) => row.id == rowId)[0][
        columnId
      ];
      const newOptionsArray = moveStringToStartOfArray(oldOptionsArray, value); // without mutation

      newData[rowIndex][columnId] = newOptionsArray;
    }

    setData(newData);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("tableData");

    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      setData(tableData.data);
    }
  }, []);

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

  // Save data to local storage when the button is clicked
  const handleSaveClick = () => {
    localStorage.setItem("tableData", JSON.stringify(data));
  };

  const handleCancelChangesClick = () => {
    localStorage.removeItem("tableData");
  };

  const filteredColumns = columns.filter((column) => !filters[column.id]);

  const filteredData = data
    ? data.filter((row, index) => {
        const foundRows = Object.entries(row).filter((rowEntry) => {
          if (row.groupedRow) {
            const filteredSubRows = data[index].subRows.filter(
              (subRow: DataRow) => {
                const foundSubRows = Object.entries(subRow).filter(
                  (subRowEntry) => {
                    const columnType = filteredColumns.filter(
                      (column) => column.id == subRowEntry[0]
                    )[0]?.type;

                    if (!columnType) return false;

                    if (["number", "boolean", "string"].includes(columnType)) {
                      return subRowEntry[1]
                        .toString()
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());
                    } else if (columnType == "selection") {
                      return subRowEntry[1][0]
                        .toString()
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());
                    }
                    return false;
                  }
                );

                return foundSubRows.length > 0;
              }
            );

            return filteredSubRows.length > 0;
          }

          const columnType = filteredColumns.filter(
            (column) => column.id == rowEntry[0]
          )[0]?.type;

          if (!columnType) return false;

          if (["number", "boolean", "string"].includes(columnType)) {
            return rowEntry[1]
              .toString()
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          } else if (columnType == "selection") {
            return rowEntry[1][0]
              .toString()
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          }

          return false;
        });

        return foundRows.length > 0;
      })
    : [];

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
