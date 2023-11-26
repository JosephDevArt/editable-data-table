export interface DataRow {
  id: string;
  [columnId: string]: any;
}

export interface DataColumn {
  id: string;
  ordinalNo: number;
  title: string;
  type: string;
  width?: number;
}

export interface ColumnConverted {
  ordinalNo: number;
  title: string;
  type: string;
  width?: number;
}

export interface DataColumnConverted {
  [id: string]: ColumnConverted;
}

export interface TableData {
  columns: DataColumn[];
  data: DataRow[] | [];
}

export interface ITableContext {
  columns: DataColumnConverted;
  filteredData: DataRow[];
  filteredColumns: DataColumnConverted;
  handleEdit: (
    rowId: string,
    columnId: string,
    value: any,
    parentRowId?: string
  ) => void;
  handleSelect: (
    rowId: string,
    columnId: string,
    value: any,
    parentRowId?: string
  ) => void;
  handleGroup: (draggedRowId: string, droppedOnRowId: string) => void;
  handleUngroup: (groupId: string) => void;
  handleSearch: (searchTerm: string) => void;
}
