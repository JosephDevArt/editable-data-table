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
        {Object.entries(columns).map((column) => (
          <div className="filter-list__filter" key={column[0]}>
            <input
              type="checkbox"
              className="filter-list__checkbox"
              id={column[0]}
              checked={filters[column[0]] || false}
              onChange={() => handleCheckboxChange(column[0])}
            />
            <label htmlFor={column[0]}>{column[1].title}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterList;
