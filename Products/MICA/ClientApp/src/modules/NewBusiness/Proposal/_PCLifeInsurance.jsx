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
            <br />
            <br />
            {/*Question1*/}
            <GridContainer lg={12}>
                <GridItem> 
               
                    <p>1. {(props.PCQuesDTO[0] !== undefined) ? props.PCQuesDTO[0].questionText : ""}</p>
                   
                </GridItem>
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
            </GridContainer>
            {props.showPCL1 &&
                <GridContainer xl={12}>
                    <GridItem>
                        <p>1.1 Details</p>
                    </GridItem>
               
                <GridItem lg={12}>
                        
                        <CardBody>

                            <ReactTable
                                data={props.data}
                                filterable
                                columns={[
                                    {
                                        Header: "COMPANY NAME",
                                        accessor: "companyName",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,

                                    },
                                    {
                                        Header: "POLICY NO",
                                        accessor: "PolicyNo",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,
                                        /* minWidth: 150,
                                           style: { textAlign: "center" },
                                           headerClassName: 'react-table-center'*/
                                    },
                                    {

                                        Header: "TOTAL SA AT DEATH",
                                        accessor: "TotalSA",
                                        //minWidth: 150,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,
                                    },
                                    {
                                        Header: "ACCIDENTAL BENIFIT AMOUNT",
                                        accessor: "AccidentalDeath",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,
                                        /* minWidth: 150,
                                           style: { textAlign: "center" },
                                           headerClassName: 'react-table-center'*/
                                    },
                                    {

                                        Header: "CRITICAL ILLNESS BENIFIT",
                                        accessor: "Criticalillness",
                                        //minWidth: 150,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,
                                    },
                                    {

                                        Header: "PERMANENT DISABILITY",
                                        accessor: "PermanentDisability",
                                        //minWidth: 150,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,
                                    },
                                    {

                                        Header: "HOSPITALIZATION DAILY BENIFIT",
                                        accessor: "Hospitalization",
                                        //minWidth: 150,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,
                                    },
                                    {

                                        Header: "STATUS",
                                        accessor: "Status",
                                        //minWidth: 150,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,
                                    },

                                ]}
                                defaultPageSize={1}
                                showPaginationTop={false}
                                // pageSize={([props.data.length + 1] < 3) ? [props.data.length + 1] : 3}
                                showPaginationBottom
                                className="-striped -highlight discription-tab"
                            />

                        </CardBody>

                </GridItem>
            </GridContainer>
                }
                
            

            <br />
            <br />

            {/*Question2*/}

            <GridContainer lg={12}>
                <GridItem>

                    <p>2. {(props.PCQuesDTO[1] !== undefined) ? props.PCQuesDTO[1].questionText : ""}</p>

                </GridItem>
               

                <GridItem xs={12}>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={props.selectedValueIns === "Question.2Yes"}
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
                                checked={props.selectedValueIns === "Question.2No"}
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
                {props.showPCL2 &&
                    <GridItem xs={12}>
                        <p>2.1 Details</p>
                    </GridItem>
                }
                {props.showPCL2 &&
                    <GridItem xl={12} sm={4} md={3}>
                        <Button color="info"
                            round className={props.classes.marginRight}
                            //onClick={props.handleAddButton}
                            id="saveBtn" >
                            Add
                                </Button>
                    </GridItem>
                }
                {
                    props.showPCL2 &&
                    <GridItem lg={12}>

                        <CardBody>

                            <ReactTable
                                data={props.data}
                                filterable
                                columns={[
                                    {
                                        Header: "INSURANCE COMPANY NAME",
                                        accessor: "insuranceCompanyName",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,

                                    },
                                    {
                                        Header: "POLICY NO",
                                        accessor: "PolicyNo",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,
                                        /* minWidth: 150,
                                           style: { textAlign: "center" },
                                           headerClassName: 'react-table-center'*/
                                    },
                                    {

                                        Header: "SUM ASSURED",
                                        accessor: "sumAssured",
                                        //minWidth: 150,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,
                                    },
                                    {
                                        Header: "ACCIDENTAL DEATH BENIFIT",
                                        accessor: "accidentalDeathBenefit",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,
                                        /* minWidth: 150,
                                           style: { textAlign: "center" },
                                           headerClassName: 'react-table-center'*/
                                    },
                                    {

                                        Header: "CRITICAL ILLNESS BENIFIT",
                                        accessor: "criticalIllnessBenefit",
                                        //minWidth: 100,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,
                                    },
                                    {

                                        Header: "TOTAL PERMANENT DISABILITY/WAIVER",
                                        accessor: "PermanentDisability",
                                        //minWidth: 150,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,
                                    },
                                    {

                                        Header: "HOSPITALIZATION DAILY BENIFIT",
                                        accessor: "Hospitalization",
                                        //minWidth: 150,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,
                                    },
                                    {

                                        Header: "CURRENT STATUS",
                                        accessor: "Status",
                                        //minWidth: 150,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 60,
                                        resizable: false,
                                    },
                                    {

                                        Header: "DELETE",
                                        accessor: "actions",
                                        //minWidth: 150,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 60,
                                        resizable: false,
                                    },

                                ]}
                                defaultPageSize={1}
                                showPaginationTop={false}
                                // pageSize={([props.data.length + 1] < 3) ? [props.data.length + 1] : 3}
                                showPaginationBottom
                                className="-striped -highlight discription-tab"
                            />

                        </CardBody>

                    </GridItem>
                }
            </GridContainer>

            <br />
            <br />

             {/*Question3*/}
           
            <GridContainer lg={12}>
                <GridItem>

                    <p>3. {(props.PCQuesDTO[2] !== undefined) ? props.PCQuesDTO[2].questionText : ""}</p>

                </GridItem>
               
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
                                checked={props.selectedValueIns === "Question.3No"}
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
                {props.showPCL3 &&
                    <GridItem xs={12}>
                        <p>3.1 Details</p>
                    </GridItem>
                }
                {props.showPCL3 &&
                    <GridItem xl={12} sm={4} md={3}>
                        <Button color="info"
                            round className={props.classes.marginRight}
                            //onClick={props.handleAddButton}
                            id="saveBtn" >
                            Add
                                </Button>
                    </GridItem>
                }
                {
                    props.showPCL3 &&
                    <GridItem lg={12}>

                        <CardBody>

                            <ReactTable
                                data={props.data}
                                filterable
                                columns={[
                                    {
                                        Header: "COMPANY NAME",
                                        accessor: "companyName",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,

                                    },
                                    {
                                        Header: "POLICY NO",
                                        accessor: "PolicyNo",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,
                                        /* minWidth: 150,
                                           style: { textAlign: "center" },
                                           headerClassName: 'react-table-center'*/
                                    },
                                    {

                                        Header: "NATURE OF CLAIM",
                                        accessor: "natureOfClaim",
                                        //minWidth: 150,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,
                                    },
                                    {
                                        Header: "DATE OF CLAIM",
                                        accessor: "dateOfClaim",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,
                                        /* minWidth: 150,
                                           style: { textAlign: "center" },
                                           headerClassName: 'react-table-center'*/
                                    },
                                   
                                    {

                                        Header: "DELETE",
                                        accessor: "actions",
                                        //minWidth: 150,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 60,
                                        resizable: false,
                                    },

                                ]}
                                defaultPageSize={1}
                                showPaginationTop={false}
                                // pageSize={([props.data.length + 1] < 3) ? [props.data.length + 1] : 3}
                                showPaginationBottom
                                className="-striped -highlight discription-tab"
                            />

                        </CardBody>

                    </GridItem>
                }
            </GridContainer>
            

          
        </div>
    )
}
export default withStyles(style)(PrevCurrLifeInsurance);