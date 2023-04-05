import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FilterGroup from "./components/FilterGroup";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(5),
    backgroundColor: theme.palette.background.paper,
  },
  headings: {
    display: "flex",
    justifyContent: "center",
  },
  list: {},
}));

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://rickandmortyapi.com/api/character");
      setData(result.data.results);
      setFilteredData(result.data.results);
    };
    fetchData();
  }, []);

  const handleFilterClick = (filter) => {
    let newFilters = [...activeFilters];
    if (newFilters.includes(filter)) {
      newFilters = newFilters.filter((f) => f !== filter);
    } else {
      newFilters.push(filter);
    }
    setActiveFilters(newFilters);
    filterData(newFilters);
    console.log(filter);
  };

  const filterData = (filters) => {
    let filtered = [...data];
    if (filters.length === 0) {
      setFilteredData(filtered);
      return;
    }
    filters.forEach((filter) => {
      filtered = filtered.filter((item) => {
        switch (filter) {
          case "Alive":
            return item.status === "Alive";
          case "Human":
            return item.species === "Human";
          case "Male":
            return item.gender === "Male";
          case "Female":
            return item.gender === "Female";
          case "Alien":
            return item.species === "Alien";
          default:
            return true;
        }
      });
    });
    setFilteredData(filtered);
  };

  return (
    <div>
      <h1 className={classes.headings}>Mock Data</h1>
      <FilterGroup
        activeFilters={activeFilters}
        handleFilterClick={handleFilterClick}
      />
      <List className={classes.root}>
        {filteredData.map((item) => (
          <ListItem key={item.id}>{item.name}</ListItem>
        ))}
      </List>
    </div>
  );
}

export default App;
