import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { NavLink } from "react-router-dom";

import "./Toolbar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#575757",
    color: "#fff",
  },
  menuButton: {
    marginRight: theme.spacing(7),
  },
  Typography: {
    height: "52px",
    display: "flex",
    alignItems: "center",
  },
  NavLink: {
    textDecoration: "none",
    color: "inherit",
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },
}));

export default function NavToolbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Toolbar variant="dense">
        <Typography variant="h5" className={classes.NavLink}>
          <a className={classes.NavLink} href="/jobs">
            Arctic Dolphin
          </a>
        </Typography>

        <Typography variant="h6" className={classes.Typography}>
          <NavLink className={classes.NavLink} to="/dashboard">
            Dashboard
          </NavLink>
        </Typography>

        <Typography variant="h6" className={classes.Typography}>
          <NavLink className={classes.NavLink} to="/jobs">
            Jobs
          </NavLink>
        </Typography>

        <Typography variant="h6" className={classes.Typography}>
          <NavLink className={classes.NavLink} to="/create-groups">
            Create Groups
          </NavLink>
        </Typography>
        <Typography variant="h6" className={classes.Typography}>
          <NavLink className={classes.NavLink} to="/groups">
            Groups
          </NavLink>
        </Typography>
        <Typography variant="h6" className={classes.Typography}>
          <NavLink className={classes.NavLink} to="/create-jobs">
            Create Jobs
          </NavLink>
        </Typography>

        <Typography variant="h6" className={classes.Typography}>
          <NavLink className={classes.NavLink} to="/downloads">
            Downloads
          </NavLink>
        </Typography>
      </Toolbar>
    </div>
  );
}
