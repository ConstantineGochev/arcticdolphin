import React from 'react';
import { Button, makeStyles } from '@material-ui/core'
import './ControllerButton.css'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'fit-content',
    fontWeight: 'bold',
    borderRadius: '20px',
    marginLeft: theme.spacing(0.2),
    marginRight: theme.spacing(0.2),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    textTransform: "none"
  },
  container: {
    display: 'flex',
    justifyContent:'center'
  },
  queueBtn: {
    color: '#75B04E',
    border: "2px solid #75B04E",
  },
  editBtn: {
    color: '#375893',
    border: "2px solid #375893",
  },
  deleteBtn: {
    color: '#EE833A',
    border: "2px solid #EE833A",
  }
}))

function ControllerButton() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Button className={`${classes.root} ${classes.queueBtn}`} variant="outlined">Queue</Button>
      <Button className={`${classes.root} ${classes.editBtn}`} variant="outlined">Edit</Button>
      <Button className={`${classes.root} ${classes.deleteBtn}`} variant="outlined">Delete</Button>
    </div>
  );
}

export default ControllerButton;