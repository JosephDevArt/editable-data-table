import React, { useState } from "react";
import { tableData } from "../mockData";
import TableHeaders from "./TableHeaders";
import { createContext } from "vm";
import { ITableContext } from "../types";
import TableBody from "./TableBody";

const Table = () => {
  return (
    <table>
      <TableHeaders />
      <TableBody />
    </table>
  );
};

export default Table;
