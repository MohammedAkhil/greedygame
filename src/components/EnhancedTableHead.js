import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";
const rows = [
  { id: "game", numeric: false, disablePadding: true, label: "Game" },
  { id: "timestamp", numeric: false, disablePadding: true, label: "Timestamp" },
  { id: "revenue", numeric: true, disablePadding: false, label: "Revenue" },
  {
    id: "impressions",
    numeric: true,
    disablePadding: false,
    label: "Impressions"
  },
  { id: "eCPM", numeric: true, disablePadding: false, label: "eCPM" }
];

export default class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell />
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={"left"}
                padding={"none"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}
