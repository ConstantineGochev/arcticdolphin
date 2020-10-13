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
import "./JobsFrom.css";

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
    marginTop: theme.spacing(10),
    marginLeft: "auto",
    marginRight: "auto",
  },
  formControl: {
    marginTop: theme.spacing(1),
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
    marginTop: theme.spacing(3),
  },
  optionsContainer: {
    marginTop: theme.spacing(1),
    // background: '#eee'
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

function DynamicOptions(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <FormControl className={classes.formControl}>
      <Typography className={classes.Typography}  align="left"> Job Options </Typography>
      {Object.keys(props.options).map((option, i) => (
        <form
          key={i}
          className={classes.optionForm}
          option={props.options[option]}
          onSubmit={props.handleAdd}
        >
          <Input
            placeholder={option}
            option={props.options[option]}
            onChange={props.handleChange}
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
      ))}
    </FormControl>
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
  const [jobParam, setJobParam] = useState([]);

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

  function handleJobOptionAdd(e) {
    e.preventDefault();
  }

  function handleJobOptionAdd(e) {
    e.preventDefault();
    const opt = e.target.getAttribute("option")
    const completeOption = opt + " " + jobOptionParam;
    console.log("complete job option = ", completeOption);
    const elemExists = checkIfOptionExists(opt, jobOptions);

    if (!elemExists) {
      setJobOptions((oldJobOptions) => [
        ...oldJobOptions,
        completeOption,
      ]);
    } else {
      setJobOptions((oldJobOptions) => {
        const opt = e.target.getAttribute("option");
        //console.log(oldDynamicOptions);
        for (let indx = 0; indx < oldJobOptions.length; indx++) {
          const splitOldOp = oldJobOptions[indx].split(" ");
          //console.log("split old op = %s  opt = %s", splitOldOp[0], opt);
          if (opt == splitOldOp[0]) {
            oldJobOptions.splice(indx, 1);
            oldJobOptions.push(completeOption);
          }
        }
        return oldJobOptions;
      });
    }
    setJobOptionParam("");

  }

  function handleDynamicOptionAdd(e) {
    e.preventDefault();
    const opt = e.target.getAttribute("option")
    const completeOption = opt + " " + toolDynamicParam;
    const elemExists = checkIfOptionExists(opt, toolDynamicOptions);

    if (!elemExists) {
      setToolDynamicOptions((oldDynamicOptions) => [
        ...oldDynamicOptions,
        completeOption,
      ]);
    } else {
      setToolDynamicOptions((oldDynamicOptions) => {
        const opt = e.target.getAttribute("option");
        //console.log(oldDynamicOptions);
        for (let indx = 0; indx < oldDynamicOptions.length; indx++) {
          const splitOldOp = oldDynamicOptions[indx].split(" ");
          //console.log("split old op = %s  opt = %s", splitOldOp[0], opt);
          if (opt == splitOldOp[0]) {
            oldDynamicOptions.splice(indx, 1);
            oldDynamicOptions.push(completeOption);
          }
        }
        return oldDynamicOptions;
      });
    }
    setToolDynamicParam("");
  }

  function handleDynamicParamChange(e) {
    setToolDynamicParam(e.target.value);
  }


  function handleJobParamChange(e) {
    console.log(e.target.value)
    setJobOptionParam(e.target.value);
  }

  const handleChangeStatic = (event) => {
    setToolStaticOptions(event.target.value);
  };

  function handleDeleteDynamicOption(chipToDelete) {
    setToolDynamicOptions((chips) => chips.filter((chip) => chip !== chipToDelete));
  }
  function handleDeleteJobOption(chipToDelete) {
    setJobOptions((chips) => chips.filter((chip) => chip !== chipToDelete));
  }
  function renderDynamicOptionsChips() {
    return toolDynamicOptions.map((dopt,i) => {
      return  (
        <li key={i}>
            <Chip
              label={dopt}
              onDelete={() => handleDeleteDynamicOption(dopt)}
              className={classes.chip}
            />
        </li>
      )
    })
  }

  function renderJobOptionsChips() {
    return jobOptions.map((dopt,i) => {
      return  (
        <li key={i}>
            <Chip
              label={dopt}
              onDelete={() => handleDeleteJobOption(dopt)}
              className={classes.chip}
            />
        </li>
      )
    })
  }
  function postDataHandler(event) {
    event.preventDefault();
    console.log("Submiting...");
    axios
      .post("http://localhost:8000/" + props.tool + "/add-job", {
        url: url,
        toolOptions: toolStaticOptions.concat(toolDynamicOptions),
        jobOptions: {
          delay: 5000,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  return (
    <React.Fragment>
      <Grid
        container
        spacing={1}
        direction="column"
        xs={12}
        className={classes.root}
      >
        <SearchInput
          value={url}
          label="URL"
          onChange={(e) => {
            console.log(e.target.value);
            return setUrl(e.target.value);
          }}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-mutiple-chip-label"> Static Options </InputLabel>
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
              <MenuItem
                key={i}
                value={props.staticOptions[staticOption]}
                style={getStyles(staticOption, toolStaticOptions, theme)}
              >
                {staticOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        xs={12}
        className={`${classes.root} ${classes.optionsContainer}`}
      >
        <Grid container xs={12} direction="row" justify="space-between">
          <Paper component="ul" className={classes.chipRoot}>
            {renderDynamicOptionsChips()}
          </Paper>
          <Grid item xs={12}>
            <Typography className={classes.Typography} align="left"> Dynamic Options </Typography>
          </Grid>

          {Object.keys(props.dynamicOptions).map((dynamicOption, i) => (
            <Grid item xs={6} key={i}>
            <form
              option={props.dynamicOptions[dynamicOption]}
              onSubmit={handleDynamicOptionAdd}
              className={classes.optionForm}
            >
              <Input
                placeholder={dynamicOption}
                option={props.dynamicOptions[dynamicOption]}
                onChange={handleDynamicParamChange}
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

        <Grid container xs={12} direction="row" justify="space-between">
          <Paper component="ul" className={classes.chipRoot}>
            {renderJobOptionsChips()}
          </Paper>
          <Grid item xs={12}>
            <Typography className={classes.Typography} align="left"> Job Options </Typography>
          </Grid>
          {Object.keys(props.jobOptions).map((jobOption, i) => (
            <Grid item xs={6} key={i}>
            <form
              option={props.jobOptions[jobOption]}
              onSubmit={handleJobOptionAdd}
              className={classes.optionForm}
            >
              <Input
                placeholder={jobOption}
                option={props.jobOptions[jobOption]}
                onChange={handleJobParamChange}
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
        </Grid>
    </React.Fragment>
  );
}
