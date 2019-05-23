import React, { useState } from "react";
import { DateRange } from "react-date-range";
import moment from "moment";
import { Typography, Button, Paper, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    padding: 32
  },
  button: {
    marginTop: 16,
    marginLeft: 26
  },
  rangeContainer: {
    display: "flex"
  },
  date: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 16
  }
});

function BasicDatePicker(props) {
  const classes = useStyles();
  const { filterDate, onClickClear } = props;
  const [selectedRange, handleDateChange] = useState({});

  function handleSelect(range) {
    handleDateChange(range);
  }

  function onClickGo() {
    filterDate({
      startDate: getFormattedDate(selectedRange.startDate),
      endDate: getFormattedDate(selectedRange.endDate)
    });
  }

  const getFormattedDate = date => moment(date).format("YYYY-MM-DD");

  return (
    <React.Fragment>
      <DateRange
        format="YYY/MM/DD"
        calendars={1}
        onInit={handleSelect}
        onChange={handleSelect}
        maxDate={moment()}
        linkedCalendars={true}
      />

      <div className={classes.rangeContainer}>
        <Paper className={classes.date}>
          {getFormattedDate(selectedRange.startDate)}
        </Paper>
        <Paper className={classes.date}>
          {moment(selectedRange.endDate).format("YYYY-MM-DD")}
        </Paper>
      </div>

      <div>
        <Button
          className={classes.button}
          variant="contained"
          onClick={onClickGo}
        >
          Search
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          onClick={onClickClear}
        >
          Clear
        </Button>
      </div>
    </React.Fragment>
  );
}

export default BasicDatePicker;
