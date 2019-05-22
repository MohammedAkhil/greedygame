import React, { useEffect, useState } from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

function TableHeader() {
  return (
    <React.Fragment>
      <TableHead>
        <TableRow>
          <TableCell>Game</TableCell>
          <TableCell align="right">Timestamp</TableCell>
          <TableCell align="right">Revenue</TableCell>
          <TableCell align="right">Impressions</TableCell>
          <TableCell align="right">eCPM</TableCell>
        </TableRow>
      </TableHead>
    </React.Fragment>
  );
}

export default TableHeader;
