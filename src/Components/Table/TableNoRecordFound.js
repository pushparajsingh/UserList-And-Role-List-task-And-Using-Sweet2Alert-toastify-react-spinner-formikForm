import React from "react";
import { TableRow, TableCell, CircularProgress } from "@mui/material";
import { HashLoader } from "react-spinners";

const TableNoRecordFound = ({ loading, colSpan }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center">
        {loading ? (
          <HashLoader
            color="#007aff"
            style={{ textAlign: "center" }}
            size={42}
          />
        ) : (
          <h2>No Record Found</h2>
        )}
      </TableCell>
    </TableRow>
  );
};
export default TableNoRecordFound;
