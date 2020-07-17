import React from "react";
import { withStyles } from '@material-ui/core/styles';
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
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import Modal from '@material-ui/core/Modal';
import SearchCalculationConfig from "./SearchCalculationConfig.jsx";
import Edit from "@material-ui/icons/Edit";
import { parse } from "filepond";

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

class EditCalculationConfig extends React.Component {
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
                ConditionalParam:"",
                checkedA: true,
                checkedB: false,
                simpleSelect: "",
                ruleobjectname: "",
                multipleSelect: [],
                IsActive: "",
                CreatedDate: "",
                createddateParamset: "",
                isactive: ""
            },

            RateRules: [],
            flag: false,
            rateflag: false,
            condnflag: false,
            ExpressionResultData: "",
            ruleobj: [],
            ExpressionSendingArray: [],
            RateRulesdata: [],
            RateRulesdataDetails: [],
            RateParam: [],
            RateArr: [],
            ParamArr: [],
            CalRateArray: [],
            CalParameterArray: [],
            multiselectArray: [],

            sendingExpression: "",
            CalRateArray: [],

            expressionFlag: false,
            flagButon: false,
            ExpressionArray: [],
            sendingArray: [],
            expId: "",
            indexId: "",
            parameterCard: false,
            gridArray: "",
            ConditionalParameterAr: [],
            typeList: [{ "mID": 1, "mValue": "Rate", "mType": "RateConfig" },
            { "mID": 2, "mValue": "Parameter", "mType": "RateConfig" },
                { "mID": 3, "mValue": "ConditionalValues", "mType": "RateConfig" }],
            ExpCalParamConfigTst :""
        };
    }

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

        //for grid--expression value & result
        fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/GetCalConfigExpressions?CalculationConfigId=`+ this.props.RateID+` &isFilter=true` , {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ RateRulesdata: data });
                if (this.state.RateRulesdata.length > 0) {
                    this.tabledata();
                }
                console.log(this.state.RateRulesdata,'rule data');
            });
        //for chip--expressions, parameters & rate
        debugger;
        fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/GetCalConfigParam?CalculationConfigId=` + this.props.RateID + ` &isFilter=true`, {
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
                this.state.RateArr = this.state.RateParam.filter(x => x.type == "Rate");
                this.state.ParamArr = this.state.RateParam.filter(x => x.type != "Rate");
                this.state.CalParameterArray = this.state.ParamArr;//Parameter

                //ForRate
                for (var i = 0; i <= this.state.RateArr.length - 1; i++) {
                    let pCalRateArray = this.state.multiselectArray;
                    this.setState({ multiselectArray: pCalRateArray });
                    let Type = "Rate";
                    let isActive = 1;
                    pCalRateArray.push({
                        'rateName': this.state.RateArr[i].calculationConfigParamName,
                        'createdDate': date(),
                        'isActive': isActive,
                        'type': Type
                    });
                    console.log('ratename', this.state.RateArr[i].calculationConfigParamName)
                }

                console.log('arr data',data, this.state.RateArr, this.state.ParamArr);
            });
    }

    tabledata = () => {
        this.setState({
            RateRulesdataDetails: this.state.RateRulesdata.map((prop, key) => {
                return {
                    SNo: key + 1,
                    ExpressionId: prop.calculationConfigExpressionId,
                    ConfigId: prop.calculationConfigId,
                    Steps : prop.steps,
                    ExpressionValue: prop.expressionValue,
                    ExpressionResult: prop.expressionResult,
                    btn: <div><Button color="info" justIcon round simple className="edit" onClick={(e) => this.expressionFun(e, key,prop.calculationConfigExpressionId, prop.expressionValue,prop.expressionResult)}><Edit /></Button>
                    </div>

                };
            })
        });
    }

    expressionFun = (e,index,Eid,Eval,Eres) => {
        this.state.expressionFlag = true;
        this.setState({});
        this.state.fields.Expression = Eval;//to populate expression on field
        this.state.fields.ExpressionResult = Eres;//to populate expression result on field
        this.state.ExpCalParamConfigTst = Eres; //To add and modify that parameter into calconfig also 
        this.state.expId = Eid;
        this.state.indexId = index;
        this.setState({});
        console.log('eid', this.state.expId);
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
        else if (evt.target.value == 3) {
            this.state.flag = false;
            this.state.rateflag = false;
            this.state.condnflag = true;
        }
        else {
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


    handleEvaluator = (value) => {
        //For Sending Array With {}
        this.state.sendingExpression = this.state.sendingExpression + value;
        //sending Grid
        this.state.gridArray = this.state.gridArray + value;
        //Previous
        this.state.fields.Expression = this.state.fields.Expression + value;
        this.setState({});
        console.log(this.state.fields.Expression, 'Expression');


    }

    onclickParameter(parameter) {
        debugger
        //For Sending Array With {}
        this.state.sendingExpression = this.state.sendingExpression + "{" + parameter + "}";
        //Previous 
        this.state.fields.Expression = this.state.fields.Expression + parameter;
        console.log(this.state.fields.Expression, 'Expression');
        //For Sending into Data List
        this.state.gridArray = this.state.gridArray + "(" + parameter + ")";
        this.setState({});
    }

    onclickConditionalParameter(parameter) {
        debugger
        //For Sending Array With {}
        this.state.sendingExpression = this.state.sendingExpression + parameter;
        //Previous
        this.state.fields.Expression = this.state.fields.Expression + parameter;
        this.state.gridArray = this.state.gridArray + "(" + parameter + ")";
        console.log(this.state.fields.Expression, 'Expression');
        this.setState({});
    }

    onCLickRates(rates) {
        //For Sending Array With {}
        this.state.sendingExpression = this.state.sendingExpression + "{" + rates + "}";
        //Sending Grid
        this.state.gridArray = this.state.gridArray + "(" + rates + ")";
        //Previous Array 
        this.state.fields.Expression = this.state.fields.Expression + rates;
        console.log(this.state.fields.Expression, 'Expression');
        this.setState({});
        //For Adding into GRid to use that Rate Rules Later 
        let pCalRateArray = this.state.CalRateArray;
        this.setState({ CalRateArray: pCalRateArray });
        let Type = "Rate";
        let isActive = 1;
        //Checking if Parameter Exists of not 
        let calRateArray = this.state.CalRateArray;
        for (var j = 0; j < calRateArray.length; j++) {
            if (rates != calRateArray[j]) {
                pCalRateArray.push({
                    'calculationConfigParamName': rates,
                    'createdDate': date(),
                    'isActive': isActive,
                    'type': Type
                });
            }
        }
        
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

    addCalConfigParam() {
        this.state.fields.RateConfigName = this.props.RateVal;
        if (this.state.fields.RateConfigName != "") {
            //Showing Grid
            //For Displaying into Grid
            //this.setState({ displayCalculationParameterGrid: true });
            debugger
            //Removing Space
            this.state.fields.CalConfigParam = this.state.fields.CalConfigParam.split(' ').join('');
            //Removing Wild Card Character
            this.state.fields.CalConfigParam = this.state.fields.CalConfigParam.replace(/[^a-zA-Z0-9 ]/g, "");

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

    addConditionalParameter() {
        this.state.fields.RateConfigName = this.props.RateVal;
        if (this.state.fields.RateConfigName != "") {
            debugger
            //Removing Space
            this.state.fields.ConditionalParam = this.state.fields.ConditionalParam.split(' ').join('');
            //Removing Wild Card Character
            this.state.fields.ConditionalParam = this.state.fields.ConditionalParam.replace(/[^a-zA-Z0-9 ]/g, "");

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
        let expRes = this.state.fields.ExpressionResult;
        let expVal = this.state.fields.Expression;
        console.log('newExp', this.state.fields.ExpressionResult, this.state.fields.Expression);
        if (this.state.fields.ExpressionResult != "" && this.state.fields.Expression != "") {
            console.log('expId', this.state.expId);
            var value = this.state.RateRulesdata.length;
            var stepsValue = this.state.RateRulesdata[this.state.RateRulesdata.length - 1];
            var stsValue = parseInt(stepsValue.steps) + 1;
            var abc = parseInt((this.state.RateRulesdata[this.state.RateRulesdata.length - 1]).steps) + 1;
            console.log(stepsValue, value, 'Check');
            if (this.state.expId == "") {
                //push newly added expression into grid
                let newExp = this.state.RateRulesdata;
                this.setState({ RateRulesdata: newExp });
                newExp.push({
                    'expressionResult': this.state.fields.ExpressionResult,
                    'expressionValue': this.state.gridArray,
                    'steps': parseInt((this.state.RateRulesdata[this.state.RateRulesdata.length - 1]).steps) + 1,
                    'date': date(),
                    'isActive': 1
                });
                console.log('newExp', this.state.fields.ExpressionResult, this.state.fields.Expression);
                console.log(this.state.RateRulesdata, 'CHeck');
                this.tabledata();
            

            //Showing Grid
                var isActive = 1;
                let pExpressionArray = this.state.ExpressionArray;
                this.setState({ ExpressionArray: pExpressionArray });

                pExpressionArray.push({
                    'expressionResult': this.state.fields.ExpressionResult,
                    'expressionValue': this.state.fields.Expression,
                    'date': date(),
                    'isActive': isActive
                });
                //Saving Purpose Array with {} to Replace Value 
                let psendingArray = this.state.sendingArray;
                this.setState({ sendingArray: psendingArray });

                psendingArray.push({
                    'expressionResult': this.state.fields.ExpressionResult,
                    'expressionValue': this.state.sendingExpression,
                    'date': date(),
                    'isActive': isActive
                });

                //After Adding Every Expression it Sould Configure 
                let pCalParameterArray = this.state.CalParameterArray;
                this.setState({ CalParameterArray: pCalParameterArray });
                let Type = "";
                let calParamArray = this.state.CalParameterArray;
                //for (var i = 0; i < calParamArray.length; i++) {
                //    if (this.state.fields.ExpressionResult != calParamArray[i]) {
                //        pCalParameterArray.push({
                //            'calculationConfigParamName': this.state.fields.ExpressionResult,
                //            'createdDate': date(),
                //            'isActive': isActive,
                //            'type': Type
                //        });
                //    }
                //}
                debugger 
                //this.state.ExpressionResultData
                pCalParameterArray.push({
                    'calculationConfigParamName': this.state.fields.ExpressionResult,
                    'createdDate': date(),
                    'isActive': isActive,
                    'type': Type
                });
                // Adding those parameter into the Grid
                if (this.state.CalParameterArray.length > 0) {
                    this.setState({
                        newParamData: this.state.CalParameterArray.map((prop, key) => {

                            return {
                                CalConfigParam: prop.calculationConfigParamName
                            };
                        })
                    });
                }

                // State Set After Selecting
                this.setState({ ExpressionResult: '', Expression: '' });
                this.state.fields.ExpressionResult = "";
                this.state.fields.Expression = "";
                this.setState({ sendingExpression: '' });
                this.state.sendingExpression = "";
                //State Set
                let fields = this.state.fields;
                fields['ExpressionResult'] = "";
                fields['Expression'] = "";
                this.setState({ fields });
                let state = this.state;
                state['gridArray'] = "";
                this.setState({ state });
                expRes = "";
                expVal = "";
                this.setState({});
                console.log(this.state.ExpressionArray, 'CalParamArray');
                debugger
                console.log(this.state.RateRulesdata, this.state.sendingArray, 'RateRulesData/SendingRules');

                if (this.state.ExpressionArray.length > 0) {
                    this.setState({
                        newExpressionData: this.state.ExpressionArray.map((prop, key) => {

                            return {
                                ExpressionResult: prop.expressionResult,
                                Expression: prop.expressionValue,
                            };
                        })
                    });
               }
            }

            else {
                debugger;
                let rule = this.state.RateRulesdata;
                let id = this.state.expId;
                console.log('expression', expRes, expVal);
                console.log('Ruledata', rule, id);

                //let pExpressionSendingArray = this.state.ExpressionSendingArray;
                //this.setState({ ExpressionSendingArray: pExpressionSendingArray});
                //pExpressionSendingArray.push({
                //    'expressionResult': expRes,
                //    'expressionValue': expVal
                //});
               let index = this.state.indexId;
               // let modifyData = rule.filter(x => x.expressionId == id);
                //console.log('modifydata', modifyData, this.state.sendingExpression);
                //rule[index].expressionResult = this.state.fields.ExpressionResult;
                rule[index].expressionResult = this.state.fields.ExpressionResult;

                //Check when Grid array is null means modificatio of formula is not done 
                if (this.state.gridArray != "") {
                    rule[index].expressionValue = this.state.gridArray;
                }
                else {
                    rule[index].expressionValue = expVal;
                }
                console.log('Aftermodifydata', this.state.RateRulesdata, this.state.fields.Expression);
                this.setState({ rule });
                this.tabledata();
                

                //Adding into 
                debugger
                let ConfigIdUpdate = "";
                var calArraylength = this.state.CalParameterArray.length;
                for (var z = 0; z < calArraylength; z++) {
                    if (this.state.CalParameterArray[z].calculationConfigParamName == this.state.ExpCalParamConfigTst) {
                        ConfigIdUpdate = this.state.CalParameterArray[z].calculationConfigParamId;
                        this.state.CalParameterArray[z].calculationConfigParamName = expRes;
                    }
                }
                    

                //pExpressionArray[this.state.expId]['expressionResult'] = this.state.fields.ExpressionResult;
                //pExpressionArray[this.state.expId]['expressionValue'] = this.state.sendingExpression;
                let fields = this.state.fields;
                fields['ExpressionResult'] = "";
                fields['Expression'] = "";
                this.setState({ fields });
                let state = this.state;
                state['expId'] = "";
                state['gridArray'] = "";
                this.setState({ state });
                expRes = "";
                expVal = "";
                this.setState({});
                debugger 

                console.log(this.state.fields.ExpressionResult, this.state.fields.Expression, 'ExpressionValues');
               
            }
        }
        else {
                swal("", "Some fields are missing", "error");
                this.setState({ errormessage: true });
            }
        
      

    }

    resetFields() {
        this.state.ExpressionResultData = this.state.fields.ExpressionResult;
        let rate = this.state.fields;
        rate['ExpressionResult'] = "";
        rate['Expression'] = "";
        this.setState({ rate });

        let state = this.state;
        state['sendingExpression'] = "";
        this.setState({ state });
    }

    onFormSubmit = (evt) => {
        debugger;
        let isActive = 1;
        //Merging Both Array With Rate Values Also 
        console.log(this.state.CalParameterArray, 'CalParamArray');
        console.log(this.state.CalRateArray, 'CalRate');
        this.state.CalRateArray = this.state.CalRateArray.concat(this.state.RateArr);
        this.state.CalParameterArray = this.state.CalParameterArray.concat(this.state.CalRateArray);

        
        //In Remove duplicate value 

        //var length = this.state.RateParam.length;
        //for (var i = 0; i < length; i++) {
        //    var index = this.state.CalParameterArray.indexOf(this.state.RateParam[i]);
        //    delete this.state.CalParameterArray[index];
        //}


        //Check weather that Expresion result is present or not if not removal of 
        //var calParamLength = this.state.CalParameterArray.length;
        //var expLength = this.state.RateRulesdata.length;
        //for (var i = 0; i < calParamLength; i++) {
        //    for (var j = 0; j < expLength; j++) {
        //        if (this.state.CalParameterArray[i].type == "") {
        //            if (this.state.CalParameterArray[i] != this.state.RateRulesdata[j].ExpressionResult) {
        //                var index = this.state.CalParameterArray.indexOf(this.state.RateParam[i]);
        //                delete this.state.CalParameterArray[index];
        //            }
        //        }
        //    }
        //}

        debugger
        console.log(this.state.CalParameterArray, 'CalCUlationConfig');
        //Distinct ConfigParam
        let calData = this.state.CalParameterArray;
        const uniqueParameter = calData.filter((val, id, array) => array.indexOf(val) == id);
        
        debugger
        console.log(uniqueParameter, 'UniqueParam');
        var data = {
            'calculationConfigId': this.props.RateID, 'calculationConfigName': this.props.RateVal, 'createdDate': date(), 'isActive': isActive, 'calculationConfigExpression': this.state.RateRulesdata, 'calculationConfigParam': uniqueParameter 
        };
        fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/EditCalConfigRules`, {
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

    reset() {
        this.setState({ ExpressionArray: [], CalParameterArray: [], parameterCard: false, sendingArray: [] });
        let rate = this.state.fields;
        rate['RateConfigName'] = "";
        rate['RateConfigDDID'] = "";
    }

    render() {
        const { classes } = this.props;
        console.log("this.props:", this.props);
        return (
            <div>
                <Card>
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <PermIdentity />
                        </CardIcon>
                        <h4 className={this.props.cardIconTitle}>
                            <small> Edit Calculation Config </small>
                        </h4>
                    </CardHeader>

                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="Rate Config Name"
                                    id="RateVal"
                                    required={true}
                                    disabled="true"
                                    value={this.props.RateVal}
                                    name='RateVal'
                                    //onChange={this.onInputChange}
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
                                        labelText="Conditional Values"
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


                        <Card>
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
                                                label="AND"
                                                onClick={() => this.handleEvaluator("AND")} />
                                            <Chip size="small"
                                                label="OR"
                                                onClick={() => this.handleEvaluator("OR")} />

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

                                                )
                                                )

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
                                                <small> Conditional Values </small>
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

                                {//this.state.expressionFlag ?
                                }
                                    <GridContainer>
                                        <h4><small>Expression Condition</small></h4>


                                        {/* Label */}
                                        <GridContainer justify="center" xs={12} className="cal-label">
                                            <h4 id="expression-step"><small>Step 1</small></h4>

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
                                </GridContainer> {//: null
                                }
                            </CardBody>
                        </Card>

                       


                    </CardBody>
                </Card>

                <GridContainer xl={12}>
                    <GridItem xs={12}>
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                            <ReactTable
                                data={this.state.RateRulesdataDetails}
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
                                        Header: "Expression Value",
                                        accessor: "ExpressionValue",
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
                                        Header: "Action",
                                        accessor: "btn",
                                        minWidth: 30,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        resizable: false,
                                    }
                                ]}
                                defaultPageSize={5}
                                showPaginationTop={false}
                                //pageSize={([this.state.newExpressionData.length + 1] < 5) ? [this.state.newExpressionData.length + 1] : 5}
                                showPaginationBottom
                                className="-striped -highlight"
                            />

                        </Animated>
                    </GridItem>
                </GridContainer>

                    <GridContainer lg={12} justify="center">
                        <GridItem xs={5} sm={3} md={3} lg={1}>
                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                <Button style={{ marginTop: "1rem" }} color="info" round onClick={() => this.onFormSubmit()}>
                                    Save
                                    </Button>
                            </Animated>
                        </GridItem>
                    </GridContainer>
            </div>

        );

    }
}
export default connect(null, null)(withStyles(extendedFormsStyle)(EditCalculationConfig));