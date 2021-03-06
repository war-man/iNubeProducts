﻿import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import Radio from "@material-ui/core/Radio";
// @material-ui/core components

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
// @material-ui/icons
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import ruleconfig from 'modules/RuleEngine/RuleConfig.js';
//import config from '../../../../config.js';
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import $ from 'jquery';
//import { alert } from "../../../Login/_reducers/alert.reducer";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RateConfig from "modules/Rating/RateConfig.js";
import { Animated } from "react-animated-css";
import swal from 'sweetalert';
import data_Not_found from "assets/img/data-not-found-new.png";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";

const paddingCard =
{
    padding: "10px",
}

class CalCulationResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rulename: {
                CalConfigName: "",
            },
            fields: {
            },
            rate: {
            },
            CalConfigList: [],
            CalConfigCondition: [],
            flagParam: false,
            RateParam: [],
            RulesConditions: [],
            CheckCondition: {
                parameterList: [],
                rateList: [],
            },
            RateParamDetails: [],
            result: [],
            resultDetails: [],
            searchTableSec: false,
            loader: true,
            pageloader: false,
            nodata: false,
        };

    }
    componentDidMount() {
        fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/GetCalculationConfig`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ CalConfigList: data });
                console.log(this.state.CalConfigList, 'CheckData');
            });
    }
    onInputParamChange = (evt) => {
        let fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };
    onInputParamRateChange = (evt) => {
        let rate = this.state.rate;
        rate[evt.target.name] = evt.target.value;
        this.setState({ rate });
    }
    handleStateCheck = event => {
        const rulename = this.state.rulename;
        rulename[event.target.name] = event.target.value;
        this.setState({ rulename });
        this.setState({ [event.target.name]: event.target.value });

        this.setState({ flagParam: true });
        fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/GetHandleEvents?EventId=` + event.target.value, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                //this.state.CheckCondition = data;
                this.setState({ CheckCondition: data });
                console.log(this.state.CheckCondition, 'CheckConditions');
            });
    }
    //Condition State
    handleState = event => {
        debugger
        //TOGet All OD Details Also
        fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/GetRulesCondition`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ RulesConditions: data });
                console.log(this.state.RulesConditions, 'RuleConditions');
                //Filtering My ODParameter
                this.setState({ RateParamDetails: this.state.RateParamDetails.filter(item => item.type == "Rate") });
                console.log(this.state.RateParamDetails, 'RateParamDetailsBefore');
                for (var i = 0; i < this.state.RateParamDetails.length; i++) {

                    this.setState({ RulesConditions: this.state.RulesConditions.filter(item => item.ruleName == this.state.RateParamDetails[i].calculationConfigParamName) });
                }
                console.log(this.state.RulesConditions, 'RateParamDetailsAfter');
            });
        this.setState({ flagParam: true });

        console.log(event.target.value);
        fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/GetCalculationParam`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ RateParam: data });
                console.log("Rule Rules Data");
                //this.state.RateParamDetails = this.state.RateParam;
                this.setState({ RateParamDetails: this.state.RateParam });
                console.log(this.state.RateParamDetails, 'RateParamDetails1')
                this.setState({ RateParam: this.state.RateParam.filter(item => item.calculationConfigId == event.target.value && item.type == "Param") });
                var checkParam = JSON.stringify(this.state.RateParam);
                console.log('Check' + checkParam);
                // For State Change
                const rulename = this.state.rulename;
                rulename[event.target.name] = event.target.value;
                this.setState({ rulename });
                this.setState({ [event.target.name]: event.target.value });
            });
        console.log(this.state.RateParamDetails, 'RateParamDetails2');

    }


    onFormSubmit = (evt) => {
        var rst;
        debugger;
        console.log(this.state.rulename.CalConfigName);
        var data = {
            'dictionary_rule': this.state.fields, 'dictionary_rate': this.state.rate,
        };

        fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/CheckCalculationRate/CheckRateCalculation/` + this.state.rulename.CalConfigName, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(data => {
                this.setState({ result: data });
                console.log(this.state.result, 'Result');
                if (this.state.result.length > 0) {
                    this.setState({ searchTableSec: false });
                    this.tabledata();
                }
                else {
                    swal({
                        text: "Conditions are Wrong",
                        icon: "error"
                    });
                    console.log("Calculation display data:", data);
                }
            });
    }

    tabledata = (e, index) => {
        debugger;
        this.setState({ searchTableSec: true });
        this.setState({
            resultDetails: this.state.result.map((prop, key) => {
                return {
                    SNo: key + 1,
                    Entity: prop.entity,
                    EValue: prop.eValue,
                };
            })
        });
    }
    onInputChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };


    render() {
        const { classes } = this.props;
        return (
          
            <GridContainer lg={12}>

                <GridContainer lg={12}>
                    <GridItem xs={12} sm={12} md={3}>
                              
                                        <FormControl
                                            fullWidth
                                            className={classes.selectFormControl}
                                        >
                                            <InputLabel
                                                htmlFor="simple-select"
                                                className={classes.selectLabel}
                                            >
                                                CalConfig Name
                          </InputLabel>
                                            <Select
                                                value={this.state.rulename.CalConfigName}
                                                onChange={this.handleStateCheck}
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                inputProps={{
                                                    name: "CalConfigName",
                                                    id: "simple-select"
                                                }}
                                            >
                                                {
                                                    this.state.CalConfigList.map(item =>
                                                        <MenuItem
                                                            value={item.calculationConfigId}
                                                            classes={{
                                                                root: classes.selectMenuItem,
                                                                selected: classes.selectMenuItemSelected
                                                            }}
                                                        >
                                                            {item.calculationConfigName}
                                                        </MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                

                    </GridItem>

                    </GridContainer>
           
                {this.state.flagParam &&
                    <GridContainer>

                        <GridItem xs={12} sm={12} md={12}>
                                    <GridContainer>
                                        {this.state.CheckCondition.parameterList.map((item, index) =>
                                            <GridItem xs={12} sm={12} md={3} key={index}>
                                                <CustomInput labelText={item}
                                                    // value={item.paramName}
                                                    name={item}
                                                    onChange={this.onInputParamChange}
                                                    inputProps={{
                                                        //type: "number"
                                                    }}
                                                    formControlProps={{ fullWidth: true }} />

                                            </GridItem>


                                        )}
                                    </GridContainer>
                        </GridItem>
                    </GridContainer>

                }
                {this.state.flagParam &&
                    <GridContainer>

                        <GridItem xs={12} sm={12} md={12}>
                                    <GridContainer>
                                        {this.state.CheckCondition.rateList.map((item, index) =>
                                            <GridItem xs={12} sm={12} md={3} key={index}>
                                                <CustomInput labelText={item}
                                                    // value={item.paramName}
                                                    name={item}
                                                    onChange={this.onInputParamRateChange}
                                                    inputProps={{
                                                        //type: "number"
                                                    }}
                                                    formControlProps={{ fullWidth: true }} />

                                            </GridItem>


                                        )}
                                    </GridContainer>

                                    <GridContainer lg={12} justify="center">
                                        <GridItem xs={5} sm={3} md={3} lg={1}>
                                            <Button onClick={() => this.onFormSubmit()}
                                                color="info"
                                                round
                                            >
                                                EXECUTE
                </Button>
                                        </GridItem>
                                    </GridContainer>
                                

                        </GridItem>
                    </GridContainer>


                }
                
                <GridContainer xl={12}>
                    {this.state.searchTableSec ?

                        <GridItem lg={12}>
                            <ReactTable
                                title={"Calculation Result"}
                                data={this.state.resultDetails}
                                filterable

                                columns={[
                                    {

                                        Header: "Entity",
                                        accessor: "Entity",
                                        headerClassName: 'react-table-center',
                                        //minWidth: 40,
                                        resizable: false,
                                    },

                                    {
                                        Header: "EValue",
                                        accessor: "EValue",
                                        headerClassName: 'react-table-center',
                                        //minWidth: 40,
                                        resizable: false,
                                    },

                                ]}

                                defaultPageSize={5}
                                showPaginationTop={false}
                                //pageSize={([this.state.Policydetailsdata.length + 1] < 5) ? [this.state.Policydetailsdata.length + 1] : 5}
                                showPaginationBottom
                                className="-striped -highlight discription-tab"
                            />
                        </GridItem> : null}
                </GridContainer>
            </GridContainer>
        );
    }
}

export default connect(null, null)(withStyles(extendedFormsStyle)(CalCulationResult));





