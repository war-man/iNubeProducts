import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "../../../components/Grid/GridContainer";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Questionnaires from "./Questionnaires.jsx";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "components/CustomButtons/Button.jsx";
//import ReactTable from "react-table";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import CardBody from "components/Card/CardBody.jsx";






const style = {
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center"
    },
    inputAdornmentIcon: {
        color: "#555"
    },
    choiche: {
        textAlign: "center",
        cursor: "pointer",
        marginTop: "20px"
    },
    ...customSelectStyle,
    ...customCheckboxRadioSwitch
};
const radioAlign = {
    margin: "0 auto",
    textAlign: "center"
}

const MLFamilyBackGround = (props) => {
    console.log("FamilyBackgroundprops", props);
    console.log("My Life Styleprops2", props.FBQuesDTO);
    let classes = props.classes;
    return (
        <div>
            <br />
            <br />
            {/*Question1*/}
            <GridContainer lg={12}>
                <GridItem>
               
                    <p>   1. {(props.FBQuesDTO[0] !== undefined) ? props.FBQuesDTO[0].questionText : ""}</p>
                  
                </GridItem>
                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValueFB === "FBQues1Yes"}
                                onChange={props.handleRadioChangeFB}
                                value="FBQues1Yes"
                                name="radio1"
                                aria-label="B"
                                icon={
                                    <FiberManualRecord
                                        className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                        className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                            />
                        }
                        classes={{
                            label: classes.label
                        }}
                        label="Yes"
                    />

                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValueFB === "FBQues1No"}
                                onChange={props.handleRadioChangeFB}
                                value="FBQues1No"
                                name="radio1"
                                aria-label="B"
                                icon={
                                    <FiberManualRecord
                                        className={classes.radioUnchecked}
                                    />
                                }
                                checkedIcon={
                                    <FiberManualRecord
                                        className={classes.radioChecked}
                                    />
                                }
                                classes={{
                                    checked: classes.radio,
                                    root: classes.radioRoot
                                }}
                            />
                        }
                        classes={{
                            label: classes.label
                        }}
                        label="No"
                    />
                </GridItem>
            </GridContainer>
            {props.showFBQ1 && 
                <GridContainer xl={12}>
                <GridItem xl={12} sm={4} md={3}>
                    <Button color="info"
                        round className={props.classes.marginRight}
                        onClick={props.handleAddButton}
                        id="saveBtn" >
                        Add Family Member History
                                </Button>
                </GridItem>

            
                <GridItem lg={12}>
                    {props.familydatatable.length > 0 &&
                        <CardBody>

                            <ReactTable
                                data={props.familydatatable}
                                filterable
                                columns={[
                                    {
                                        Header: "Relationship",
                                        accessor: "relationship",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,

                                    },
                                    {
                                        Header: "Present age (If Living)",
                                        accessor: "presentage",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,
                                        /* minWidth: 150,
                                           style: { textAlign: "center" },
                                           headerClassName: 'react-table-center'*/
                                    },
                                    {

                                        Header: "State of health(If Living)",
                                        accessor: "stateofhealth",
                                        //minWidth: 150,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,
                                    },
                                    {
                                        Header: "Age at death (If Deseased)",
                                        accessor: "ageatdeath",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,
                                        /* minWidth: 150,
                                           style: { textAlign: "center" },
                                           headerClassName: 'react-table-center'*/
                                    },
                                    {

                                        Header: "Cause(If Deseased)",
                                        accessor: "cause",
                                        //minWidth: 150,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,
                                    },
                                    {

                                        Header: "DELETE",
                                        accessor: "actions",
                                        //minWidth: 150,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,
                                    },

                                ]}
                                defaultPageSize={10}
                                showPaginationTop={false}
                                // pageSize={([props.data.length + 1] < 3) ? [props.data.length + 1] : 3}
                                showPaginationBottom
                                className="-striped -highlight discription-tab"
                            />

                        </CardBody>
                    }
                </GridItem>
            </GridContainer>
}


        </div>
    )
}
export default withStyles(style)(MLFamilyBackGround);