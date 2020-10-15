import React, {useState, useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import EnhancedTableHead from "./Table/Table";
import CheckboxesGroup from "./GroupsList/GroupsList";
import SearchInput from "./SearchInput/SearchInput";
import Grid from "@material-ui/core/Grid";
import { toolNames } from '../../constants.js'
import axios from 'axios'

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
  item: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%'
  },
  Typography: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    marginBottom: theme.spacing(3),
    textAlign: "left",
    borderBottom: "1px solid #575757",
  },
}));

const {YOUTUBE_DL, RIP_ME, GALLERY_DL} = toolNames
export default function JobsView() {
  const classes = useStyles();
  const [jobs, setJobs] = useState([]);
  const [selectedTool, setTool] = useState(YOUTUBE_DL)

  function fetchJobs(toolName, jobTypesArr) {
      axios.get('http://localhost:8000/' + toolName + '/' + 'jobs').then(function(response) {
          setJobs(JSON.parse(response.data))
      }).catch(err => console.log(err))

  }

  function handleClick(event) {
    if (event.target.value === selectedTool) {
        setTool("");
    } else {
        setTool(event.target.value);
    }
  };

  useEffect(function() {
      console.log("use effect and seleceted tool ", selectedTool)
      fetchJobs(selectedTool)
  }, [selectedTool])

  return (
    <div className={classes.root}>
      {console.log('rendering')}
      <Typography variant="h4" className={classes.Typography}>
        Links
      </Typography>
      <Grid container spacing={1} direction="row">
        <Grid item xs={3}>
          <Grid item xs className={classes.item}>
            <SearchInput label="Search"/>
          </Grid>
          <Grid item xs className={classes.item}>
          <CheckboxesGroup selectedTool={selectedTool} handleClick={handleClick} />
         </Grid>
        </Grid>
        <Grid item xs={9}>
          <EnhancedTableHead jobs={jobs} />
        </Grid>
      </Grid>
    </div>
  );
}
