import React, { useState } from "react";
import { DateRange } from "react-date-range";
import moment from "moment";
import { Typography, Button } from "@material-ui/core";

function BasicDatePicker(props) {
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

      <Typography>{getFormattedDate(selectedRange.startDate)}</Typography>
      <Typography>
        {moment(selectedRange.endDate).format("YYYY-MM-DD")}
      </Typography>

      <Button variant="contained" onClick={onClickGo}>
        Search
      </Button>
      <Button variant="contained" onClick={onClickClear}>
        Clear
      </Button>
    </React.Fragment>
  );
}

export default BasicDatePicker;
