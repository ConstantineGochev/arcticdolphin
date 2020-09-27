import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  background: {
    margin: theme.spacing(.2),
    width:'fit-content',
    background: '#3D6CC1',
    color: 'white',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: 'inline-block'
  },
}));

export default function GroupsTag() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.background}>ripme</div>
    </div>
  );
}