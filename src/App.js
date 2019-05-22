import React, { useEffect, useState, useRef } from "react";
import api from "./api";
import GamesTable from "./components/GamesTable";
import LineGraph from "./components/LineGraph";
import BasicDatePicker from "./components/BasicDatePicker";

function App() {
  const [games, updateGames] = useState([]);
  const cached = useRef(null);

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
    }
  }

  function onClickClearFilter() {
    updateGames(cached.current);
  }

  console.log(games);
  return (
    <div className="App">
      <BasicDatePicker
        filterDate={filterDate}
        onClickClear={onClickClearFilter}
      />
      {games.length !== 0 && (
        <React.Fragment>
          <br />
          <br />
          <br />
          <br />
          <GamesTable games={games} />
          <br />
          <br />
          <LineGraph data={games} />
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
