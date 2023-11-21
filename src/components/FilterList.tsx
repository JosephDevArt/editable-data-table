import { useContext } from "react";
import { ITableContext } from "../types";
import { TableContext } from "./App";

interface IProps {
  handleCheckboxChange: (columnId: string) => void;
  filters: any;
}

const FilterList = ({ handleCheckboxChange, filters }: IProps) => {
  const { columns } = useContext(TableContext) as ITableContext;

  return (
    <div className="filter-list">
      <h2>Filter List</h2>
      <div className="filter-list__options">
        {columns.map((column) => (
          <div className="filter-list__filter" key={column.id}>
            <input
              type="checkbox"
              className="filter-list__checkbox"
              id={column.id}
              checked={filters[column.id] || false}
              onChange={() => handleCheckboxChange(column.id)}
            />
            <label htmlFor={column.id}>{column.title}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterList;
