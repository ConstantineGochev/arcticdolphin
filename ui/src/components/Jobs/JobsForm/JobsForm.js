import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { makeStyles, useTheme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import SearchInput from "../../Jobs/SearchInput/SearchInput";
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  Button: {
    width: "fit-content",
    fontWeight: "bold",
    textTransform: "none",
  },
  addButton: {
    display: 'block',
    color: "#575757",
    border: "2px solid #575757",
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(option, opts, theme) {
  return {
    fontWeight:
      opts.indexOf(option) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
function DynamicOptions (props) {

    const classes = useStyles();
    const theme = useTheme();

    return (

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">{props.label}</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={props.optionsVal}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {
                  props.optionsVal.map((value, i) => {
                    return <Chip key={i} label={value} className={classes.chip} />
                  })
              }
            </div>
          )}
          MenuProps={MenuProps}
        >
          {Object.keys(props.options).map((option, i) => (
            <form key={i} style={{display: 'flex'}} option={props.options[option]} onSubmit={props.handleAdd}>
                <Input disabled value={option} option={props.options[option]} />
                <Input onChange={props.handleChange}/>
                <Input type="submit" value="Add" />
            </form>
          ))}
        </Select>
      </FormControl>

    )

}
export default function JobsForm(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [url, setUrl] = useState("");
  const [toolDynamicOptions, setToolDynamicOptions] = useState([]);
  const [toolDynamicParam, setToolDynamicParam] = useState([]);
  const [toolStaticOptions, setToolStaticOptions] = useState([]);
  const [jobOptions, setJobOptions] = useState([]);
  const [jobParam, setJobParam] = useState([]);

  function checkIfOptionExists(op) {
      let exists = false
      console.log('tool options = ',toolDynamicOptions)
      toolDynamicOptions.map(tdop => {
      console.log('tdop that blows = ', tdop);
      const splitted = tdop.split(' ');
      console.log("sliced = ",splitted)
          if(op == splitted[0]) {
            console.log('inside')
            exists = true
          }
      })
    return exists
  }
  function handleJobOptionAdd (e) {
      e.preventDefault();

  }

  function handleDynamicOptionAdd (e) {
      e.preventDefault();
      const completeOption = e.target.getAttribute('option') + ' ' + toolDynamicParam;
      const elemExists = checkIfOptionExists(e.target.getAttribute('option'))
      console.log(elemExists)
      if(!elemExists) {
        console.log('first if');
        setToolDynamicOptions(oldDynamicOptions => [...oldDynamicOptions, completeOption])
      } else {
          setToolDynamicOptions(oldDynamicOptions => {

              const opt = e.target.getAttribute('option')
              console.log(oldDynamicOptions)
              for (let indx = 0; indx < oldDynamicOptions.length; indx++) {

                  const splitOldOp = oldDynamicOptions[indx].split(' ')
                  console.log('split old op = %s  opt = %s', splitOldOp[0], opt)
                  if(opt == splitOldOp[0]) {
                      oldDynamicOptions.splice(indx, 1)
                      oldDynamicOptions.push(completeOption)
                  }

              }
              return  oldDynamicOptions
          })
      }
      setToolDynamicParam('')
  }
  function handleDynamicParamChange (e) {
        //console.log(e.target)
        setToolDynamicParam(e.target.value)
  }
  function handleJobParamChange (e) {
        setJobParam(e.target.value)
  }
  const handleChangeStatic = (event) => {
    setToolStaticOptions(event.target.value);
  };

  function postDataHandler(event) {
    event.preventDefault();
    console.log("Submiting...")
    axios.post('http://localhost:8000/'+ props.tool+ '/add-job', {
        url: url,
        toolOptions: toolStaticOptions.concat(toolDynamicOptions),
        jobOptions: { delay: 5000 },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
      <Grid container spacing={1} direction="row">
        <div className={classes.root}>
        <SearchInput
          value={url}
          placeholder='input url here...'
          onChange={(e) => {
            console.log(e.target.value)
            return setUrl(e.target.value)
          }}
        />
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Static Options</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={toolStaticOptions}
          onChange={handleChangeStatic}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {Object.keys(props.staticOptions).map((staticOption, i) => (
            <MenuItem key={i} value={props.staticOptions[staticOption]} style={getStyles(staticOption, toolStaticOptions, theme)}>
              {staticOption}
            </MenuItem>
          ))}
        </Select>

      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Dynamic</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={toolDynamicOptions}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {
                  toolDynamicOptions.map((value, i) => {
                    return <Chip key={i} label={value} className={classes.chip} />
                  })
              }
            </div>
          )}
          MenuProps={MenuProps}
        >
          {Object.keys(props.dynamicOptions).map((dynamicOption, i) => (
            <form key={i} style={{display: 'flex'}} option={props.dynamicOptions[dynamicOption]} onSubmit={handleDynamicOptionAdd}>
                <Input disabled value={dynamicOption} option={props.dynamicOptions[dynamicOption]} />
                <Input onChange={handleDynamicParamChange}/>
                <Input type="submit" value="Add" />
            </form>
          ))}
        </Select>
      </FormControl>
    {/*<FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Job Options</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={jobOptions}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {
                  jobOptions.map((value, i) => {
                    return <Chip key={i} label={value} className={classes.chip} />
                  })
              }
            </div>
          )}
          MenuProps={MenuProps}
        >
          {Object.keys(props.jobOptions).map((jobOption, i) => (
            <form key={i} style={{display: 'flex'}} option={props.jobOptions[jobOption]} onSubmit={handleJobOptionAdd}>
                <Input disabled value={jobOption} option={props.jobOptions[jobOption]} />
                <Input onChange={handleJobParamChange}/>
                <Input type="submit" value="Add" />
            </form>
          ))}
        </Select>
      </FormControl>*/}
        <DynamicOptions label="Job Options" optionsVal={jobOptions} options={props.jobOptions} handleAdd={handleJobOptionAdd} handleChange={handleJobParamChange} />
        <Button variant="contained"
        onClick={ postDataHandler}
        >
          Add Job
        </Button>
        </div>
      </Grid>
  );
}
