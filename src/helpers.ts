import { DataColumn, DataRow } from "./types";

export const moveStringToStartOfArray = (
  arr: string[],
  targetString: string
) => {
  const newArr = [...arr];
  const index = newArr.indexOf(targetString);

  if (index !== -1) {
    newArr.unshift(newArr.splice(index, 1)[0]);
  }
  return newArr;
};

export const updateOptionsArray = (
  newData: DataRow[],
  rowId: string,
  parentRowId: string | undefined,
  columnId: string,
  value: string
) => {
  const updatedData = [...newData]; // Create a shallow copy of newData to avoid mutation

  let rowIndex;
  if (parentRowId) {
    rowIndex = updatedData.findIndex((row) => row.id === parentRowId);
  } else {
    rowIndex = updatedData.findIndex((row) => row.id === rowId);
  }

  const oldOptionsArray = parentRowId
    ? updatedData[rowIndex].subRows.find(
        (subRow: DataRow) => subRow.id === rowId
      )[columnId]
    : updatedData[rowIndex][columnId];

  const newOptionsArray = moveStringToStartOfArray(oldOptionsArray, value); // without mutation

  if (parentRowId) {
    updatedData[rowIndex].subRows.find(
      (subRow: DataRow) => subRow.id === rowId
    )[columnId] = newOptionsArray;
  } else {
    updatedData[rowIndex][columnId] = newOptionsArray;
  }

  return updatedData;
};

export const updateValueInData = (
  data: DataRow[],
  rowId: string,
  parentRowId: string | undefined,
  columnId: string,
  value: any
) => {
  const updatedData = [...data]; // Create a shallow copy of data to avoid mutation

  if (parentRowId) {
    const parentRowIndex = updatedData.findIndex(
      (row) => row.id === parentRowId
    );
    const subRowToUpdate = updatedData[parentRowIndex].subRows.find(
      (subRow: DataRow) => subRow.id === rowId
    );

    if (subRowToUpdate) {
      subRowToUpdate[columnId] = value;
    }
  } else {
    const rowToUpdate = updatedData.find((row) => row.id === rowId);

    if (rowToUpdate) {
      rowToUpdate[columnId] = value;
    }
  }

  return updatedData;
};

export const filterDataBySearchTerm = (
  data: DataRow[],
  filteredColumns: DataColumn[],
  searchTerm: string
) => {
  return data
    ? data.filter((row: DataRow) => {
        const foundRows = filterRowBySearchTerm(
          row,
          filteredColumns,
          searchTerm
        );

        if (row.groupedRow) {
          const filteredSubRows = row.subRows.filter((subRow: DataRow) => {
            const foundSubRows = filterRowBySearchTerm(
              subRow,
              filteredColumns,
              searchTerm
            );
            return foundSubRows.length > 0;
          });

          return filteredSubRows.length > 0;
        }

        return foundRows.length > 0;
      })
    : [];
};

function filterRowBySearchTerm(
  row: DataRow,
  filteredColumns: DataColumn[],
  searchTerm: string
) {
  return Object.entries(row).filter((rowEntry) => {
    const columnType = filteredColumns.find(
      (column) => column.id === rowEntry[0]
    )?.type;

    if (!columnType) return false;

    if (["number", "boolean", "string"].includes(columnType)) {
      return rowEntry[1]
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    } else if (columnType === "selection") {
      return rowEntry[1][0]
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    }

    return false;
  });
}
