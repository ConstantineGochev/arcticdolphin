import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core'
import axios from 'axios'

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
  }
}));

export default function Downloads() {
  const classes = useStyles();
  const [downloads, setDownloads] = useState({})
  function fetchDownloads() {
      axios.get('http://localhost:8000/download-dir').then(res => {
          console.log(res.data)
          setDownloads(res.data)
      }).catch(err => console.log(err))
  }

  useEffect(function() {
      fetchDownloads()
  }, [])
  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.Typography}>
        Downloads
      </Typography>
    </div>
  );
}
