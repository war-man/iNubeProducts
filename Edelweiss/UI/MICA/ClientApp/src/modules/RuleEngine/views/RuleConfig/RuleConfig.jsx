import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

// @material-ui/core components

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
// @material-ui/icons
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

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

const dateStyle = {
    width: "max-content",
    marginLeft: "170px",
    marginTop: "-25px",
    backgroundColor: "transparent",
    border: "none",
    zoom: "1.15"
}

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

class RuleConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showG: false,
            date: date,
            showCondition: false,
            showConditionFrom: false,
            showTable: false,
            showColumn: false,
            showDateFrom: false,
            showDateTo: false,
            showDOBParameters : false,
            ParamSetID: "",
            ParamSetName: [],

            ParamSetid: "",
            ParamId: [],
            tblRuleConditionArray: [],
            count: "",
            gridRules: [],
            fields: {

                RuleName: "",
                StartDate: "",
                EndDate: "",
                RuleObj: "",
                conditionoperator: "",
                DOBConditions:"",
                conditionvaluefrom: "",
                conditionvalueto: "",
                tableName: "",
                columnName: "",
                condnLogicoperator: "",
                conditionAttributes: "",
                FromDate: "",
                ToDate: "",
            },
        };
        this.handleTags = this.handleTags.bind(this);
    }

    handleSimple = event => {
        const fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
        this.setState({ [event.target.name]: event.target.value });     
        
    };
    handleSimpleConditionOp = event => {
        console.log(this.state, 'State of Value');
        const fields = this.state.fields;
        //fields[event.target.name] = event.target.value;

        if (event.target.value == "InBetween") {
            this.state.showTable = false;
            this.state.showConditionFrom = false;
            this.state.showColumn = false;  
            this.state.showCondition = false;
            this.state.showDateFrom = false;
            this.state.showDateTo = false;
            const { showConditionFrom } = this.state.showConditionFrom;
            this.setState({ showConditionFrom: !showConditionFrom });
            const { showCondition } = this.state.showCondition;
            this.setState({ showCondition: !showCondition, [event.target.name]: event.target.value });
            
        }
        else if (event.target.value == "IsListOf") {
            this.state.showDateFrom = false;
            this.state.showDateTo = false;
            this.state.showTable = false;
            this.state.showConditionFrom = false;
            this.state.showColumn = false;
            this.state.showCondition = false;
            const { showTable } = this.state.showTable;
            this.setState({ showTable: !showTable });
            const { showColumn } = this.state.showColumn;
            this.setState({ showColumn: !showColumn, [event.target.name]: event.target.value });
            
        }
        else if(event.target.value == "Validate")
        {
            this.state.showDateFrom = false;
            this.state.showDateTo = false;
            this.state.showTable = false;
            this.state.showConditionFrom = false;
            this.state.showColumn = false;
            this.state.showCondition = false;
            this.state.showTable = false;
            this.state.showColumn = false;
            this.setState({ [event.target.name]: event.target.value });
        }
        else if (event.target.value == "DateRange")
        {
            this.state.showDateFrom = false;
            this.state.showDateTo = false;
            this.state.showTable = false;
            this.state.showConditionFrom = false;
            this.state.showColumn = false;
            this.state.showCondition = false;
            const { showDateFrom } = this.state.showDateFrom;
            this.setState({ showDateFrom: !showDateFrom });
            const { showDateTo } = this.state.showDateTo;
            this.setState({ showDateTo: !showDateTo, [event.target.name]: event.target.value });
        }
        else if (event.target.value == "ValidateDOB")
        {
            this.state.showDateFrom = false;
            this.state.showDateTo = false;
            this.state.showTable = false;
            this.state.showConditionFrom = false;
            this.state.showColumn = false;
            this.state.showCondition = false;
            const { showDOBParameters } = this.state.showDOBParameters;
            this.setState({ showDOBParameters: !showDOBParameters });
            const { showConditionFrom } = this.state.showConditionFrom;
            this.setState({ showConditionFrom: !showConditionFrom, [event.target.name]: event.target.value });
        }
        else if (event.target.value != "IsListOf" && event.target.value != "InBetween")
        {
            this.state.showDateFrom = false;
            this.state.showDateTo = false;
            this.state.showTable = false;
            this.state.showConditionFrom = false;
            this.state.showColumn = false;
            this.state.showCondition = false;
            console.log(this.state, 'State of Value');
            const { showConditionFrom } = this.state.showConditionFrom;
            this.setState({ showConditionFrom: !showConditionFrom, [event.target.name]: event.target.value });
            
            
        }
        else if (event.target.value != "Validate")
        {
            this.state.showTable = false;
            this.state.showConditionFrom = false;
            this.state.showColumn = false;
            this.state.showCondition = false;
            this.state.showDateFrom = false;
            this.state.showDateTo = false;
            console.log(this.state, 'State of Value');
            const { showConditionFrom } = this.state.showConditionFrom;
            this.setState({ showConditionFrom: !showConditionFrom, [event.target.name]: event.target.value });
        }
        else {
            this.setState({ [event.target.name]: event.target.value });
        }
        fields[event.target.name] = event.target.value;
        //this.setState({ fields });
        //this.setState({ [event.target.name]: event.target.value }); 

        
    }
    handleTags(regularTags) {
        this.setState({ tags: regularTags });
    }
    

    handleState = event => {
        fetch(`${ruleconfig.ruleEngineUrl}/RuleEngine/GetAllParamSetDetailsWithParamId`)
            .then(response => response.json())
            .then(data => {
                this.setState({ ParamId: data });
                console.log("Rule ParamID Data");
                console.log(this.state.ParamId);
                this.setState({ ParamId: this.state.ParamId.filter(item => item.paramSetId == event.target.value) });
                const fields = this.state.fields;
                fields[event.target.name] = event.target.value;
                this.setState({ fields });
                this.setState({ [event.target.name]: event.target.value });
                //Disabling LogicalCondition on basis of No of Condition Attributes
                this.state.count = this.state.ParamId.length;
                console.log(this.state.count, 'Count Variable');
            });
    }
    stateSetConditionalOperator() {
        //Setting State after Selecting IList or Any Conditional Operator 
        const { showTable } = this.state.showTable;
        this.setState({ showTable: showTable });
        const { showColumn } = this.state.showColumn;
        this.setState({ showColumn: showColumn });
        const { showCondition } = this.state.showCondition;
        this.setState({ showCondition: showCondition });
        const { showConditionFrom } = this.state.showConditionFrom;
        this.setState({ showConditionFrom: showConditionFrom });
        const { showDateFrom } = this.state.showDateFrom;
        this.setState({ showDateFrom: showDateFrom });
        const { showDateTo } = this.state.showDateTo;
        this.setState({ showDateTo: showDateTo });
        //const { showDOBParameters } = this.state.showDOBParameters;
        //this.setState({ showDOBParameters: showDOBParameters });

    }
    addRow() {
        const { show } = this.state.show;
        this.setState({ show: !show });
        //Setting State after Selecting IList or Any Conditional Operator 
        this.stateSetConditionalOperator();
        // For Add Row 
        var isactive = 1;
        let pRuleConditionArray = this.state.tblRuleConditionArray;
        this.setState({ tblRuleConditionArray: pRuleConditionArray });

        pRuleConditionArray.push({
            'conditionAttribute': this.state.fields.conditionAttributes,
            'conditionOperator': this.state.fields.conditionoperator, 
            'conditionValueFrom': this.state.fields.conditionvaluefrom,
            'conditionValueTo': this.state.fields.conditionvalueto,
            'tablename': this.state.fields.tableName,
            'columnName': this.state.fields.columnName,
            'FromDate': this.state.fields.FromDate,
            'ToDate': this.state.fields.ToDate,
            'DOBConditions': this.state.fields.DOBConditions,
            'conditionLogicalOperator': this.state.fields.condnLogicoperator,
            'createdDate': date(),
            'isActive': isactive
        });
        //// Deleting left Conditional Attributes after selecting One
        var filteredItems = this.state.ParamId.filter(item => item.paramId !== this.state.conditionAttributes);
        this.setState({
            ParamId: filteredItems,
        })
        this.setState({ conditionoperator: '', condnLogicoperator: '' });
        this.state.fields.condnLogicoperator = "";
        this.state.fields.conditionvaluefrom = "";
        this.state.fields.conditionvalueto = "";
        this.state.fields.tableName = "";
        this.state.fields.columnName = "";
        this.state.fields.FromDate = "";
        this.state.fields.ToDate = "";
        this.state.fields.DOBConditions = "";
        //For Disabling the Logical Condition 
        this.state.count = this.state.count - 1;
    }
    // For Grid
    onGrid() {
        const { showG } = this.state.showG;
        this.setState({ showG: !showG });

        fetch(`${ruleconfig.ruleEngineUrl}/RuleEngine/GetAllRulesForGrid`)
            .then(response => response.json())
            .then(data => {
                this.setState({ gridRules: data });
                console.log("Rule Grid Rules");
                console.log(this.state.gridRules);
            });
    }
    onFormSubmit = (evt) => {
        var isactive = 1;
        var data = {
            'ruleName': this.state.fields.RuleName, 'startDate': this.state.fields.StartDate, 'endDate': this.state.fields.EndDate, 'createdDate': date(), 'isActive': isactive, 'ruleObj': this.state.RuleObj, 'tblRuleConditions': this.state.tblRuleConditionArray
        };
        console.log(data, 'sendingData');
        //console.log('data' + JSON.stringify(data));
        fetch(`${ruleconfig.ruleEngineUrl}/RuleConfig/CreateRules/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(function (data) {
            console.log(data);
            
        });
        this.setState({
            redirect: true,

        })

    };

    componentDidMount() {
        fetch(`${ruleconfig.ruleEngineUrl}/RuleConfig/GetAllParamSet`)
            .then(response => response.json())
            .then(data => {
                this.setState({ ParamSetName: data });
            });

    }
    onInputChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };

    onDateChange = (name, event) => {
        debugger
        const fields = this.state.fields;
        console.log('event', event);
        var today = event.toDate();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        fields[name] = date;
        this.setState({ fields });
    };
    render() {
        const { classes } = this.props;
        this.state.fields.todayDate = new Date();
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
                                    <small> Rule Config </small>
                                </h4>
                            </CardHeader>
                            <CardBody>

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <FormControl
                                            fullWidth
                                            className={classes.selectFormControl}
                                        >
                                            <InputLabel
                                                htmlFor="simple-select"
                                                className={classes.selectLabel}
                                            >
                                                Rule Object
                          </InputLabel>
                                            <Select
                                                value={this.state.fields.RuleObj}
                                                onChange={this.handleState}
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                inputProps={{
                                                    name: "RuleObj",
                                                    id: "simple-select"
                                                }}
                                            >
                                                {
                                                    this.state.ParamSetName.map(item =>
                                                        <MenuItem
                                                            value={item.paramSetId}
                                                            classes={{
                                                                root: classes.selectMenuItem,
                                                                selected: classes.selectMenuItemSelected
                                                            }}
                                                        >
                                                            {item.paramSetName}
                                                        </MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Rule Name"
                                            id="RuleName"
                                            value={this.state.fields.RuleName}
                                            name='RuleName'
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomDatetime labelText="Start Date" id='StartDate' name='StartDate' onChange={(evt) => this.onDateChange('StartDate', evt)} value={this.state.fields.StartDate} required={true} formControlProps={{ fullWidth: true }} />
                                    </GridItem>
                                    
                                    <GridItem xs={12} sm={12} md={3}>
                                    <CustomDatetime labelText="End Date" id='EndDate' name='StartDate' onChange={(evt) => this.onDateChange('EndDate', evt)} value={this.state.fields.EndDate} required={true} formControlProps={{ fullWidth: true }} />
                                </GridItem>

                                </GridContainer>
                            </CardBody>
                        </Card>

                    </GridItem>
                </GridContainer>


                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <PermIdentity />
                                </CardIcon>
                                <h4 className={this.props.cardIconTitle}>
                                    <small> Condition </small>
                                </h4>
                            </CardHeader>
                            <CardBody>

                                <GridContainer>

                                    <GridItem xs={12} sm={12} md={3}>
                                        <FormControl
                                            fullWidth
                                            className={classes.selectFormControl}
                                        >
                                            <InputLabel
                                                htmlFor="simple-select"
                                                className={classes.selectLabel}
                                            >
                                                Condition Attributes
                                            </InputLabel>
                                            <Select
                                                value={this.state.fields.conditionAttributes}
                                                onChange={this.handleSimple}

                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                inputProps={{
                                                    name: "conditionAttributes",
                                                    id: "simple-select"
                                                }}
                                            >
                                                {
                                                    this.state.ParamId.map(item =>
                                                        <MenuItem
                                                            value={item.paramId}
                                                            classes={{
                                                                root: classes.selectMenuItem,
                                                                selected: classes.selectMenuItemSelected
                                                            }}
                                                        >
                                                            {item.paramName}
                                                        </MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <FormControl
                                            fullWidth
                                            className={classes.selectFormControl}
                                        >
                                            <InputLabel
                                                htmlFor="simple-select"
                                                className={classes.selectLabel}
                                            >
                                                Condition Operator
                          </InputLabel>
                                            <Select
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                value={this.state.fields.conditionoperator}
                                                onChange={this.handleSimpleConditionOp}
                                                inputProps={{
                                                    name: "conditionoperator",
                                                    id: "simple-select"
                                                }}
                                            >
                                                <MenuItem
                                                    disabled
                                                    classes={{
                                                        root: classes.selectMenuItem
                                                    }}
                                                >
                                                    Condition Operator
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="="
                                                >
                                                    =
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value=">"
                                                >
                                                    >
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="<"
                                                >
                                                    {"<"}
                                                </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="!="
                                                >
                                                    !=
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="<="
                                                >
                                                    {"<="}
                                                </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value=">="
                                                >
                                                    >=
                                                    </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="InBetween"
                                                >
                                                    InBetween
                                                    </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="IsListOf"
                                                >
                                                    IsListOf
                                                    </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="Validate"
                                                >
                                                    Validate
                                                    </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="StartsWith"
                                                >
                                                    StartsWith
                                                    </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="EndsWith"
                                                >
                                                    EndsWith
                                                    </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="Substring"
                                                >
                                                    Substring
                                                    </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="DateRange"
                                                >
                                                    DateRange
                                                    </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="ValidateDOB"
                                                >
                                                    ValidateDOB
                                                    </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                    {this.state.showConditionFrom &&
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput labelText="Condition Value From"
                                                value={this.state.fields.conditionvaluefrom}
                                                name='conditionvaluefrom'
                                                onChange={this.onInputChange}
                                                inputProps={{
                                                    //type: "number"
                                                }}
                                                formControlProps={{ fullWidth: true }} />
                                        </GridItem>
                                    }
                                    {this.state.showCondition &&
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput labelText="Condition Value To"
                                                value={this.state.fields.conditionvalueto}
                                                name='conditionvalueto'
                                                onChange={this.onInputChange}
                                                inputProps={{
                                                    //type: "number"
                                                }}
                                                formControlProps={{ fullWidth: true }} />
                                        </GridItem>
                                    }
                                    {this.state.showTable &&
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput labelText="Table Name"
                                                value={this.state.fields.tableName}
                                                name='tableName'
                                                onChange={this.onInputChange}
                                                inputProps={{
                                                    //type: "number"
                                                }}
                                                formControlProps={{ fullWidth: true }} />
                                        </GridItem>
                                    }
                                    {this.state.showColumn &&
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput labelText="Column Name"
                                                value={this.state.fields.columnName}
                                                name='columnName'
                                                onChange={this.onInputChange}
                                                inputProps={{
                                                    //type: "number"
                                                }}
                                                formControlProps={{ fullWidth: true }} />
                                        </GridItem>
                                    }
                                    {this.state.showDateFrom &&
                                        <GridItem xs={12} sm={12} md={3}>
                                        <InputLabel
                                            className={classes.label}>From Date</InputLabel>
                                        <br />
                                        <FormControl fullWidth>
                                            <CustomDatetime
                                                timeFormat={false}

                                                id="FromDate"
                                                value={this.state.fields.FromDate}
                                                name='FromDate'
                                                onChange={(evt) => this.onDateChange('FromDate', evt)}


                                                inputProps={{
                                                    placeholder: "FromDate",
                                                    id: "FromDate"
                                                }}
                                            />
                                            <button style={dateStyle}><i className="fa fa-calendar fa-lg"></i></button>
                                        </FormControl>
                                    </GridItem>
                                    }
                                    {this.state.showDateTo &&
                                        <GridItem xs={12} sm={12} md={3}>
                                            <InputLabel
                                                className={classes.label}>To Date</InputLabel>
                                            <br />
                                            <FormControl fullWidth>
                                                <CustomDatetime
                                                    timeFormat={false}

                                                    id="ToDate"
                                                    value={this.state.fields.ToDate}
                                                    name='ToDate'
                                                    onChange={(evt) => this.onDateChange('ToDate', evt)}


                                                    inputProps={{
                                                        placeholder: "ToDate",
                                                        id: "ToDate"
                                                    }}
                                                />
                                                <button style={dateStyle}><i className="fa fa-calendar fa-lg"></i></button>
                                            </FormControl>
                                        </GridItem>
                                    }
                                    {this.state.showDOBParameters &&
                                        <GridItem xs={12} sm={12} md={3}>
                                            <FormControl
                                                fullWidth
                                                className={classes.selectFormControl}
                                            >
                                                <InputLabel
                                                    htmlFor="simple-select"
                                                    className={classes.selectLabel}
                                                >
                                                    DOBConditions
                          </InputLabel>
                                                <Select
                                                    MenuProps={{
                                                        className: classes.selectMenu
                                                    }}
                                                    classes={{
                                                        select: classes.select
                                                    }}
                                                    value={this.state.fields.DOBConditions}
                                                    onChange={this.handleSimpleConditionOp}
                                                    inputProps={{
                                                        name: "DOBConditions",
                                                        id: "simple-select"
                                                    }}
                                                >
                                                    <MenuItem
                                                        disabled
                                                        classes={{
                                                            root: classes.selectMenuItem
                                                        }}
                                                    >
                                                        DOBConditions
                            </MenuItem>
                                                    <MenuItem
                                                        classes={{
                                                            root: classes.selectMenuItem,
                                                            selected: classes.selectMenuItemSelected
                                                        }}
                                                        value="Age"
                                                    >
                                                        Age
                            </MenuItem>
                                                    <MenuItem
                                                        classes={{
                                                            root: classes.selectMenuItem,
                                                            selected: classes.selectMenuItemSelected
                                                        }}
                                                        value="Days"
                                                    >
                                                        Days
                            </MenuItem>

                                                </Select>
                                            </FormControl>
                                        </GridItem>
                                    }
                                    <GridItem xs={12} sm={12} md={3}>
                                        <FormControl
                                            fullWidth
                                            className={classes.selectFormControl}
                                        >
                                            <InputLabel
                                                htmlFor="conditionlogicaloperator"
                                                className={classes.selectLabel}
                                            >
                                                Condition Logical Operator
                          </InputLabel>
                                            <Select
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                disabled={this.state.count == 1}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                value={this.state.condnLogicoperator}
                                                onChange={this.handleSimple}
                                                inputProps={{
                                                    name: "condnLogicoperator",
                                                    id: "simple-select1"
                                                }}
                                            >
                                                <MenuItem
                                                    disabled
                                                    classes={{
                                                        root: classes.selectMenuItem
                                                    }}
                                                >
                                                    Condition Logical Operator
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="and"
                                                >
                                                    AND
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="or"
                                                >
                                                    OR
                            </MenuItem>

                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                </GridContainer>
                                <Button onClick={() => this.addRow()}
                                    color="info"
                                    size="sm"
                                >
                                    ADD
                                </Button>

                                {this.state.show &&
                                    <div id="div1">
                                        <table className="createTableClass table-striped " style={{ width: "100" }} id="benefitTable">
                                            <thead className="tableClassRow">
                                                <tr className="tableClassRow">
                                                    <th className="tableClassRow" >ConditionAttributes</th>
                                                    <th className="tableClassRow" >ConditionOperator</th>
                                                    <th className="tableClassRow" >ConditionValueFrom </th>
                                                    <th className="tableClassRow" >ConditionValueTo</th>
                                                    <th className="tableClassRow" >TableName </th>
                                                    <th className="tableClassRow" >ColumnName</th>
                                                    <th className="tableClassRow" >FromDate </th>
                                                    <th className="tableClassRow" >ToDate</th>
                                                    <th className="tableClassRow" >Condition Logic Operator</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    this.state.tblRuleConditionArray.map((item, index) =>
                                                        <tr className="tableClassRow" key={index}>
                                                            <td className="tableClassRow"><h6>{item.conditionAttribute}</h6></td>
                                                            <td className="tableClassRow"><h6>{item.conditionOperator}</h6></td>
                                                            <td className="tableClassRow"><h6>{item.conditionValueFrom}</h6></td>
                                                            <td className="tableClassRow"><h6>{item.conditionValueTo}</h6></td>
                                                            <td className="tableClassRow"><h6>{item.tablename}</h6></td>
                                                            <td className="tableClassRow"><h6>{item.columnName}</h6></td>
                                                            <td className="tableClassRow"><h6>{item.FromDate}</h6></td>
                                                            <td className="tableClassRow"><h6>{item.ToDate}</h6></td>
                                                            <td className="tableClassRow"><h6>{item.conditionLogicalOperator}</h6></td>
                                                        </tr>
                                                    )}
                                            </tbody>
                                        </table>
                                    </div>}

                                <Button onClick={() => this.onFormSubmit()}
                                    color="info"
                                    size="sm"
                                >
                                    SAVE
                                </Button>
                                {this.state.showG &&
                                    <div id="div1">
                                        <table className="createTableClass table-striped " style={{ width: "100" }} id="benefitTable">
                                            <thead className="tableClassRow">
                                                <tr className="tableClassRow">
                                                    <th className="tableClassRow" >RuleID</th>
                                                    <th className="tableClassRow" >RuleName</th>
                                                <th className="tableClassRow" >StartDate</th>
                                                <th className="tableClassRow" >EndDate</th>
                                                <th className="tableClassRow" >ConditionAttributes</th>
                                                <th className="tableClassRow" >ConditionValueFrom</th>
                                                <th className="tableClassRow" >ConditionValueTo</th>
                                                <th className="tableClassRow" >TableName</th>
                                                <th className="tableClassRow" >ColumnName</th>
                                                <th className="tableClassRow" >FromDate</th>
                                                <th className="tableClassRow" >ToDate</th>
                                                <th className="tableClassRow" >LogicalOperator</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                this.state.gridRules.map((item, index) =>
                                                        <tr className="tableClassRow" key={index}>
                                                        <td className="tableClassRow"><h6>{item.rule_id}</h6></td>
                                                        <td className="tableClassRow"><h6>{item.ruleName}</h6></td>
                                                        <td className="tableClassRow"><h6>{item.startDate}</h6></td>
                                                        <td className="tableClassRow"><h6>{item.endDate}</h6></td>
                                                        <td className="tableClassRow"><h6>{item.conditionAttributes}</h6></td>
                                                        <td className="tableClassRow"><h6>{item.conditionValue}</h6></td>
                                                        <td className="tableClassRow"><h6>{item.conditionvalueto}</h6></td>
                                                        <td className="tableClassRow"><h6>{item.tableName}</h6></td>
                                                        <td className="tableClassRow"><h6>{item.columnName}</h6></td>
                                                        <td className="tableClassRow"><h6>{item.FromDate}</h6></td>
                                                        <td className="tableClassRow"><h6>{item.ToDate}</h6></td>
                                                        <td className="tableClassRow"><h6>{item.conditionLogicOperator}</h6></td>
                                                        </tr>
                                                    )}
                                            </tbody>
                                        </table>
                                    </div>
                                }
                                <Button onClick={() => this.onGrid()}
                                    color="info"
                                    size="sm"
                                >
                                    GRID
                </Button>
                            </CardBody>
                        </Card>

                    </GridItem>
                </GridContainer>

            </div>
        );
    }
}
//export default withStyles(extendedFormsStyle)(GeneralParameter);
export default connect(null, null)(withStyles(extendedFormsStyle)(RuleConfig));





