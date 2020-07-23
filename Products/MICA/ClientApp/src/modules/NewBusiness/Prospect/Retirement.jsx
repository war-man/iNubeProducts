import React from "react";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Datetime from "react-datetime";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import FilterNone from "@material-ui/icons/FilterNone";
import CardMedia from '@material-ui/core/CardMedia';

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";


import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

import Icon from "@material-ui/core/Icon";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ArrowForward from '@material-ui/icons/ArrowForward';
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
//import Health from "./Health.jsx";
import { Redirect } from 'react-router-dom'; 
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import FundBalance from "./FundBalance.jsx";
import AnnualIncomeSurplus from "./AnnualIncomeSurplus.jsx";
//import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes'; 
import Wizard from "components/Wizard/Wizard.jsx";




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

const validateBtn = {
    height: "35px",
    marginTop: "-10px",
}
const Retirement = (props) => {
    console.log("NeedAnalysis Retirement: ", props);
    debugger;
    const retcalData = props.RetirementCalculatorDTO;
    console.log("rdata", retcalData)
        const { classes } = props;
        return (
            <div>
                
                    <GridContainer>
                       {/* <GridItem xs={12} sm={12} md={3}>
                       
                        <CustomDatetime
                            labelText="From Year "
                            id='FromYear'
                            onChange={(e) => props.RetCalSetValue(e)}
                            name='fromYear'
                            value={retcalData[0].fromYear}
                            formControlProps={{ fullWidth: true }} />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                        <CustomDatetime labelText="To Year "
                            id='ToYear'
                            onChange={(e) => props.RetCalSetValue(e)}
                            name=' toYear'
                            value={retcalData[0].toYear}
                            formControlProps={{ fullWidth: true }} />

                        </GridItem>*/}


                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                labelText="Inflation R ate(%)"
                            id="InflationRate"
                            onChange={(e) => props.RetCalSetValue(e)}
                            name='inflationRate'
                            value={retcalData[0].inflationRate}
                                formControlProps={{
                                    fullWidth: true
                                }}
                        />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                labelText="Plan no of Years"
                            id="PlanNoOfYers"
                            onChange={(e) => props.RetCalSetValue(e)}
                            name='planNoYears'
                            value={retcalData[0].planNoYears}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                labelText="Interest Rate(%)"
                            id="InterestRate"
                            onChange={(e) => props.RetCalSetValue(e)}
                            name='intrestRate'
                            value={retcalData[0].intrestRate}
                                formControlProps={{
                                    fullWidth: true
                                }}
                        />

                        </GridItem>





                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Total Current Monthly Living Expenses"
                            id="CurentLivingExpenses"
                            onChange={(e) => props.RetCalSetValue(e)}
                            name='totalMonthlyExpense'
                            value={retcalData[0].totalMonthlyExpense}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={5}>
                            <CustomInput
                                labelText="Total Estimated Monthly Living Expenses"
                            id="MonthlyLivingExpenses"
                            onChange={(e) => props.RetCalSetValue(e)}
                            name='estimatedTotalMonthlyExpense'
                            value={retcalData[0].estimatedTotalMonthlyExpense}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>




                        <GridItem xs={12} sm={12} md={6} className="downlevel">
                            <CustomCheckbox
                            name="Checked"
                            labelText="Do you want to specify monthly expenses in brief?"
                            value={props.Checked}
                            onChange={(e)=>props.handleChangeCalc(e)}
                            checked={props.Checked}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>


                      {(props.display==true) ?
                        <GridItem xs={10}>
                            <CardBody className="Retirement-react-tab">

                                <ReactTable
                                    data={props.calcObj.data2}
                                    filterable
                                    columns={[
                                        {
                                            Header: "CATEGORY", 
                                            accessor: "CatagoryType",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 70,
                                            resizable: false,

                                        },
                                        {
                                            Header: "CURRENT MONTHLY EXPENSES",
                                            accessor: "CML",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 70,
                                            resizable: false,
                                            /* minWidth: 150,
                                               style: { textAlign: "center" },
                                               headerClassName: 'react-table-center'*/
                                        },
                                        {

                                            Header: "ESTIMATED MONTHLY EXPENSES",
                                            accessor: "EME",
                                            //minWidth: 150,
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 70,
                                            resizable: false,
                                        },
                                       
                                    ]}
                                    defaultPageSize={5}
                                    showPaginationTop={false}
                                    // pageSize={([props.data.length + 1] < 3) ? [props.data.length + 1] : 3}
                                    showPaginationBottom
                                    className="-striped -highlight discription-tab"
                                />

                            </CardBody>
                        </GridItem>

                        : null}

                    <GridItem xs={10}>
                        <CardBody className="Retirement-react-tab">

                            <ReactTable
                                data={props.calcObj.data3}
                                filterable
                                columns={[
                                    {
                                        Header: "CATEGORY",
                                        accessor: "Type",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 70,
                                        resizable: false,

                                    },
                                    {
                                        Header: "AVAILABLE FUNDS",
                                        accessor: "LeadNo",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 70,
                                        resizable: false,
                                        /* minWidth: 150,
                                           style: { textAlign: "center" },
                                           headerClassName: 'react-table-center'*/
                                    },
                                    {

                                        Header: "ESTIMATED FUNDS",
                                        accessor: "LeadDate",
                                        //minWidth: 150,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 70,
                                        resizable: false,
                                    },

                                ]}
                                defaultPageSize={5}
                                showPaginationTop={false}
                                // pageSize={([props.data.length + 1] < 3) ? [props.data.length + 1] : 3}
                                showPaginationBottom
                                className="-striped -highlight discription-tab"
                            />

                        </CardBody>
                    </GridItem>

                   
                    <GridItem xs={12} sm={12} md={6}>
                    <Wizard
                        validate
                        steps={[
                            //{ stepName: "Financial Analysis", stepComponent: FinancialAnalysis, stepId: "", stepData: props },
                            { stepName: "Fund Balance", stepComponent: FundBalance, stepId: "", stepData: props },
                        ]}
                        title=""
                        subtitle=""
                    />
                        
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <Wizard
                        validate
                        steps={[
                           // { stepName: "Financial Analysis", stepComponent: FinancialAnalysis, stepId: "", stepData: props },
                            { stepName: "Annual Income Surplus / Gap", stepComponent: AnnualIncomeSurplus, stepId: "", stepData: props },
                        ]}
                        title=""
                        subtitle=""
                    />
                        
                    </GridItem>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                       
                    <CustomInput
                                labelText=" Real Monthly Pension Gap"
                                id="PlanNoOfYers"
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />    
                    </GridItem>    
                    </GridContainer>

                    <GridItem>
                        <Button color="info">Print PDF</Button>
                    </GridItem>
                        </GridContainer>
              
                                           
                
               
                </div>

            )
    }

export default withStyles(style)(Retirement);