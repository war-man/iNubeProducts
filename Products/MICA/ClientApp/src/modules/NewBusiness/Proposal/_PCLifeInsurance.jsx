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
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import CardBody from "components/Card/CardBody.jsx";
//import "react-table/react-table.css";








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

const PrevCurrLifeInsurance = (props) => {
    console.log("props4", props);
    console.log("propsLifeSTyle3", props.PCQuesDTO);
    let classes = props.classes;
    return (
        <div>
           
            {/*Question1*/}
            <GridContainer lg={12}>
               
                <h6>
                    <p>1.{(props.PCQuesDTO[0] !== undefined) ? props.PCQuesDTO[0].questionText : ""}</p>
                </h6>
            
                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValueIns === "Question.1Yes"}
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
                                checked={props.selectedValueIns === "Question.1No"}
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

                {props.showPCL1 && <div>
                    <GridItem xs={12}>
                        <p>1.1 Details</p>
                </GridItem>

                    <GridItem xs={12}>
                        <div>
                            <ReactTable
                                //data={data}
                                columns={[
                                    {
                                        Header: "",
                                        columns: [
                                            {

                                                Header: "POLICY NO",
                                                accessor: "PolicyNo",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                 minWidth: 60,
                                                resizable: true,
                                                /* minWidth: 150,
                                                   style: { textAlign: "center" },
                                                   headerClassName: 'react-table-center'*/
                                            },
                                            {

                                                Header: "TOTAL SA AT DEATH",
                                                accessor: "TotalSA",
                                                //width:150,
                                                //minWidth: 150,
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 60,
                                                resizable: false,
                                            },
                                            {
                                                Header: "ACCIDENTAL BENIFIT AMOUNT",
                                                accessor: "AccidentalDeath",
                                                //minWidth: 150,
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 90,
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
                                        ]
                                    },

                                ]}
                                defaultPageSize={2}
                                //style={{
                                //    width: "70%"
                                //}}
                                className="-striped -highlight discription-tab"
                            />

                        </div>
                    </GridItem> </div>}

            {/*Question2*/}
                <h6>
                    <p>2.{(props.PCQuesDTO[1] !== undefined) ? props.PCQuesDTO[1].questionText : ""}</p>
                </h6>

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
                <h6>
                    <p>2.{(props.PCQuesDTO[2] !== undefined) ? props.PCQuesDTO[2].questionText : ""}</p>
                </h6>

                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValue === "Question.3Yes"}
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
                                checked={props.selectedValue === "Question.3No"}
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

            
            </GridContainer>

          
        </div>
    )
}
export default withStyles(style)(PrevCurrLifeInsurance);