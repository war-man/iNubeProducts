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
import Calculator from "./Calculator.jsx";




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
const BtnStyle = {
    padding: "30px",
    width: "242px"
};

const radioAlign = {
    margin: "0 auto",
    textAlign: "center"
}

const validateBtn = {
    height: "35px",
    marginTop: "-10px",
}
const Education = (props) => {

    const { classes } = props;
    { console.log("propsdata", props) }
    return (
        
        <div>



            <GridContainer>
               
             

                <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        labelText="Infltion Rate(%)"
                        id="InflationRate"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                    
                </GridItem>

              

                <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        labelText="Interest Rate(%)"
                        id="InterestRate"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>




                <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        labelText="Monthly Education Expenses"
                        id="EducationExpenses"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        labelText="Annual Education Expenses"
                        id="AnnualEducationExpenses"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>

                <div>
                <GridItem xs={2}>
                        <Button className="actions-right" color="info" style={BtnStyle}>G.C.E A/L</Button>
                    </GridItem>
                </div>

                <div>
                <GridItem xs={2}>
                        <Button className="actions-right" color="info" style={BtnStyle}>Proffessional Studies Local</Button>
                </GridItem>
                </div>

                <div>
                <GridItem xs={2}>
                        <Button className="actions-right" color="info" style={BtnStyle}>Higher Education Degree Local</Button>
                </GridItem>
                </div>

                <div>
                <GridItem xs={2}>
                        <Button className="actions-right" color="info" style={BtnStyle}>Higher Education Degree Foreign</Button>
                </GridItem>
                </div>
             
                <GridItem xs={10}>
                    <CardBody className="Retirement-react-tab">

                        <ReactTable
                            data={props.data2}
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
                                    Header: "CURRENT MONTHLY EXPENSES",
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

                                    Header: "ESTIMATED MONTHLY EXPENSES",
                                    accessor: "LeadDate",
                                    //minWidth: 150,
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 70,
                                    resizable: false,
                                },

                            ]}
                            defaultPageSize={2}
                            showPaginationTop={false}
                            // pageSize={([props.data.length + 1] < 3) ? [props.data.length + 1] : 3}
                            showPaginationBottom
                            className="-striped -highlight discription-tab"
                        />

                    </CardBody>
                </GridItem>
            </GridContainer>



        </div>

    )
}

export default withStyles(style)(Education);