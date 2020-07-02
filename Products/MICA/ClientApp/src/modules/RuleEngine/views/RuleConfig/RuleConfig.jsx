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
import Dropdown from "components/Dropdown/Dropdown.jsx";
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
import ReactTable from "components/MuiTable/MuiTable.jsx";
import Checkbox from "@material-ui/core/Checkbox";
import $ from 'jquery';
import swal from 'sweetalert';
//import { alert } from "../../../Login/_reducers/alert.reducer";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";

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
            showDOBParameters: false,
            conditionalParamFlagFrom: false,
            conditionalParamFlagTo: false,
            ParamSetID: "",
            ParamSetName: [],
            IsCheck: false,
            ruleGroupFlag: false,
            //RuleGroup
            conditionAttrFlag: false,
            conditionOprFlag: false,
            isCheckFlag: false,
            checkEvent:"",
            ConditionFromAtrrParam:[],
            ParamSetid: "",
            ParamId: [],
            tblRuleConditionArray: [],
            ParameterDetails: [],
            count: "",
            newdata: [],
            gridRules: [],
            GridShow: [],
            GridShowData:[],
            newdataGrid: [],
            Rules: [],
            ruleType: "",
            RateList:[],
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
                //Message Code for Validator
                ValidatorName :"",
                SuccessMsg:"",
                SuccessCode:"",
                FailureCode:"",
                FailureMsg: "",
                //For Condition Value as Parameter
                conditionAttributesValueFrom: "",
                conditionAttributesValueTo: "",
                //RuleGroup
                ruleGroupName: "",
                RateName:"",
                
                
            },
            typeList: [{ "mID": "Parameter", "mValue": "Parameter", "mType": "Parameter" },
                { "mID": "Rate", "mValue": "Rate", "mType": "Rate" },
                { "mID": "Default", "mValue": "Default", "mType": "Default" }],
            ConditionType: "",
            rateFlag: false,
        };
        this.handleTags = this.handleTags.bind(this);
        this.reset = this.reset.bind(this);
    }
    handleSimpleruleGroup = event => {
        const fields = this.state.fields;
        //if (this.state.ruleType != "RuleGroup") {
        //    this.state.ruleGroupFlag = true;
        //}
        if (event.target.value == "RuleGroup") {
            this.setState({
                showTable: false, showColumn: false, showDateFrom: false, showDateTo: false, showDOBParameters: false, conditionalParamFlagFrom: false, conditionalParamFlagTo: false, showCondition: false, showConditionFrom: false, conditionAttrFlag: false, conditionOprFlag: false, isCheckFlag: false
            });
            this.setState({ ruleGroupFlag: true, IsCheck: false, [event.target.name]: event.target.value });
            
        }
        else {
            this.setState({
                showTable: false, showColumn: false, showDateFrom: false, showDateTo: false, showDOBParameters: false, conditionalParamFlagFrom: false, conditionalParamFlagTo: false, showCondition: false, showConditionFrom: false, ruleGroupFlag: false,
            });

            this.setState({
                conditionAttrFlag: true, conditionOprFlag: true, isCheckFlag: true, [event.target.name]: event.target.value });
        }
        
        fields[event.target.name] = event.target.value;
        //this.setState({ fields });
    };

    handleSimple = event => {
        const fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
        //this.setState({ [event.target.name]: event.target.value });     
    };

    onInputConditionalParam = event => {
        const state = this.state;
        state[event.target.name] = event.target.value;
        this.setState({ state });
        debugger
        if (this.state.ConditionType == "Parameter" && this.state.checkEvent == "InBetween") {
            this.setState({
                showDateFrom: false, showDateTo: false, showTable: false, showConditionFrom: false, showColumn: false, showCondition: false, showDOBParameters: false
            });
            this.setState({ conditionalParamFlagFrom: true, conditionalParamFlagTo: true });
        }
        if (this.state.ConditionType == "Default") {
            this.setState({
                showDateFrom: false, showDateTo: false, showTable: false, showConditionFrom: false, showColumn: false, showCondition: false, showDOBParameters: false, conditionalParamFlagTo: false, conditionalParamFlagFrom: false, rateFlag: false
            });
            let fields = this.state.fields;
            fields['conditionoperator'] = "";
            fields['RateName'] = "";
            this.setState({ fields });
        }
        if (this.state.ConditionType == "Parameter") {
            this.setState({
                showDateFrom: false, showDateTo: false, showTable: false, showConditionFrom: false, showColumn: false, showCondition: false, showDOBParameters: false, conditionalParamFlagTo: false, conditionalParamFlagFrom: false, rateFlag: false
            });
            this.setState({ conditionalParamFlagFrom: true });
            let fields = this.state.fields;
            //fields['conditionoperator'] = "";
            fields['RateName'] = "";
            this.setState({ fields });
        }
        if (this.state.ConditionType == "Rate")
        {
            this.setState({
                showDateFrom: false, showDateTo: false, showTable: false, showConditionFrom: false, showColumn: false, showCondition: false, showDOBParameters: false, conditionalParamFlagTo: false, conditionalParamFlagFrom: false, rateFlag: true
            });
            let fields = this.state.fields;
            //fields['conditionoperator'] = "";
            this.setState({ fields });
        }
        //else {
        //    this.setState({
        //        showDateFrom: false, showDateTo: false, showTable: false, showConditionFrom: false, showColumn: false, showCondition: false, showDOBParameters: false, conditionalParamFlagTo: false
        //    });
        //    this.setState({ conditionalParamFlagFrom: true });
        //}
    }

    //SetCheckBox = (e) => {
    //    debugger
    //    console.log("checkbox select", e.target.value)
    //    console.log(e.target.checked, 'TargetChecked');
    //    if (e.target.value != undefined) {
    //        this.setState({ IsCheck: e.target.checked });
    //        this.state.IsCheck = e.target.checked
    //    }
    //    if (this.state.IsCheck == true && this.state.checkEvent == "InBetween") {
    //        this.setState({
    //            showDateFrom: false, showDateTo: false, showTable: false, showConditionFrom: false, showColumn: false, showCondition: false, showDOBParameters: false
    //        });
    //        this.setState({ conditionalParamFlagFrom: true, conditionalParamFlagTo: true });
    //    }
    //    else if (this.state.IsCheck == false)
    //    {
    //        this.setState({
    //            showDateFrom: false, showDateTo: false, showTable: false, showConditionFrom: false, showColumn: false, showCondition: false, showDOBParameters: false, conditionalParamFlagTo: false, conditionalParamFlagFrom: false
    //        });
    //        let fields = this.state.fields;
    //        fields['conditionoperator'] = "";
    //        this.setState({ fields });
    //    }
    //    else {
    //        this.setState({
    //            showDateFrom: false, showDateTo: false, showTable: false, showConditionFrom: false, showColumn: false, showCondition: false, showDOBParameters: false, conditionalParamFlagTo: false
    //        });
    //        this.setState({ conditionalParamFlagFrom: true });
    //    }
    //    console.log(this.state.IsCheck, 'Check');
    //    //conditionalParamFlag
    //}

    handleSimpleConditionOp = event => {
        debugger;
        this.state.checkEvent = event.target.value;
        console.log(this.state.IsCheck, 'CheckData');
        console.log(this.state, 'State of Value');
        const fields = this.state.fields;
        //fields[event.target.name] = event.target.value;
        debugger
        if (event.target.value == "InBetween") {
            this.setState({
                showTable: false, showColumn: false, showDateFrom: false, showDateTo: false, showDOBParameters: false, conditionalParamFlagFrom: false, conditionalParamFlagTo: false
            });
            this.setState({ showCondition: true, showConditionFrom: true, [event.target.name]: event.target.value });
        }
        else if (event.target.value == "IsListOf") {
            
            this.setState({
                showDateFrom: false, showDateTo: false, showConditionFrom: false, showCondition: false, showDOBParameters: false, conditionalParamFlagFrom: false, conditionalParamFlagTo: false
            });
            this.setState({ showTable: true, showColumn: true, [event.target.name]: event.target.value });
        }
        else if(event.target.value == "Validate")
        {
            this.setState({
                showDateFrom: false, showDateTo: false, showTable: false, showConditionFrom: false, showColumn: false, showCondition: false, showDOBParameters: false, conditionalParamFlagFrom: false, conditionalParamFlagTo: false
            });
            this.setState({ [event.target.name]: event.target.value });
        }
        else if (event.target.value == "DateRange")
        {
            this.setState({
                showCondition: false, showConditionFrom: false, showTable: false, showColumn: false, showDOBParameters: false, conditionalParamFlagFrom: false, conditionalParamFlagTo: false
            });
            this.setState({ showDateFrom: true,showDateTo: true, [event.target.name]: event.target.value });
        }
        else if (event.target.value == "ValidateDOB")
        {
            this.setState({
                showDateFrom: false, showDateTo: false, showTable: false, showColumn: false, showCondition: false, conditionalParamFlagFrom: false, conditionalParamFlagTo: false
            });
            this.setState({ showConditionFrom: true, showDOBParameters: true, [event.target.name]: event.target.value });
        }
        else if (event.target.value == "StartsWith" && event.target.value == "EndsWith" && event.target.value == "Substring")
        {
            this.setState({
                showDateFrom: false, showDateTo: false, showTable: false, showConditionFrom: false, showColumn: false, showCondition: false, showDOBParameters: false, conditionalParamFlagFrom: false, conditionalParamFlagTo: false
            });
            this.setState({ showConditionFrom: true, [event.target.name]: event.target.value });
        }
        //Use in case of IsCheckk
        //else if (event.target.value == "InBetween" && this.state.IsCheck == true)
        //{
        //    this.setState({
        //        showDateFrom: false, showDateTo: false, showTable: false, showConditionFrom: false, showColumn: false, showCondition: false, showDOBParameters: false
        //    });
        //    this.setState({ conditionalParamFlagFrom: true, conditionalParamFlagTo: true});
        //}
        else if (event.target.value == "InBetween" && this.state.ConditionType != "") {
            this.setState({
                showDateFrom: false, showDateTo: false, showTable: false, showConditionFrom: false, showColumn: false, showCondition: false, showDOBParameters: false
            });
            this.setState({ conditionalParamFlagFrom: true, conditionalParamFlagTo: true });
        }
        //else if (this.state.IsCheck == true)
        //{
        //    this.setState({
        //        showDateFrom: false, showDateTo: false, showTable: false, showConditionFrom: false, showColumn: false, showCondition: false, showDOBParameters: false, conditionalParamFlagTo: false
        //    });
        //    this.setState({ conditionalParamFlagFrom: true });
        //}
        else if (this.state.ConditionType != "") {
            if (this.state.ConditionType == "Rate") {
                this.setState({
                    showDateFrom: false, showDateTo: false, showTable: false, showConditionFrom: false, showColumn: false, showCondition: false, showDOBParameters: false, conditionalParamFlagTo: false
                });
                this.setState({ conditionalParamFlagFrom: false });
                this.setState({ rateFlag: true });
            }
            if (this.state.ConditionType == "Parameter") {
                this.setState({
                    showDateFrom: false, showDateTo: false, showTable: false, showConditionFrom: false, showColumn: false, showCondition: false, showDOBParameters: false, conditionalParamFlagTo: false
                });
                this.setState({ conditionalParamFlagFrom: true });
                this.setState({ rateFlag: false });
            }
        }
        else {
            this.setState({
                showDateFrom: false, showDateTo: false, showTable: false, showColumn: false, showCondition: false, showDOBParameters: false, conditionalParamFlagFrom: false, conditionalParamFlagTo: false
            });
            this.setState({ showConditionFrom : true,[event.target.name]: event.target.value });
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
                this.setState({ ParameterDetails: data });
                console.log("Rule ParamID Data");
                console.log(this.state.ParamId);
                this.setState({ ParamId: this.state.ParamId.filter(item => item.paramSetId == event.target.value) });
                this.state.ConditionFromAtrrParam = this.state.ParamId;
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
        this.setState({ showTable: false, showColumn: false, showCondition: false, showConditionFrom: false, showDateFrom: false, showDateTo: false, showDOBParameters: false});        
    }
    addRow() {
        //if (this.state.IsCheck == true) {
        //    this.state.fields.conditionvaluefrom = this.state.fields.conditionAttributesValueFrom;
        //    this.state.fields.conditionvalueto = this.state.fields.conditionAttributesValueTo;
        //}
        if (this.state.ConditionType = "Parameter") {
            this.state.fields.conditionvaluefrom = this.state.fields.conditionAttributesValueFrom;
            this.state.fields.conditionvalueto = this.state.fields.conditionAttributesValueTo;
        }
        var Type = "";
        if (this.state.ConditionType = "Rate") {
            this.state.fields.conditionvaluefrom = this.state.fields.RateName;
            this.state.fields.conditionvalueto = this.state.fields.conditionAttributesValueTo;
            Type ="Rate";
        }

        //Checking ALL Condition Attributes and RUle Group Name
        var flagCheckAttr = false;
        if (this.state.ruleType != "") {
            if (this.state.fields.ruleGroupName == "") {
                //swal({
                //    text: "Rule Group is missing",
                //    icon: "error"
                //});
            }
            else {
                flagCheckAttr = true;
            }
        }
        else {
            if (this.state.fields.conditionAttributes == "") {
                swal({
                    text: "Condition Attributes are Missing is missing",
                    icon: "error"
                });
            }
            else {
                flagCheckAttr = true;
            }
        }
        if (this.state.ruleType == "RuleGroup") {
            this.state.fields.RuleObj = "NULL";
        }
        if (this.state.fields.RuleName != "" && this.state.fields.StartDate != "" && this.state.fields.EndDate != "" && this.state.fields.RuleObj != "" && this.state.fields.ValidatorName != "" && this.state.fields.SuccessMsg != "" && this.state.fields.SuccessCode != "" && this.state.fields.FailureCode != "" && this.state.fields.FailureMsg != "" && this.state.ruleType != "" ) {
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
                'isActive': isactive,
                'validatorName': this.state.fields.ValidatorName,
                'successMsg': this.state.fields.SuccessMsg,
                'failureMsg': this.state.fields.FailureMsg,
                'successCode': this.state.fields.SuccessCode,
                'failureCode': this.state.fields.FailureCode,
                'ruleGroupName': this.state.fields.ruleGroupName,
                'type': Type
            });
            //this.state.GridShowData = this.state.tblRuleConditionArray;
            debugger
            //Filtering Parameter Details ParameterDetails
            let parameterName = "";
            if (this.state.fields.conditionAttributes != "") {
                parameterName = this.state.ParameterDetails.filter(it => it.paramId == this.state.fields.conditionAttributes)[0].paramName;
            }
            console.log(parameterName, 'ParameterName');
            //Addition of Parameter Just for Showing Purpose
            let pGridSow = this.state.GridShow;
            this.setState({ GridShow: pGridSow });
            //Adding ParameterName into it.
                pGridSow.push({
                    'parameterName': parameterName,
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
                    'isActive': isactive,
                    'validatorName': this.state.fields.ValidatorName,
                    'successMsg': this.state.fields.SuccessMsg,
                    'failureMsg': this.state.fields.FailureMsg,
                    'successCode': this.state.fields.SuccessCode,
                    'failureCode': this.state.fields.FailureCode,
                    'ruleGroupName': this.state.fields.ruleGroupName
                });
            debugger
            console.log(this.state.GridShow, 'GridShow');
            //Adding into the Grid
            if (this.state.GridShow.length > 0) {
                this.setState({
                    newdata: this.state.GridShow.map((prop, key) => {
                        return {
                            parameterName: prop.parameterName,
                            conditionAttributes: prop.conditionAttribute,
                            conditionOperator: prop.conditionOperator,
                            conditionValueFrom: prop.conditionValueFrom,
                            conditionValueTo: prop.conditionValueTo,
                            tablename: prop.tablename,
                            columnName: prop.columnName,
                            FromDate: prop.FromDate,
                            ToDate: prop.ToDate,
                            DOBConditions: prop.DOBConditions,
                            conditionLogicalOperator: prop.conditionLogicalOperator,
                            createdDate: prop.createdDate,
                            isActive: prop.isActive,
                            validatorName: prop.validatorName,
                            successMsg: prop.successMsg,
                            failureMsg: prop.failureMsg,
                            successCode: prop.successCode,
                            failureCode: prop.failureCode,
                            ruleGroupName: prop.ruleGroupName
                        };
                    })
                });
                console.log(this.state.newdata, 'New Data');
            }
            //// Deleting left Conditional Attributes after selecting One
            var filteredItems = this.state.ParamId.filter(item => item.paramId !== this.state.conditionAttributes);
            this.setState({
                ParamId: filteredItems,
            });
            let state = this.state;
            state['conditionoperator'] = "";
            state['condnLogicoperator'] = "";
            state['condnLogicoperator'] = "";
            this.setState({ state});
            let fields = this.state.fields;
            fields['condnLogicoperator'] = "";
            fields['conditionoperator'] = "";
            fields['conditionvaluefrom'] = "";
            fields['conditionvalueto'] = "";
            fields['tableName'] = "";
            fields['columnName'] = "";
            fields['FromDate'] = "";
            fields['ToDate'] = "";
            fields['DOBConditions'] = "";
            fields['conditionAttributes'] = "";
            fields['ValidatorName'] = "";
            fields['SuccessMsg'] = "";
            fields['FailureMsg'] = "";
            fields['SuccessCode'] = "";
            fields['FailureCode'] = "";
            fields['conditionAttributesValueFrom'] = "";
            fields['conditionAttributesValueTo'] = "";
            fields['ruleGroupName'] = "";
            fields['RateName'] = "";

            this.setState({ fields });
            this.setState({ conditionalParamFlagFrom: false });
            this.setState({ conditionalParamFlagTo: false });
            //For Disabling the Logical Condition 
            this.state.count = this.state.count - 1;
        }
        else {
            swal({
                text: "Some fields are missing",
                icon: "error"
            });
        }
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
                this.dataGrid();
            });
    }
    dataGrid() {
        if (this.state.gridRules.length > 0) {
            this.setState({
                newdataGrid: this.state.gridRules.map((prop, key) => {
                    return {
                        RuleId : prop.rule_id,
                        RuleName: prop.ruleName,
                        StartDate: new Date(prop.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric'}),
                        EndDate: new Date(prop.endDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric'}),
                        ConditionAttributes: prop.conditionAttributes,
                        ParamName: prop.paramName,
                        ConditionValue :prop.conditionValue,
                        CanditionValueTo :prop.conditionvalueto,
                        TableName:prop.tableName,
                        ColumnName: prop.columnName,
                        FromDate: (prop.FromDate != null) ? new Date(prop.FromDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric'}) : "",
                        ToDate: (prop.ToDate != null) ? new Date(prop.ToDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : "",
                        ConditionLogicOperator :prop.conditionLogicOperator
                    };
                })
            });
            console.log(this.state.newdata, 'New Data');
        }
    }
    onFormSubmit = (evt) => {
        var isactive = 1;
        if (this.state.tblRuleConditionArray.length != 0) {
            var data = {
                'ruleName': this.state.fields.RuleName, 'startDate': this.state.fields.StartDate, 'endDate': this.state.fields.EndDate, 'createdDate': date(), 'isActive': isactive, 'ruleObj': this.state.fields.RuleObj, 'tblRuleConditions': this.state.tblRuleConditionArray, 'ruleType': this.state.ruleType
            };
            console.log(data, 'sendingData');
            //console.log('data' + JSON.stringify(data));
            fetch(`${ruleconfig.ruleEngineUrl}/RuleConfig/CreateRules`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(data => { 
                debugger
                console.log(data);
                this.reset();
                swal({
                    text: "Rules Successfully Saved",
                    icon: "success"
                });

            });
            this.setState({
                redirect: true,
            });
        }
        else {
            swal({
                text: "Rules Coditions are missing",
                icon: "error"
            });
        }
    };

    reset() {
        let fields = this.state.fields;
        fields['RuleName'] = "";
        fields['StartDate'] = "";
        fields['EndDate'] = "";
        fields['RuleObj'] = "";
        this.setState({ fields });
        this.setState({
            tblRuleConditionArray: [], show: false, showG: false, ruleGroupFlag:false,
            ParamSetName: [],
            ParamSetid: "",
            ParamId: [],
            tblRuleConditionArray: [],
            ParameterDetails: [],
            count: "",
            newdata: [],
            gridRules: [],
            GridShow: [],
            newdataGrid: [],
            showCondition: false,
            showConditionFrom: false,
            showTable: false,
            showColumn: false,
            showDateFrom: false,
            showDateTo: false,
            showDOBParameters: false,
            conditionalParamFlagFrom: false,
            conditionalParamFlagTo: false,
            IsCheck: false,
        });
        this.setState({});
    }

    componentDidMount() {
        fetch(`${ruleconfig.ruleEngineUrl}/RuleConfig/GetAllParamSet`)
            .then(response => response.json())
            .then(data => {
                this.setState({ ParamSetName: data });
            });
        fetch(`${ruleconfig.ruleEngineUrl}/RuleConfig/GetAllRules`) 
            .then(response => response.json())
            .then(data => {
                this.setState({Rules: data});
            });
        let rateConfigUrl = "http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com";
        fetch(`${rateConfigUrl}/api/RatingConfig/GetRules`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ RateList: data });
                console.log(this.state.RateList, 'CheckData');
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
    //Radio Button Input Change
    

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
                                    <GridItem xs={12} sm={12} md={3}>
                                        <FormControl
                                            fullWidth
                                            className={classes.selectFormControl}
                                        >
                                            <InputLabel
                                                htmlFor="ruleType"
                                                className={classes.selectLabel}
                                            >
                                                Rule Type
                          </InputLabel>
                                            <Select
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                value={this.state.ruleType}
                                                onChange={this.handleSimpleruleGroup}
                                                inputProps={{
                                                    name: "ruleType",
                                                    id: "simple-select1"
                                                }}
                                            >
                                                <MenuItem
                                                    disabled
                                                    classes={{
                                                        root: classes.selectMenuItem
                                                    }}
                                                >
                                                    Rule Type
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="RuleCondition"
                                                >
                                                    RuleCondition
                            </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="RuleGroup"
                                                >
                                                    RuleGroup
                            </MenuItem>

                                            </Select>
                                        </FormControl>
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
                                        <CustomInput
                                            labelText="Validator Name"
                                            id="ValidatorName"
                                            value={this.state.fields.ValidatorName}
                                            name='ValidatorName'
                                            required={true}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Success Msg"
                                            id="SuccessMsg"
                                            value={this.state.fields.SuccessMsg}
                                            name='SuccessMsg'
                                            required={true}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Success Code"
                                            id="SuccessCode"
                                            value={this.state.fields.SuccessCode}
                                            name='SuccessCode'
                                            required={true}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Failure Msg"
                                            id="FailureMsg"
                                            value={this.state.fields.FailureMsg}
                                            name='FailureMsg'
                                            required={true}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Failure Code"
                                            id="FailureCode"
                                            value={this.state.fields.FailureCode}
                                            name='FailureCode'
                                            required={true}
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    {this.state.conditionAttrFlag &&
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
                                    }
                                    {this.state.conditionOprFlag &&
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
                                    }
                                    {
                                        //this.state.isCheckFlag &&
                                        //<GridItem xs={12} sm={12} md={3}>

                                        //    <CustomCheckbox
                                        //        name="IsCheck"
                                        //        labelText="IsParameters"
                                        //        value={this.state.IsCheck}
                                        //        onChange={(e) => this.SetCheckBox(e)}
                                        //        disabled={(coversProductDetails.ProductDTO.ProductDTO.isCoverEvent === false) ? coversData.viewdisable : coversProductDetails.ProductDTO.ProductDTO.isCoverEvent}
                                        //        checked={this.state.IsCheck}

                                        //        formControlProps={{
                                        //            fullWidth: true
                                        //        }}

                                        //    />
                                        //</GridItem>
                                    }
                                    {this.state.isCheckFlag &&
                                        <GridItem xs={12} sm={12} md={3}>
                                            <Dropdown
                                                labelText="Condition Type"
                                                id="ConditionType"
                                                value={this.state.ConditionType}
                                                lstObject={this.state.typeList}
                                                name='ConditionType'
                                                onChange={this.onInputConditionalParam}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>
                                    }
                                    {this.state.conditionalParamFlagFrom &&
                                        <GridItem xs={12} sm={12} md={3}>
                                            <FormControl
                                                fullWidth
                                                className={classes.selectFormControl}
                                            >
                                                <InputLabel
                                                    htmlFor="simple-select"
                                                    className={classes.selectLabel}
                                                >
                                                    Condition Param Value From
                                            </InputLabel>
                                                <Select
                                                    value={this.state.fields.conditionAttributesValueFrom}
                                                    onChange={this.handleSimple}

                                                    MenuProps={{
                                                        className: classes.selectMenu
                                                    }}
                                                    classes={{
                                                        select: classes.select
                                                    }}
                                                    inputProps={{
                                                        name: "conditionAttributesValueFrom",
                                                        id: "simple-select"
                                                    }}
                                                >
                                                    {
                                                        this.state.ConditionFromAtrrParam.map(item =>
                                                            <MenuItem
                                                                value={item.paramName}
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
                                    }
                                    {this.state.conditionalParamFlagTo &&
                                        <GridItem xs={12} sm={12} md={3}>
                                            <FormControl
                                                fullWidth
                                                className={classes.selectFormControl}
                                            >
                                                <InputLabel
                                                    htmlFor="simple-select"
                                                    className={classes.selectLabel}
                                                >
                                                    Condition Param Value To
                                            </InputLabel>
                                                <Select
                                                    value={this.state.fields.conditionAttributesValueTo}
                                                    onChange={this.handleSimple}

                                                    MenuProps={{
                                                        className: classes.selectMenu
                                                    }}
                                                    classes={{
                                                        select: classes.select
                                                    }}
                                                    inputProps={{
                                                        name: "conditionAttributesValueTo",
                                                        id: "simple-select"
                                                    }}
                                                >
                                                    {
                                                        this.state.ConditionFromAtrrParam.map(item =>
                                                            <MenuItem
                                                                value={item.paramName}
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
                                    }
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
                                        <CustomDatetime labelText="From Date" id='FromDate' name='FromDate' onChange={(evt) => this.onDateChange('FromDate', evt)} value={this.state.fields.FromDate} required={true} formControlProps={{ fullWidth: true }} />
                                    </GridItem>
                                    }
                                    {this.state.showDateTo &&
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomDatetime labelText="To Date" id='ToDate' name='ToDate' onChange={(evt) => this.onDateChange('ToDate', evt)} value={this.state.fields.ToDate} required={true} formControlProps={{ fullWidth: true }} />
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
                                    {this.state.ruleGroupFlag &&
                                        <GridItem xs={12} sm={12} md={3}>
                                            <FormControl
                                                fullWidth
                                                className={classes.selectFormControl}
                                            >
                                                <InputLabel
                                                    htmlFor="simple-select"
                                                    className={classes.selectLabel}
                                                >
                                                    Rules
                          </InputLabel>
                                                <Select
                                                    value={this.state.fields.ruleGroupName}
                                                    onChange={this.handleSimple}
                                                    MenuProps={{
                                                        className: classes.selectMenu
                                                    }}
                                                    classes={{
                                                        select: classes.select
                                                    }}
                                                    inputProps={{
                                                        name: "ruleGroupName",
                                                        id: "simple-select"
                                                    }}
                                                >
                                                    {
                                                        this.state.Rules.map(item =>
                                                            <MenuItem
                                                            value={item.ruleId}
                                                                classes={{
                                                                    root: classes.selectMenuItem,
                                                                    selected: classes.selectMenuItemSelected
                                                                }}
                                                            >
                                                                {item.ruleName}
                                                            </MenuItem>
                                                        )
                                                    }
                                                </Select>
                                            </FormControl>
                                        </GridItem>
                                    }
                                    {this.state.rateFlag &&
                                        <GridItem xs={12} sm={12} md={3}>
                                            <FormControl
                                                fullWidth
                                                className={classes.selectFormControl}
                                            >
                                                <InputLabel
                                                    htmlFor="simple-select"
                                                    className={classes.selectLabel}
                                                >
                                                    Rates
                          </InputLabel>
                                                <Select
                                                    value={this.state.fields.RateList}
                                                    onChange={this.onInputChange}
                                                    MenuProps={{
                                                        className: classes.selectMenu
                                                    }}
                                                    classes={{
                                                        select: classes.select
                                                    }}
                                                    inputProps={{
                                                        name: "RateName",
                                                        id: "simple-select"
                                                    }}
                                                >
                                                    {
                                                    this.state.RateList.map(item =>
                                                            <MenuItem
                                                                value={item.ratingId}
                                                                classes={{
                                                                    root: classes.selectMenuItem,
                                                                    selected: classes.selectMenuItemSelected
                                                                }}
                                                            >
                                                                {item.rateName}
                                                            </MenuItem>
                                                        )
                                                    }
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
                                                value={this.state.fields.condnLogicoperator}
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
                                    <GridItem>
                                        <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={() => this.addRow()}> Add  </Button>
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                        {this.state.show &&
                            <GridContainer xl={12}>
                                <GridItem lg={12}>
                                    <ReactTable
                                        title={"Rule Conditions"}
                                        data={this.state.newdata}
                                        filterable
                                        columns={[
                                            {
                                                Header: "Parameter Name",
                                                accessor: "parameterName",
                                                //minWidth: 30,
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                resizable: false,

                                            },
                                            {
                                                Header: "Condition Operator",
                                                accessor: "conditionOperator",
                                                //minWidth: 30,
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                resizable: false,

                                            },
                                            {
                                                Header: "Condition Value From",
                                                accessor: "conditionValueFrom",
                                                minwidth: 30,
                                                style: { textalign: "left" },
                                                headerclassname: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "Condition Value To",
                                                accessor: "conditionValueTo",
                                                minwidth: 30,
                                                style: { textalign: "left" },
                                                headerclassname: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "Table Name",
                                                accessor: "tableName",
                                                minwidth: 30,
                                                style: { textalign: "left" },
                                                headerclassname: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "Column Name",
                                                accessor: "columnName",
                                                minwidth: 30,
                                                style: { textalign: "left" },
                                                headerclassname: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "From Date",
                                                accessor: "FromDate",
                                                minwidth: 30,
                                                style: { textalign: "left" },
                                                headerclassname: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "To Date",
                                                accessor: "ToDate",
                                                minwidth: 30,
                                                style: { textalign: "left" },
                                                headerclassname: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "Condition Logical Operator",
                                                accessor: "conditionLogicalOperator",
                                                minwidth: 30,
                                                style: { textalign: "left" },
                                                headerclassname: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "Rule Group Name",
                                                accessor: "ruleGroupName",
                                                minwidth: 30,
                                                style: { textalign: "left" },
                                                headerclassname: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "Validator Name",
                                                accessor: "validatorName",
                                                minwidth: 30,
                                                style: { textalign: "left" },
                                                headerclassname: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "Success Msg",
                                                accessor: "successMsg",
                                                minwidth: 30,
                                                style: { textalign: "left" },
                                                headerclassname: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "Success Code",
                                                accessor: "successCode",
                                                minwidth: 30,
                                                style: { textalign: "left" },
                                                headerclassname: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "Failure Msg",
                                                accessor: "failureMsg",
                                                minwidth: 30,
                                                style: { textalign: "left" },
                                                headerclassname: 'react-table-center',
                                                resizable: false,
                                            },
                                            {
                                                Header: "Failure Code",
                                                accessor: "failureCode",
                                                minwidth: 30,
                                                style: { textalign: "left" },
                                                headerclassname: 'react-table-center',
                                                resizable: false,
                                            }
                                        ]}
                                        defaultPageSize={5}
                                        showPaginationTop={false}
                                        pageSize={([this.state.GridShow.length + 1] < 5) ? [this.state.GridShow.length + 1] : 5}
                                        showPaginationBottom
                                        className="-striped -highlight discription-tab"
                                    />
                                </GridItem>
                            </GridContainer>
                        }


                    </GridItem>
                </GridContainer>

                <GridContainer justify="center">
                    <GridItem>
                        <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={() => this.onFormSubmit()}> Save  </Button>

                    </GridItem>
                    <GridItem>
                        <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={() => this.onGrid()}> Grid  </Button>

                    </GridItem>
                </GridContainer>
                {this.state.showG &&
                    <GridContainer xl={12}>
                        <GridItem lg={12}>
                            <ReactTable
                                title={"Rules"}
                                data={this.state.newdataGrid}
                                filterable
                                columns={[
                                    {
                                        Header: "Rule Name",
                                        accessor: "RuleName",
                                        //minWidth: 30,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        resizable: false,
                                    },
                                    {
                                        Header: "Start Date",
                                        accessor: "StartDate",
                                        //minWidth: 30,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        resizable: false,
                                    },
                                    {
                                        Header: "End Date",
                                        accessor: "EndDate",
                                        minwidth: 30,
                                        style: { textalign: "left" },
                                        headerclassname: 'react-table-center',
                                        resizable: false,
                                    },
                                    {
                                        Header: "Condition Attributes",
                                        accessor: "ParamName",
                                        minwidth: 30,
                                        style: { textalign: "left" },
                                        headerclassname: 'react-table-center',
                                        resizable: false,
                                    },
                                    {
                                        Header: "Condition Value From",
                                        accessor: "ConditionValue",
                                        minwidth: 30,
                                        style: { textalign: "left" },
                                        headerclassname: 'react-table-center',
                                        resizable: false,
                                    },
                                    {
                                        Header: "Condition Value To",
                                        accessor: "CanditionValueTo",
                                        minwidth: 30,
                                        style: { textalign: "left" },
                                        headerclassname: 'react-table-center',
                                        resizable: false,
                                    },
                                    {
                                        Header: "Table Name",
                                        accessor: "TableName",
                                        minwidth: 30,
                                        style: { textalign: "left" },
                                        headerclassname: 'react-table-center',
                                        resizable: false,
                                    },
                                    {
                                        Header: "Column Name",
                                        accessor: "ColumnName",
                                        minwidth: 30,
                                        style: { textalign: "left" },
                                        headerclassname: 'react-table-center',
                                        resizable: false,
                                    },
                                    {
                                        Header: "From Date",
                                        accessor: "FromDate",
                                        minwidth: 30,
                                        style: { textalign: "left" },
                                        headerclassname: 'react-table-center',
                                        resizable: false,
                                    },
                                    {
                                        Header: "To Date",
                                        accessor: "ToDate",
                                        minwidth: 30,
                                        style: { textalign: "left" },
                                        headerclassname: 'react-table-center',
                                        resizable: false,
                                    },
                                    {
                                        Header: "Condition Logical Operator",
                                        accessor: "ConditionLogicOperator",
                                        minwidth: 30,
                                        style: { textalign: "left" },
                                        headerclassname: 'react-table-center',
                                        resizable: false,
                                    }
                                ]}
                                defaultPageSize={5}
                                showPaginationTop={false}
                                pageSize={([this.state.gridRules.length + 1] < 5) ? [this.state.gridRules.length + 1] : 5}
                                showPaginationBottom
                                className="-striped -highlight discription-tab"
                            />
                        </GridItem>
                    </GridContainer>
                }
            </div>
        );
    }
}
//export default withStyles(extendedFormsStyle)(GeneralParameter);
export default connect(null, null)(withStyles(extendedFormsStyle)(RuleConfig));





