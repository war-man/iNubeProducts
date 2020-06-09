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
import ReactTable from "react-table";
import CardBody from "components/Card/CardBody.jsx";
import "react-table/react-table.css";






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

const SpousePrevCurrLifeInsurance = (props) => {
    console.log("props", props);
    let classes = props.classes;
    return (
        <div>
           
            {/*Question1*/}
            <GridContainer lg={12}>
               
                <GridItem xs={12}>
                      1.Do you have any previous insurance proposal/policy in MEtlife with
                       Accepted/decline/postponed or not accepted on normal terms ?
                    </GridItem>
            
                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValue === "Question.1Yes"}
                                onChange={props.handleRadioChangePCIns}
                                value="Question.1Yes"
                                name="radio2"
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
                                checked={props.selectedValue === "Question.1No"}
                                onChange={props.handleRadioChangePCIns}
                                value="Question.1No"
                                name="radio2"
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


                {/*Question2*/}
                <GridItem xs={12}>
                    2..Do you have any previous insurance proposal/policy in another insurance 
                    companies with Accepted/decline/postponed or not accepted on normal terms ?
                    </GridItem>

                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValue === "Question.2Yes"}
                                onChange={props.handleRadioChangePCIns}
                                value="Question.2Yes"
                                name="radio2"
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
                                checked={props.selectedValue === "Question.2No"}
                                onChange={props.handleRadioChangePCIns}
                                value="Question.2No"
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

                {/*Question3*/}
                <GridItem xs={12}>
                    3.Have you made any claim under a Life / Health Insurance Policy of Metlife 
                    Insurance or any other Insurance Company ?
                    </GridItem>

                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValueC === "Question.3Yes"}
                                onChange={props.handleRadioChangePCIns}
                                value="Question.3Yes"
                                name="radio2"
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
                                checked={props.selectedValueC === "Question.3No"}
                                onChange={props.handleRadioChangePCIns}
                                value="Question.3No"
                                name="radio2"
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

                {props.showPCL3 &&<div>
                    <GridItem xs={12}>
                    1.1 Details
                </GridItem>

                    <GridItem xs={12}>
                        <div>
                        <CardBody>
                            <ReactTable
                                data={props.data1}
                                //style={{ width: "60%",overflow:"auto" }}
                                filterable
                                columns={[
                                   
                                    {
                                        Header: "POLICY NO",
                                        accessor: "PolicyNo",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 60,
                                        resizable: false,
                                         minWidth: 150,
                                           style: { textAlign: "center" },
                                           headerClassName: 'react-table-center'
                                    },
                                    {

                                        Header: "TOTAL SA AT DEATH",
                                        accessor: "TotalSA",
                                        //minWidth: 150,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 60,
                                        resizable: false,
                                    },
                                    {
                                        Header: "ACCIDENTAL BENIFIT AMOUNT",
                                        accessor: "AccidentalDeath",
                                        minWidth: 150,
                                        //style: { textAlign: "center" },
                                        //headerClassName: 'react-table-center'
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        //minWidth: 90,
                                        resizable: false,
                                    },
                                    {
                                        Header: "CRITICAL ILLNESS BENIFIT",
                                        accessor: "Criticalillness",
                                        //minWidth: 150,
                                        //style: { textAlign: "center" },
                                        //headerClassName: 'react-table-center'
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 70,
                                        resizable: false,
                                    },
                                    {
                                        Header: "PERMANENT DISABILITY",
                                        accessor: "PermanentDisability",
                                        //minWidth: 150,
                                        //style: { textAlign: "center" },
                                        //headerClassName: 'react-table-center'
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 90,
                                        resizable: false,
                                    },
                                    {
                                        Header: "HOSPITALIZATION DAILY BENIFIT",
                                        accessor: "Hospitalization",
                                        //minWidth: 160,
                                        //style: { textAlign: "center" },
                                        //headerClassName: 'react-table-center'
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 120,
                                        resizable: false,
                                    },
                                    {
                                        Header: "STATUS",
                                        accessor: "Status",
                                        //minWidth: 150,
                                        //style: { textAlign: "center" },
                                        //headerClassName: 'react-table-center'
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 50,
                                        resizable: false,
                                    },
                                ]}
                                defaultPageSize={1}
                                showPaginationTop={false}
                                //pageSize={([props.data.length + 1] < 3) ? [props.data.length + 1] : 3}
                                showPaginationBottom
                                    className="-striped -highlight discription-tab"
                            />

                            </CardBody>
                            </div>

                    </GridItem> </div>}
            </GridContainer>

          
        </div>
    )
}
export default withStyles(style)(SpousePrevCurrLifeInsurance);