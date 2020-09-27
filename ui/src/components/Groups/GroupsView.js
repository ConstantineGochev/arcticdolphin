import React from "react";
import Typography from "@material-ui/core/Typography";
import EnhancedTableHead from "../Jobs/Table/Table";
import CheckboxesGroup from "../Jobs/GroupsList/GroupsList";
import SearchInput from "../Jobs/SearchInput/SearchInput";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    minHeight: 'calc(100vh - 52px);',
    flexGrow: '1',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#F2F2F2',
  },
  Typography: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    marginBottom: theme.spacing(3),
    textAlign: "left",
    borderBottom: "1px solid #575757",
  },
}));

export default function GroupsView() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.Typography}>
        Groups
      </Typography>
      <Grid container spacing={1} direction="row">
        {/* <Grid item xs={3}>
          <Grid item>
            <SearchInput />
          </Grid>
          <Grid item>
            <CheckboxesGroup />
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <EnhancedTableHead />
        </Grid> */}
      </Grid>
    </div>
  );
}
