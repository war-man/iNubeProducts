import React from "react";
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
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import Tooltip from '@material-ui/core/Tooltip';
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
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import Dropdown from "components/Dropdown/Dropdown.jsx";
import { IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/AddCircleOutline';
import Reset from '@material-ui/icons/Autorenew';
import Chip from '@material-ui/core/Chip';

function date() {

    var today = new Date();
    var date;
    var hrs = today.getHours();
    hrs = hrs < 10 ? '0' + hrs : hrs;
    var min = today.getMinutes();
    min = min < 10 ? '0' + min : min;
    var sec = today.getSeconds();
    sec = sec < 10 ? '0' + sec : sec;

    return date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + 'T' + hrs + ':' + min + ':' + sec;

}

const useStyles = withStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));
class CalculationConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            fields: {
                RateConfigName: "",
                RateConfigDDID: "",
                CalConfigParam: "",
                Rates: "",
                OutputParamName: "",
                Expression: "",
                ExpressionResult: "",
                Expression: "",
                Steps:0,

                checkedA: true,
                checkedB: false,
                simpleSelect: "",
                ruleobjectname: "",
                multipleSelect: [],
                IsActive: "",
                CreatedDate: "",
                createddateParamset: "",
                isactive: "",
                ConditionalParam: ""
            },
            sendingExpression: "",
            sendingArray: [],
            multiselectArray: [],
            CalRateArray: [],
            displayCalculationParameterGrid: false,
            CalParameterArray: [],
            newParamData: [],
            parameterCard: false,
            flagButon: false,
            RateRules: [],
            displayExpressionGrid: false,
            ExpressionArray: [],
            newExpressionData: [],
            flag: false,
            rateflag: false,
            condnflag: false,

            ruleobj: [],
            countSaving: false,

            ConditionalParameterAr: [],
            newConditionalParamData: [],
            //ConditionalParam:"",
            

            typeList: [{ "mID": 1, "mValue": "Rate", "mType": "RateConfig" },
                { "mID": 2, "mValue": "Parameter", "mType": "RateConfig" },
                { "mID": 3, "mValue": "ConditionalParameter", "mType": "RateConfig" }],
        };

    }

    onInputParamChange = (evt) => {
        console.log('Event', evt);
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        //console.log("fields", fields);
        this.setState({ fields });
        if (evt.target.value == 1) {
            this.state.flag = true;
            this.state.rateflag = false;
            this.state.condnflag = false;
        }
        else if (evt.target.value == 3)
        {
            this.state.flag = false;
            this.state.rateflag = false;
            this.state.condnflag = true;
        }
        else
        {
            this.state.flag = false;
            this.state.rateflag = true;
            this.state.condnflag = false;
        }
    }


    onInputChange = (evt) => {
        let fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };
    
    componentDidMount() {
        fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/GetRules`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ RateRules: data });
                console.log(data);
            });
    }
    //addCalConfigParam  
    addCalConfigParam() {
        if (this.state.fields.RateConfigName != "") {
            //Showing Grid
            //For Displaying into Grid
            //this.setState({ displayCalculationParameterGrid: true });
            debugger
            //Removing Space
            this.state.fields.CalConfigParam = this.state.fields.CalConfigParam.split(' ').join('');
            var isActive = 1;
            let pCalParameterArray = this.state.CalParameterArray;
            this.setState({ CalParameterArray: pCalParameterArray });
            let Type = "Param";
            pCalParameterArray.push({
                'calculationConfigParamName': this.state.fields.CalConfigParam,
                'createdDate': date(),
                'isActive': isActive,
                'type': Type
            });
            // State Set After Selecting
            this.setState({ CalConfigParam: '' });
            this.state.fields.CalConfigParam = "";
            console.log(this.state.CalParameterArray, 'CalParamArray');
            this.setState({ parameterCard: true });
            this.setState({ flagButon: true });

            if (this.state.CalParameterArray.length > 0) {
                this.setState({
                    newParamData: this.state.CalParameterArray.map((prop, key) => {

                        return {
                            CalConfigParam: prop.calculationConfigParamName
                        };
                    })
                });
            }
        }
        else {
            swal("", "Some fields are missing", "error");
            this.setState({ errormessage: true });
        }

    }
    // Adding of Conditional Parameter 
    addConditionalParameter() {
        if (this.state.fields.RateConfigName != "") {
            debugger
            //Removing Space
            this.state.fields.ConditionalParam = this.state.fields.ConditionalParam.split(' ').join('');
            let pConditionalParameterAr = this.state.ConditionalParameterAr;
            this.setState({ ConditionalParameterAr: pConditionalParameterAr });
            pConditionalParameterAr.push({
                'calculationConfigParamName': this.state.fields.ConditionalParam
            });
            // State Set After Selecting
            this.setState({ ConditionalParam: '' });
            this.state.fields.ConditionalParam = "";
            console.log(this.state.ConditionalParameterAr, 'CalParamArray');
            this.setState({ parameterCard: true });
            this.setState({ flagButon: true });

            if (this.state.ConditionalParameterAr.length > 0) {
                this.setState({
                    newConditionalParamData: this.state.ConditionalParameterAr.map((prop, key) => {
                        return {
                            CalConfigParam: prop.calculationConfigParamName
                        };
                    })
                });
            }
        }
        else {
            swal("", "Some fields are missing", "error");
            this.setState({ errormessage: true });
        }

    }

    addExpression() {
        debugger
        if (this.state.fields.ExpressionResult != "" && this.state.fields.Expression != "") {
            //For Steps
            // Remove Space
            this.state.fields.ExpressionResult = this.state.fields.ExpressionResult.split(' ').join('');
            this.state.fields.Steps = this.state.fields.Steps + 1;
            //Showing Grid
            this.setState({ displayExpressionGrid: true });
            var isActive = 1;
            let pExpressionArray = this.state.ExpressionArray;
            this.setState({ ExpressionArray: pExpressionArray });

            pExpressionArray.push({
                'expressionResult': this.state.fields.ExpressionResult,
                'expressionValue': this.state.fields.Expression,
                'date': date(),
                'isActive': isActive,
                'steps': this.state.fields.Steps
            });
            //Saving Purpose Array with {} to Replace Value 
            let psendingArray = this.state.sendingArray;
            this.setState({ sendingArray: psendingArray });

            psendingArray.push({
                'expressionResult': this.state.fields.ExpressionResult,
                'expressionValue': this.state.sendingExpression,
                'date': date(),
                'isActive': isActive,
                'steps': this.state.fields.Steps
            });

            //After Adding Every Expression it Sould Configure
            let pCalParameterArray = this.state.CalParameterArray;
            this.setState({ CalParameterArray: pCalParameterArray });
            let Type = "";
            pCalParameterArray.push({
                'calculationConfigParamName': this.state.fields.ExpressionResult,
                'createdDate': date(),
                'isActive': isActive,
                'type': Type
            });


            // State Set After Selecting
            this.setState({ ExpressionResult: '', Expression: '' });
            this.state.fields.ExpressionResult = "";
            this.state.fields.Expression = "";
            this.setState({ sendingExpression: '' });
            this.state.sendingExpression = "";
            console.log(this.state.ExpressionArray, 'CalParamArray');

            if (this.state.ExpressionArray.length > 0) {
                this.setState({
                    newExpressionData: this.state.ExpressionArray.map((prop, key) => {

                        return {
                            Steps: prop.steps,
                            ExpressionResult: prop.expressionResult,
                            Expression: prop.expressionValue,
                        };
                    })
                });
            }
        }
        else {
            swal("", "Some fields are missing", "error");
            this.setState({ errormessage: true });
        }

    }

    onclickParameter(parameter) {
        debugger
        //For Sending Array With {}
        this.state.sendingExpression = this.state.sendingExpression + "{" + parameter + "}";
        //Previous 
        this.state.fields.Expression = this.state.fields.Expression + parameter;
        console.log(this.state.fields.Expression, 'Expression');
        this.setState({});
    }
    
    onclickConditionalParameter(parameter) {
        debugger
        //For Sending Array With {}
        this.state.sendingExpression = this.state.sendingExpression + parameter;
        //Previous
        this.state.fields.Expression = this.state.fields.Expression + parameter;
        console.log(this.state.fields.Expression, 'Expression');
        this.setState({});
    }

    onCLickRates(rates) {
        //For Sending Array With {}
        this.state.sendingExpression = this.state.sendingExpression + "{" + rates + "}";
        //Previous Array 
        this.state.fields.Expression = this.state.fields.Expression + rates;
        console.log(this.state.fields.Expression, 'Expression');
        this.setState({});
        //For Adding into GRid to use that Rate Rules Later 
        let pCalRateArray = this.state.CalRateArray;
        this.setState({ CalRateArray: pCalRateArray });
        let Type = "Rate";
        let isActive = 1;
        pCalRateArray.push({
            'calculationConfigParamName': rates,
            'createdDate': date(),
            'isActive': isActive,
            'type': Type
        });
    }

    handleEvaluator = (value) => {
        //For Sending Array With {}
        this.state.sendingExpression = this.state.sendingExpression + value;
        //Previous
        this.state.fields.Expression = this.state.fields.Expression + value;
        this.setState({});
        console.log(this.state.fields.Expression, 'Expression');

    }

    resetFields() {
        let rate = this.state.fields;
        rate['ExpressionResult'] = "";
        rate['Expression'] = "";
        //rate['Steps'] = "";
        this.setState({ rate });

        let state = this.state;
        state['sendingExpression'] = "";
        this.setState({ state });
    }

    addRates() {
        var mlt_select = this.state.fields.multipleSelect.toString();
        var multiselect_array = mlt_select.split(",");
        let pMultiselectArray = this.state.multiselectArray;
        this.setState({ multiselectArray: pMultiselectArray });
        for (var i = 0; i < multiselect_array.length; i++) {
            pMultiselectArray.push({ rateName: multiselect_array[i] });
        }
        this.setState({ parameterCard: true });
        this.setState({ flagButon: true });
        //swal({
        //    text: "Rates Added Successfully",
        //    icon: "success"
        //});
        console.log(this.state.multiselectArray, 'MultiSelect');
    }

    onFormSubmit = (evt) => {
        debugger;
        if (this.state.countSaving == false) {
            let isActive = 1;
            //Sorting od Sending Array 
            let sendingArray = this.state.sendingArray.sort(function (a, b) { return a.steps - b.steps });
            console.log(sendingArray, 'Sending');
            //Merging Both Array With Rate Values Also 
            this.state.CalParameterArray = this.state.CalParameterArray.concat(this.state.CalRateArray);
            console.log(this.state.CalParameterArray, 'CalCUlationConfig')
            //Previous
            console.log(this.state.sendingArray, 'Sending Array');
            var data = {
                'calculationConfigName': this.state.fields.RateConfigName, 'createdDate': date(), 'isActive': isActive, 'calculationConfigExpression': sendingArray, 'calculationConfigParam': this.state.CalParameterArray
            };
            fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/CreateCalConfigRules`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
                .then(data => {
                    if (data.status == 2) {
                        swal({
                            //   title: "Perfect",
                            text: data.responseMessage,
                            //  text: "Account Successfully Created",
                            icon: "success"
                        });
                        this.reset();
                    } else if (data.status == 8) {
                        swal({
                            text: data.errors[0].errorMessage,
                            icon: "error"
                        });
                    } else if (data.status == 4) {
                        swal({
                            text: data.errors[0].errorMessage,
                            icon: "error"
                        });
                    }
                });
            debugger
            this.state.countSaving = true;
        }
        else {
            let isActive = 1;
            //Sorting od Sending Array 
            let sendingArray = this.state.sendingArray.sort(function (a, b) { return a.steps - b.steps });
            var data = {
                'calculationConfigName': this.state.fields.RateConfigName, 'createdDate': date(), 'isActive': isActive, 'calculationConfigExpression': sendingArray, 'calculationConfigParam': this.state.CalParameterArray
            };
            fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/CreateCalConfigRules`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
                .then(data => {
                    if (data.status == 2) {
                        swal({
                            //   title: "Perfect",
                            text: data.responseMessage,
                            //  text: "Account Successfully Created",
                            icon: "success"
                        });
                        this.reset();
                    } else if (data.status == 8) {
                        swal({
                            text: data.errors[0].errorMessage,
                            icon: "error"
                        });
                    } else if (data.status == 4) {
                        swal({
                            text: data.errors[0].errorMessage,
                            icon: "error"
                        });
                    }
                });
        }
    }

    reset() {
        this.setState({ ExpressionArray: [], CalParameterArray: [], displayCalculationParameterGrid: false, parameterCard: false, displayExpressionGrid: false, sendingArray: [] });
        let rate = this.state.fields;
        rate['RateConfigName'] = "";
        rate['RateConfigDDID'] = "";
    }


    render() {
        const { classes } = this.props;
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <PermIdentity />
                                </CardIcon>
                                <h4 className={this.props.cardIconTitle}>
                                    <small> Calculation Config </small>
                                </h4>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Rate Config Name"
                                            id="RateConfigName"
                                            required={true}
                                            value={this.state.fields.RateConfigName}
                                            name='RateConfigName'
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>


                                    <GridItem xs={12} sm={12} md={3}>
                                        <Dropdown
                                            labelText="Rate Config"
                                            id="RateConfigDDID"
                                            value={this.state.fields.RateConfigDDID}
                                            lstObject={this.state.typeList}
                                            //required={true}
                                            //model="InvoiceSearchHistory"
                                            //filterName='InvoiceStatus'
                                            name='RateConfigDDID'
                                            onChange={this.onInputParamChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>

                                    {this.state.flag ?

                                        <GridItem xs={12} sm={12} md={3}>

                                            <FormControl
                                                fullWidth
                                                className={classes.selectFormControl}
                                            >
                                                <InputLabel
                                                    htmlFor="multiple-select"
                                                    className={classes.selectLabel}
                                                >
                                                    Rate
                          </InputLabel>
                                                <Select
                                                    multiple
                                                    value={this.state.fields.multipleSelect}
                                                    onChange={this.onInputChange}
                                                    MenuProps={{ className: classes.selectMenu }}
                                                    classes={{ select: classes.select }}
                                                    inputProps={{
                                                        name: "multipleSelect",
                                                        id: "multiple-select"
                                                    }}
                                                >
                                                    {
                                                        this.state.RateRules.map(item =>
                                                            <MenuItem
                                                                value={item.rateName}
                                                                classes={{
                                                                    root: classes.selectMenuItem,
                                                                    selected: classes.selectMenuItemSelected
                                                                }}
                                                            > {item.rateName}
                                                            </MenuItem>
                                                        )
                                                    }
                                                </Select>
                                            </FormControl>
                                        </GridItem> : null}

                                    {this.state.rateflag ?
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput
                                                labelText="Calculation Config Param"
                                                id="CalConfigParam"
                                                required={true}
                                                value={this.state.fields.CalConfigParam}
                                                name='CalConfigParam'
                                                onChange={this.onInputChange}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem> : null}
                                    {this.state.condnflag ?
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput
                                                labelText="Conditional Param"
                                                id="ConditionalParam"
                                                required={true}
                                                value={this.state.fields.ConditionalParam}
                                                name='ConditionalParam'
                                                onChange={this.onInputChange}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem> : null}
                                    

                                {this.state.rateflag ?

                                    <GridItem xs={12} sm={12} md={3}>
                                        <Tooltip title="Add">
                                            <IconButton id="top-bnt" onClick={() => this.addCalConfigParam()}

                                                round
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </Tooltip>
                                        </GridItem> : null}

                                    {this.state.flag ?
                                    <GridItem xs={12} sm={12} md={3}>
                                        <Tooltip title="Add">
                                            <IconButton id="top-bnt" onClick={() => this.addRates()}

                                                round
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </Tooltip>
                                        </GridItem> : null}

                                    {this.state.condnflag ?
                                        <GridItem xs={12} sm={12} md={3}>
                                            <Tooltip title="Add">
                                                <IconButton id="top-bnt" onClick={() => this.addConditionalParameter()}

                                                    round
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </GridItem> : null}

                    </GridContainer>
                            {this.state.displayCalculationParameterGrid &&

                                <GridContainer>
                                    <GridItem xs={6}>
                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                            <CardBody className="product-search-tab">
                                                <ReactTable
                                                    data={this.state.newParamData}
                                                    filterable
                                                    columns={[
                                                        {
                                                            Header: "CalConfig Parameter",
                                                            accessor: "CalConfigParam",
                                                            minWidth: 30,
                                                            style: { textAlign: "center" },
                                                            headerClassName: 'react-table-center',
                                                            resizable: false,

                                                        }
                                                    ]}
                                                    defaultPageSize={5}
                                                    showPaginationTop={false}
                                                    pageSize={([this.state.newParamData.length + 1] < 5) ? [this.state.newParamData.length + 1] : 5}
                                                    showPaginationBottom
                                                    className="-striped -highlight"
                                                />
                                            </CardBody>
                                        </Animated>
                                    </GridItem>
                                </GridContainer>
                                }
                                {
                                    //<div>
                                    //    <h1>Grid Section</h1>
                                    //</div>
                                }
                            </CardBody>
                        </Card>
                    {this.state.parameterCard &&
                        <Card>
                            {/*  <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        <PermIdentity />
                                    </CardIcon>
                                   
                           </CardHeader> */}
                            <CardBody>
                                {/* calculator */}

                                <GridContainer xs={12} sm={12} md={12} xl={12} >




                                    <GridItem xs={12} sm={4} md={4}>

                                        <h4><small>Expression Operator</small></h4>
                                        <div className="rates-expression-bg">

                                            <Chip size="small"
                                                label="("
                                                onClick={() => this.handleEvaluator("(")} />

                                            <Chip size="small"
                                                label=")"
                                                onClick={() => this.handleEvaluator(")")} />

                                            <Chip size="small"
                                                label="+"
                                                onClick={() => this.handleEvaluator("+")} />

                                            <Chip size="small"
                                                label="-"
                                                onClick={() => this.handleEvaluator("-")} />

                                            <Chip size="small"
                                                label="*"
                                                onClick={() => this.handleEvaluator("*")} />

                                            <Chip size="small"
                                                label="/"
                                                onClick={() => this.handleEvaluator("/")} />

                                            <Chip size="small"
                                                label="%"
                                                onClick={() => this.handleEvaluator("%")} />

                                            <Chip size="small"
                                                label="sqrt"
                                                onClick={() => this.handleEvaluator("sqrt")} />
                                            <Chip size="small"
                                                label="."
                                                onClick={() => this.handleEvaluator(".")} />
                                            <Chip size="small"
                                                label="IIF"
                                                onClick={() => this.handleEvaluator("IIF")} />
                                            <Chip size="small"
                                                label=">"
                                                onClick={() => this.handleEvaluator(">")} />
                                            <Chip size="small"
                                                label="<"
                                                onClick={() => this.handleEvaluator("<")} />


                                            <Chip size="small"
                                                label=","
                                                onClick={() => this.handleEvaluator(",")} />
                                            <Chip size="small"
                                                label="'"
                                                onClick={() => this.handleEvaluator("'")} />
                                            <Chip size="small"
                                                label="="
                                                onClick={() => this.handleEvaluator("=")} />
                                            <Chip size="small"
                                                label="0"
                                                onClick={() => this.handleEvaluator("0")} />

                                            <Chip size="small"
                                                label="1"
                                                onClick={() => this.handleEvaluator("1")} />

                                            <Chip size="small"
                                                label="2"
                                                onClick={() => this.handleEvaluator("2")} />

                                            <Chip size="small"
                                                label="3"
                                                onClick={() => this.handleEvaluator("3")} />

                                            <Chip size="small"
                                                label="4"
                                                onClick={() => this.handleEvaluator("4")} />

                                            <Chip size="small"
                                                label="5"
                                                onClick={() => this.handleEvaluator("5")} />

                                            <Chip size="small"
                                                label="6"
                                                onClick={() => this.handleEvaluator("6")} />
                                            <Chip size="small"
                                                label="7"
                                                onClick={() => this.handleEvaluator("7")} />
                                            <Chip size="small"
                                                label="8"
                                                onClick={() => this.handleEvaluator("8")} />
                                            <Chip size="small"
                                                label="9"
                                                onClick={() => this.handleEvaluator("9")} />
                                        </div>

                                    </GridItem>

                                    <GridContainer id="expression-overflow" xs={12} sm={12} md={8}>
                                        <GridItem xs={12} sm={4} md={6}>
                                            <h4>
                                                <small> Parameter </small>
                                            </h4>
                                            <div className="rates-parameter-bg">

                                                {this.state.CalParameterArray.map((item, i) => (

                                                    <Chip size="small"
                                                        // avatar={<Avatar>M</Avatar>}
                                                        color="info"
                                                        label={item.calculationConfigParamName}
                                                        onClick={() => this.onclickParameter(item.calculationConfigParamName)} />

                                                ))
                                                }
                                            </div>
                                        </GridItem>
                                        


                                        <GridItem xs={12} sm={4} md={6}>

                                            <h4><small>Rates</small></h4>
                                            <div className="rates-rates-bg">
                                            {this.state.multiselectArray.map((item, i) => (

                                                    <Chip size="small"
                                                        // avatar={<Avatar>M</Avatar>}
                                                        label={item.rateName}
                                                        onClick={() => this.onCLickRates(item.rateName)} />
                                                ))}
                                            </div>
                                        </GridItem>

                                        <GridItem xs={12} sm={4} md={6}>
                                            <h4>
                                                <small> Conditional Parameter </small>
                                            </h4>
                                            <div className="rates-parameter-bg">
                                                {this.state.ConditionalParameterAr.map((item, i) => (

                                                    <Chip size="small"
                                                        // avatar={<Avatar>M</Avatar>}
                                                        color="info"
                                                        label={item.calculationConfigParamName}
                                                        onClick={() => this.onclickConditionalParameter(item.calculationConfigParamName)} />

                                                ))
                                                }
                                            </div>
                                        </GridItem>
                                        
                                    </GridContainer>
                                </GridContainer>
                                <h4><small>Expression Condition</small></h4>


                                {/* Label */}
                                <GridContainer justify="center" xs={12} className="cal-label">
                                    <h4 id="expression-step"><small>Steps </small></h4>

                                    <GridItem xs={4} sm={12} md={7}>

                                        <CustomInput labelText=""
                                            value={this.state.fields.Expression}
                                            disabled={true}
                                            name='Expression'
                                            onChange={this.onInputChange}
                                            formControlProps={{ fullWidth: true }} />



                                    </GridItem>

                                    <GridItem xs={4} sm={12} md={2}>
                                        <CustomInput labelText="ExpressionResult"
                                            value={this.state.fields.ExpressionResult}
                                            name='ExpressionResult'
                                            onChange={this.onInputChange}
                                            formControlProps={{ fullWidth: true }} />
                                    </GridItem>
                                    <GridItem xs={2} sm={12} md={1}>
                                        <IconButton id="top-bnt" onClick={() => this.addExpression()} > <AddIcon /> </IconButton>
                                    </GridItem>
                                    <GridItem xs={2} sm={12} md={1}>
                                        <Tooltip title="Reset">
                                            <IconButton id="top-bnt" onClick={() => this.resetFields()} > <Reset /> </IconButton>
                                        </Tooltip>
                                    </GridItem>
                                </GridContainer>






                            </CardBody>
                        </Card>

                    }


                    {this.state.displayExpressionGrid &&
                        <GridContainer xl={12}>
                            <GridItem xs={12}>

                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                                    <ReactTable
                                        data={this.state.newExpressionData}
                                        filterable
                                        columns={[
                                            {
                                                Header: "Steps",
                                                accessor: "Steps",
                                                minWidth: 30,
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "Expression Result",
                                                accessor: "ExpressionResult",
                                                minWidth: 30,
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "Expression",
                                                accessor: "Expression",
                                                minWidth: 30,
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                resizable: false,
                                            }
                                        ]}
                                        defaultPageSize={5}
                                        showPaginationTop={false}
                                        pageSize={([this.state.newExpressionData.length + 1] < 5) ? [this.state.newExpressionData.length + 1] : 5}
                                        showPaginationBottom
                                        className="-striped -highlight"
                                    />

                                </Animated>
                            </GridItem>
                        </GridContainer>

                    }
                        {this.state.flagButon &&
                            <GridContainer lg={12} justify="center">
                                <GridItem xs={5} sm={3} md={3} lg={1}>
                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                        <Button style={{ marginTop: "1rem" }} color="info" round onClick={() => this.onFormSubmit()}>
                                            Save
                                    </Button>
                                    </Animated>
                                </GridItem>
                            </GridContainer>
                        }
                           
                           
                    </GridItem>
                </GridContainer>
               
            </div >
        );
    }
}

export default connect(null, null)(withStyles(extendedFormsStyle)(CalculationConfig));




