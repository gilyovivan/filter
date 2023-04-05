import { Button, ButtonGroup, MenuItem, Menu } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

function FilterGroup({ activeFilters, handleFilterClick }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [toggle, setToggle] = useState("Other Filters");
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (value) => {
    handleFilterClick(value);
    setToggle(value);
    handleClose();
  };

  return (
    <div className={classes.root}>
      <ButtonGroup
        variant="text"
        color="primary"
        aria-label="text primary button group"
      >
        <Button
          className={classes.button}
          onClick={() => handleFilterClick("Alive")}
        >
          {activeFilters.includes("Alive") ? <strong>Alive</strong> : "Alive"}
        </Button>
        <Button
          className={classes.button}
          onClick={() => handleFilterClick("Human")}
        >
          {activeFilters.includes("Human") ? <strong>Human</strong> : "Human"}
        </Button>
        <Button
          className={classes.button}
          onClick={() => handleFilterClick("Male")}
        >
          {activeFilters.includes("Male") ? <strong>Male</strong> : "Male"}
        </Button>

        <Button
          value="color"
          aria-label="color"
          onClick={handleClick}
          className={classes.button}
        >
          Other Filters
          <ArrowDropDownIcon />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          keepMounted
        >
          <MenuItem disabled>Other Filters</MenuItem>
          <MenuItem
            className={classes.button}
            onClick={() => handleMenuItemClick("Female")}
          >
            {activeFilters.includes("Female") ? (
              <strong>Female</strong>
            ) : (
              "Female"
            )}
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("Alien")}>
            {activeFilters.includes("Alien") ? <strong>Alien</strong> : "Alien"}
          </MenuItem>
        </Menu>
      </ButtonGroup>
    </div>
  );
}

export default FilterGroup;
