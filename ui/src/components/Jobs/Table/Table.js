import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ControllerButton from "./ControllerBtn/ControllerButton";
import TablePagination from "@material-ui/core/TablePagination";
import GroupsTag from "../Table/GroupsTag/GroupsTag";
import moment from "moment";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#BFBFBF",
    border: "2px solid black",
    color: "black",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: "1.25rem",
    width: "200px",
    marginRight: theme.spacing(3),
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    border: "2px solid black",
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  tableContainer: {
    marginLeft: "-1.7rem",
  },
  tableCell: {
    border: "2px solid black",
    fontSize: "0.8rem",
    padding: theme.spacing(0.5),
  },
  groupsTagCell: {
    paddingLeft: theme.spacing(0.3),
    paddingTop: theme.spacing(1.5),
    display: "flex",
    flexWrap: "wrap",
    border: "none",
    fontSize: "0.7rem",
  },
  dateCell: {
    minWidth: "100px",
  },
  tableHead: {
    width: "fit-content",
    padding: theme.spacing(0.5),
    fontSize: "1rem",
  },
  pagination: {
    marginRight: theme.spacing(1)
  }
}));
function toDate(timestamp) {
  return moment(timestamp).format("DD.MM.YYYY HH:MM:SS");
}
export default function CustomizedTables(props) {
  const classes = useStyles();
  // Pagitation setup - start
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    console.log(parseInt(event.target.value, 10))
    setPage(0);
  };
  // Pagitation setup - end

  console.log(props.jobs);
  return (
    <React.Fragment>
      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.tableHead}>
                ID
              </StyledTableCell>
              <StyledTableCell className={classes.tableHead}>
                URL
              </StyledTableCell>
              <StyledTableCell className={classes.tableHead}>
                Groups
              </StyledTableCell>
              <StyledTableCell className={classes.tableHead}>
                Processed On
              </StyledTableCell>
              <StyledTableCell className={classes.tableHead}>
                Finished On
              </StyledTableCell>
              <StyledTableCell className={classes.tableHead}>
                Job Options
              </StyledTableCell>
              <StyledTableCell
                className={classes.tableHead}
                align="center"
              ></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.jobs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tableCell}>
                    {row.data.url}
                  </StyledTableCell>
                  <StyledTableCell
                    className={`${classes.tableCell} ${classes.groupsTagCell}`}
                  >
                    <GroupsTag />
                    <GroupsTag />
                    <GroupsTag />
                  </StyledTableCell>
                  <StyledTableCell
                    className={`${classes.tableCell} ${classes.dateCell}`}
                  >
                    {toDate(row.processedOn)}
                  </StyledTableCell>
                  <StyledTableCell
                    className={`${classes.tableCell} ${classes.dateCell}`}
                  >
                    {toDate(row.finishedOn)}
                  </StyledTableCell>
                  <StyledTableCell
                    className={`${classes.tableCell} ${classes.dateCell}`}
                  >
                    {Object.keys(row.opts).map(function (key, index) {
                      // console.log(key);
                      // console.log(row.opts[key]);
                      return (
                        <div style={{ display: "flex" }} key={index}>
                          <div>{key}</div> - <div>{row.opts[key]}</div>
                        </div>
                      );
                    })}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tableCell}>
                    <ControllerButton />
                  </StyledTableCell>
                </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={`${props.jobs.length}`}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        className={classes.pagination}
      />
    </React.Fragment>
  );
}
