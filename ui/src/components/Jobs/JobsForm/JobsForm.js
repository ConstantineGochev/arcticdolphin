import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { makeStyles, useTheme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import SearchInput from "../../Jobs/SearchInput/SearchInput";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";
import "./JobsFrom.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  Button: {
    width: "25%",
    fontWeight: "bold",
    borderRadius: "20px",
    textTransform: "none",
  },
  root: {
    marginLeft: "auto",
    marginRight: "auto",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  addButton: {
    color: "#75B04E",
    fontSize: "1rem",
    border: "2px solid #75B04E",
    marginLeft: "auto",
    marginRight: "auto",
  },
  formControl: {
    marginBottom: theme.spacing(1),
    minWidth: 120,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
  },
  optionsContainer: {
  },
  optionForm: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '0.5%',
  },
  optionInput: {
    fontSize: '0.8rem',
    width: '75%',
    height: '100%',

    '&$active': {
      color: '#000',
    },
  },
  addOptionBtn: {
    fontSize: '0.7rem',
    height: '100%',
    margin: '0',
    marginLeft: theme.spacing(1),
    width: '2rem',
    padding: '0',
  },
  Typography: {
    fontSize: '1rem',
    paddingLeft: theme.spacing(2)
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  chipRoot: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chipList: {
    display: 'flex',
    listStyleType: 'none',
    flexWrap: 'wrap'
  }
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  getContentAnchorEl: null,
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

export function StaticOptions(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <FormControl className={classes.formControl}>
    <InputLabel id="demo-mutiple-chip-label"> {props.name} Options </InputLabel>
    <Select
      labelId="demo-mutiple-chip-label"
      id="demo-mutiple-chip"
      multiple
      value={props.value}
      onChange={props.handleParamChange}
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
      {Object.keys(props.options).map((staticOption, i) => (
        <MenuItem
          key={i}
          value={props.options[staticOption]}
          style={getStyles(staticOption, props.value, theme)}
        >
          {staticOption}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  )
}

export function SharedOptions(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
        <Grid container xs={12} direction="row" justify="space-between" style={{marginBottom: '15px'}}>
          <Paper component="ul" className={classes.chipRoot}>
            {props.renderChips()}
          </Paper>
          <Grid item xs={12}>
            <Typography className={classes.Typography} align="left"> {props.type} Options </Typography>
          </Grid>

          {Object.keys(props.options).map((option, i) => (
            <Grid item xs={6} key={i}>
            <form
              option={props.options[option]}
              onSubmit={props.handleOptionAdd}
              className={classes.optionForm}
            >
              <Input
                placeholder={option}
                option={props.options[option]}
                onChange={props.handleParamChange}
                className={classes.optionInput}
              />
              <Button
                type="submit"
                className={`${classes.Button} ${classes.addButton} ${classes.addOptionBtn}`}
                variant="outlined"
              >
              Add
              </Button>
            </form>
            </Grid>
          ))}
        </Grid>
  );
}

export default function JobsForm(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [url, setUrl] = useState("");
  const [toolDynamicOptions, setToolDynamicOptions] = useState([]);
  const [toolDynamicParam, setToolDynamicParam] = useState([]);
  const [jobOptionParam, setJobOptionParam] = useState([]);
  const [toolStaticOptions, setToolStaticOptions] = useState([]);
  const [jobOptions, setJobOptions] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroups] = useState('')
  const [sneckBar, setSneckBar] = useState(false);

  useEffect(function() {
    console.log("in use effect")
    fetchJGroups()
  }, [])
  
  function checkIfOptionExists(op, opts) {
    let exists = false;
    opts.map((tdop) => {
      const splitted = tdop.split(" ");
      if (op == splitted[0]) {
        exists = true;
      }
    });
    return exists;
  }

  function handleOptionAdd(e, param, setParam, options, setOptions) {
    e.preventDefault();
    const opt = e.target.getAttribute("option")
    const completeOption = opt + " " + param;
    const elemExists = checkIfOptionExists(opt, options);

    if (!elemExists) {
      setOptions((oldOptions) => [
        ...oldOptions,
        completeOption,
      ]);
    } else {
      setOptions((oldOptions) => {
        const opt = e.target.getAttribute("option");

        for (let indx = 0; indx < oldOptions.length; indx++) {
          const splitOldOp = oldOptions[indx].split(" ");
          //console.log("split old op = %s  opt = %s", splitOldOp[0], opt);
          if (opt == splitOldOp[0]) {
            oldOptions.splice(indx, 1);
            oldOptions.push(completeOption);
          }
        }
        return oldOptions;
      });
    }
    setParam("");
  }

  function handleParamChange(e, paramType) {
    const val = e.target.value
    switch (paramType) {
      case "dynamicParam":
        setToolDynamicParam(val);
        break;
      case "jobParam":
        setJobOptionParam(val);
        break;
      case "staticParam":
        setToolStaticOptions(val);
        break;
      case "groupParam":
          setSelectedGroups(val)
        break;
      case "sneckBarClose":
        setSneckBar(false);
        break
    }
  }
  function fetchJGroups() {
    axios.get("http://localhost:8000/groups").then(res => {
        console.log(res.data)
        setGroups(res.data)
    }).catch(err => console.log(err))

  }

  function handleDeleteOption(toDelete, type) {
    switch (type) {
      case "dynamicOptions":
        setToolDynamicOptions((opts) => opts.filter((op) => op !== toDelete));
        break;
      case "jobOptions":
        setJobOptions((opts) => opts.filter((op) => op !== toDelete));
        break;
    }
  }

  function renderOptionChips(options, type) {
    return options.map((dopt,i) => {
      return  (
        <li key={i}>
            <Chip
              label={dopt}
              onDelete={() => handleDeleteOption(dopt, type)}
              className={classes.chip}
            />
        </li>
      )
    })

  }

  function postDataHandler(event) {
    event.preventDefault();
    console.log("Submiting...");
    const mappedJobOptions = jobOptions.map((opt) => opt.split(' ')).reduce((obj, item) => Object.assign(obj, { [item[0]]: item[1] }), {})
    if (selectedGroup !== '') {
      var group = groups.find(gr => gr.name === selectedGroup)
    }
    console.log(group)
    axios
      .post("http://localhost:8000/" + props.tool + "/add-job", {
        group: group,
        url: url,
        toolOptions: toolStaticOptions.concat(toolDynamicOptions),
        jobOptions: mappedJobOptions,
      })
      .then((resp) => {
        console.log(resp)
        if (resp.data === 'success') {
          setUrl('')
          setSneckBar(true)
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <React.Fragment>
      <Grid
        container
        spacing={1}
        direction="column"
        className={classes.root}
      >
        <SearchInput
          value={url}
          placeholder="URL"
          onChange={(e) => {
            console.log(e.target.value);
            return setUrl(e.target.value);
          }}
        />
    <FormControl className={classes.formControl}>
    <InputLabel id="demo-mutiple-chip-label"> Group </InputLabel>
    <Select
      labelId="demo-mutiple-chip-label"
      id="demo-mutiple-chip"
      value={selectedGroup}
      onChange={(e) => handleParamChange(e, "groupParam")}
      input={<Input id="select-multiple-chip" />}
      MenuProps={MenuProps}
       >
        <MenuItem
             value=''
        >
          None
        </MenuItem>
      {groups.map((gr, i) => {
        console.log(gr)
        return (
           <MenuItem
              key={i}
             value={gr.name}
             style={getStyles(gr.name, selectedGroup, theme)}
           >
           {gr.name}
          </MenuItem>
           )})}
           
         </Select>
        </FormControl>
        <StaticOptions name="Static" value={toolStaticOptions} handleParamChange={(e) => handleParamChange(e, "staticParam")} options={props.staticOptions} />
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        className={`${classes.root} ${classes.optionsContainer}`}
      >

        <SharedOptions type="Dynamic" options={props.dynamicOptions} handleOptionAdd={(e) => handleOptionAdd(e,toolDynamicParam,setToolDynamicParam,toolDynamicOptions,setToolDynamicOptions)}
        handleParamChange={(e) => handleParamChange(e, "dynamicParam")} renderChips={() => renderOptionChips(toolDynamicOptions, "dynamicOptions")} />

        <SharedOptions type="Job" options={props.jobOptions} handleOptionAdd={(e) => handleOptionAdd(e,jobOptionParam,setJobOptionParam,jobOptions,setJobOptions)}
        handleParamChange={(e) => handleParamChange(e, "jobParam")} renderChips={() => renderOptionChips(jobOptions, "jobOptions")} />


          </Grid>
        <Grid
        container
        spacing={1}
        direction="column"
        xs={12}
        className={classes.root}
      >
          <Button
            className={`${classes.Button} ${classes.addButton}`}
            variant="outlined"
            onClick={postDataHandler}
          >
            Add Job
          </Button>
          <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center'}} open={sneckBar} autoHideDuration={4000} onClose={(e) => handleParamChange(e, "sneckBarClose")}>
            <Alert onClose={(e) => handleParamChange(e, "sneckBarClose")} severity="success">
              You have successfully added a job!
            </Alert>
          </Snackbar>
        </Grid>
    </React.Fragment>
  );
}
