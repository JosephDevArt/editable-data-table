import React from "react";

interface IProps {
  handleChange: (e: any) => void;
  rowsToShow: number;
}
const RowsAmountSelect = ({ handleChange, rowsToShow }: IProps) => {
  return (
    <>
      <label className="rowsToDisplayLabel" htmlFor="rowsToShow">
        Rows to display:
      </label>
      <select
        className="rowsAmountSelect"
        id="rowsToShow"
        onChange={handleChange}
        value={rowsToShow}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
        <option value={500}>500</option>
        <option value={1000}>1000</option>
        <option value={10000}>1000+</option>
      </select>
    </>
  );
};

export default RowsAmountSelect;
