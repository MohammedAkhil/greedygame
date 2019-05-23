import React, { useEffect, useState, useRef } from "react";
import api from "./api";
import GamesTable from "./components/GamesTable";
import LineGraph from "./components/LineGraph";
import BasicDatePicker from "./components/BasicDatePicker";
import { Grid, Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    padding: 24
  },
  grid: {},
  gridItem: {
    padding: 8
  },
  graph: {
    padding: 24
  },
  errorCard: {
    display: "flex"
  },
  errorContent: {
    alignSelf: "center",
    padding: 24
  }
});

function App() {
  const classes = useStyles();
  const [games, updateGames] = useState([]);
  const cached = useRef(null);

  useEffect(() => {
    (async function() {
      const gamesData = await fetchData();
      const modifiedData = calculate(gamesData);
      updateGames(modifiedData);
      cached.current = modifiedData;
    })();

    // Update the document title using the browser API
  }, []);

  const calculate = games =>
    games.map((row, index) => {
      return {
        id: index + 1,
        eCPM: (row.revenue / row.impressions) * 1000,
        ...row
      };
    });

  function filterDate(selectedRange) {
    const startDate = new Date(selectedRange.startDate);
    const endDate = new Date(selectedRange.endDate);
    console.log(startDate, endDate);

    const filteredGames = cached.current.filter(function(game) {
      const date = new Date(game.timestamp);
      return date >= startDate && date <= endDate;
    });
    console.log(filteredGames);
    updateGames(filteredGames);
  }

  async function fetchData() {
    try {
      const response = await api
        .games("https://www.mocky.io/v2/5cd04a20320000442200fc10")
        .getAll();
      if (response.status === 200) {
        return response.data;
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  function onClickClearFilter() {
    updateGames(cached.current);
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={24} className={classes.grid}>
        <Grid item xs className={classes.gridItem}>
          <BasicDatePicker
            filterDate={filterDate}
            onClickClear={onClickClearFilter}
          />
        </Grid>
        {games.length !== 0 ? (
          <React.Fragment>
            <Grid className={classes.graph} item xs>
              <LineGraph data={games} />
            </Grid>
            <Grid item xs>
              <GamesTable games={games} />
            </Grid>
          </React.Fragment>
        ) : (
          error()
        )}
      </Grid>
    </div>
  );

  function error() {
    return (
      <Card className={classes.errorCard}>
        <div className={classes.errorContent}>
          <Typography variant="h6">
            No data present in the given range.
          </Typography>
          <Typography variant="h6">Try with a different range.</Typography>
        </div>
      </Card>
    );
  }
}
export default App;
