import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox'
import { toolNames } from '../../../constants.js'
import RadioGroup from "@material-ui/core/RadioGroup";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  checkbox: {
    backgroundColor: '#f5f8fa',
    marginRight: theme.spacing(0.2),
    marginLeft: theme.spacing(0.2)
  },
  label: {
    color: '#575757',
    textAlign: 'left',
    fontSize: '1.5rem',
    marginBottom: theme.spacing(1.5)
  }
}));
const {YOUTUBE_DL, RIP_ME, GALLERY_DL} = toolNames

export default function CheckboxesGroup(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.label}>Tools</FormLabel>
        <RadioGroup value= {props.selectedTool}>
          <FormControlLabel className={classes.checkbox} value={YOUTUBE_DL}
            control={<CustomCheckbox  onChange={props.handleClick} name={YOUTUBE_DL} />}
            label="youtube-dl"
          />
          <FormControlLabel className={classes.checkbox} value={RIP_ME}
            control={<CustomCheckbox  onChange={props.handleClick} name={RIP_ME} />}
            label="ripme"
          />
          <FormControlLabel className={classes.checkbox} value={GALLERY_DL}
            control={<CustomCheckbox  onChange={props.handleClick} name={GALLERY_DL}/>}
            label="gallery-dl"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
