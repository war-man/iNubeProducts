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
import { Animated } from "react-animated-css";
//import ReactTable from "react-table";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import RateConfig from "modules/Rating/RateConfig.js";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import Add from "@material-ui/icons/AddCircleOutline";
import swal from 'sweetalert';
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import data_Not_found from "assets/img/data-not-found-new.png";
import validationPage from "modules/Partners/Organization/views/ValidationPage.jsx";
import Dropzone from 'react-dropzone-uploader';
import Dropdown from "components/Dropdown/Dropdown.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

const paddingCard =
{
    padding: "10px",
}

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

const searchClose = {
    float: "right",
    position: 'relative',
    width: "26px",
    height: "28px",
    borderRadius: "4px",
    fontSize: "larger",
    padding: "0px",
    right: '10px',
}
const dateStyle = {
    width: "max-content",
    marginLeft: "170px",
    marginTop: "-25px",
    backgroundColor: "transparent",
    border: "none",
    zoom: "1.15"
}

const radioAlign = {
    margin: "0 auto",
    textAlign: "center"
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

class RateRules extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //Grid Loader
            result: [],
            //resultDetails:[],
            //Loader
            loader: true,
            pageloader: false,
            nodata: false,

            ShowGrid:false,
            viewdisable:false,
            RateRuleData:[],
            count: 0,
            copyrate: {},
            copyrateList: [],
            show: false,
            showG: false,
            //  date: date,
            IsParameterGrid: false,
            IsParameterRate: true,
            IsDropZone: false,

            RateRule: [],
            productRateObj: [],
            RateObjNew: {},
            RateClassObj: {},
            TableDataList: [],
            TableList: [],
            TableDbSave: [],
            isActive: "",
            parameterId: "",
            EmptyField1: [],

            
            fields: [{
                name: "",
                rateName: "",
                rate: "",
                rateType: "",
                startDate: "",
                endDate: "",
                ConditionOperator: "",
                rateObj: "",
                isParameter: "",
               
                dynamicList: [],
                UploadType:""
              
            }], rateNameState: "",
            StartDateState: "",
            EndDateState: "",
            rateTypeState: "",
            Type: false,
            ExcelTypeButtonflag: false,


            //EmptyFieldz: [{
            //    name: "",
            //    rateName: "",
            //    rate: "",
            //    rateType: "",
            //    startDate: "",
            //    endDate: "",
            //    ConditionOperator: "",
            //    rateObj: "",
            //    isParameter: "",
            //    //dynamicList: [],
            //}],
            ParameterSet: [],
            pageloader: false,
            nodata: false,
            loader: true,
            typeList: [{ "mID": "Excel", "mValue": "Excel", "mType": "Excel" },
                { "mID": "Grid", "mValue": "Grid", "mType": "Grid" }],


        };
        this.handleRateSave = this.handleRateSave.bind(this);
    }



    componentDidMount() {

        fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/GetParameterSet`, {

            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')

            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ ParameterSet: data });
                console.log("ParameterSet", data);
            });

        fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/GetRateRule`, {

            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')

            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ RateRuleData: data });
                console.log("RateRule", data);
            });
        //loader
        setTimeout(
            function () {
                this.setState({ pageloader: true });
            }.bind(this), 2000
        );
    }
    onInputTypeChange = (event) => {
        debugger
        const fields = this.state.fields;
        fields[0][event.target.name] = event.target.value;
        if (event.target.value != "Excel") {
            this.state.ExcelTypeButtonflag = true;
        }
        else {
            this.state.ExcelTypeButtonflag = false;
        }
        this.setState({ fields });

    };
    onInputChange = (type,event) => {
        const fields = this.state.fields;
        fields[0][event.target.name] = event.target.value;
        this.setState({ fields });
        this.change(event, event.target.name, type);

    };
    GridFun = () => {
        this.setState({ ShowGrid:false});
    }

    onDateChange = (formate, name, event,type) => {
        const { validdate } = this.state.fields;
        this.setState({ validdate: false });
        var today = event.toDate();
        if (today.getDate() < 10) {
            var dt = '0' + today.getDate();
        }
        else {
            var dt = today.getDate();
        }
        if (today.getMonth() < 10) {
            var mm = '0' + (today.getMonth() + 1);
        }
        else {
            var mm = (today.getMonth() + 1);
        }
        //var date = today.getFullYear() + '-' + (today.getMonth() + 1)+ '-' + today.getDate();
        var date = dt + '/' + mm + '/' + today.getFullYear();
        const state = this.state.fields;
        state[0][name] = date;
        this.setState({ state });
        this.change(event, name, type);
    };
    
    change(event, stateName, type, date, maxValue) {

        switch (type) {

            case "string":
                if (validationPage.verifyName(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });


                } else {
                    this.setState({ [stateName + "State"]: "error" });


                }
                break;
            case "datetime":
                if (validationPage.verifydatetime(date)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
           
            case "number":
                if (validationPage.verifyNumeric(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
          

            default:
                break;
        }


    }


    onChageRateObj = (event) => {
        
        this.state.TableList = [];
        this.state.copyrateList = [];
        this.state.RateObjNew = {};
        this.state.copyrate = {};
        
        const fields = this.state.fields;
      
        fields[0][event.target.name] = event.target.value;
        this.setState({ fields });
        //Filter through Element 
        this.state.RateRule = this.state.RateRuleData.filter(item => item.parameterSetID == event.target.value);
        this.setState({});
        //this.setState({ RateRule: Rule });
        this.setState({ parameterId: event.target.value });
        this.state.Type = true;
        //radioChange
             if (this.state.RateRule.length > 0) {
                 console.log("abcd", this.state.RateRule)
            this.state.IsParameterGrid = true;
                 this.state.IsParameterRate = false;
                 this.state.IsDropZone = true;
                 this.commonFunRate(0, event.target.value);
                 this.setState({});
                 
             } else {
                 this.setState({ IsDropZone: false });
                 this.setState({ IsParameterGrid: false });
                 this.setState({ IsParameterRate: true });
        }
        this.state.fields[0].isParameter = true;
        this.ratetabledata();
        //this.setState({});
        //this.setState({ fields });
        
        this.change(event, event.target.name);
    }

    commonFunRate = (index, value) => {
        debugger;
        let filter = [];
        if (value != "") {
            filter = this.state.RateRuleData.filter(item => item.parameterSetID == value);
        } else {
            filter = this.state.RateRuleData.filter(item => item.parameterSetID == this.state.parameterId);
        }
        console.log("Ratefilter", filter);
        this.state.productRateObj = filter;
        //this.setState({ productRateObj: filter });
        this.setState({ copyrateList: filter });
        console.log("productRateObj", this.state.productRateObj);
        let lenrate = this.state.TableList.length;


        this.state.RateObjNew = {};
        this.state.RateClassObj = {};

        for (var i = 0; i < filter.length; i++) {
            console.log("Ratefilter loop", this.state.fields[0].rateObj, i, filter);
            this.state.RateObjNew[filter[i].parameterName] = <CustomInput name={filter[i].parameterName} onChange={(e) => this.setRateValue('', e, index)} formControlProps={{ fullWidth: true }} />;
            this.state.RateClassObj[filter[i].parameterName] = "";

        }
        //  this.state.RateObjNew['Rate'] = <CustomInput name="Rate" onChange={(e) => this.setRateValue('', e, index)} formControlProps={{ fullWidth: true }} />;
        this.state.RateObjNew['Rate'] = <CustomInput name="Rate" onChange={(e) => this.setRateValue('', e, index)} formControlProps={{ fullWidth: true }} />;

        this.state.RateObjNew['Action'] = <Button color="info" disabled={this.state.viewdisable} justIcon round simple className="add" onClick={(e) => this.addrowBtn(e, index)}><Add /></Button>
        this.state.TableList.push(this.state.RateObjNew);
        this.state.TableDbSave.push(this.state.RateClassObj);
      
        console.log("RateObjNew", this.state.TableList, this.state.RateObjNew, this.state.TableList.length, index);
        console.log("RateConcatT", this.state.TableDbSave);
      
        for (var i = 0; i < this.state.TableList.length-1; i++) {
            this.state.TableList[i]['Action'] = <Button color="info" disabled={true} justIcon round simple className="add" onClick={(e) => this.addrowBtn(e, i)}><Add /></Button>

        }
        console.log("RateObjNew1", this.state.TableList)
       

    }


    setRateValue = ((type, event, index) => {

        console.log("index: ", index);
        console.log("value: ", event.target.value);
        let RateItem = this.state.TableDbSave;
        let name = event.target.name;
        let value = event.target.value;
        RateItem[index][name] = value;
        this.setState({ RateItem });
        //this.change(event, name, type);
        console.log("RateConcatT", this.state.TableDbSave);
    })

    //add button 
    addrowBtn = (event, index) => {
        let numIndex = Number(index) + 1;
       
        this.commonFunRate(numIndex, "");
        console.log("tableindex", index, numIndex, this.state.TableList, this.state.TableDataList);
        this.setState({});
    }
    //tableData

    
    datechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }
    reset = () => {
        debugger;
        //const obj = this.state.EmptyFieldz;
        //this.state.fields = obj;

      //  this.setState({ obj });
        this.state.TableDbSave = [];
      
        this.state.TableDataList = [];
        this.state.fields[0].rateName = "";
        this.state.fields[0].rateType = "";
        this.state.fields[0].startDate = "";
        this.state.fields[0].endDate = "";
        this.state.fields[0].rate = "";
        this.state.fields[0].rateObj = "";
        this.state.fields[0].isParameter  = "";


            //const obj1 = this.state.EmptyField1;
           //this.state.fields[0].dynamicList = obj1;
        let state = this.state.fields[0];
        state['dynamicList'] = [];

        this.setState({ state });
        console.log("dynamicList", this.state.fields[0].dynamicList);
        this.setState({ IsParameterRate: false });
        this.setState({ IsParameterGrid: false });
        //singleValueIsParameter = [];
    }
    handleRateSave = (event) => {
        if (this.state.fields[0].startDate != "" && this.state.fields[0].endDate != "" && this.state.fields[0].rateName != "") {
            debugger
            if (this.state.IsParameterGrid == true) {
                this.state.fields[0].rate = "";
            }

            this.state.fields[0].dynamicList.push(this.state.TableDbSave);
            //   this.state.fields[0].dynamicList=this.state.TableDbSave;
            console.log("fields", this.state.fields);

            console.log("SaveRa", this.state.ratingRules, this.state.ratingRuleConditions, this.state.TableDbSave);

            let stDate = "";
            let edDate = "";
            if (this.state.fields.length > 0) {
                let isActive = 1;

                if (this.state.fields[0].startDate != "" || this.state.fields[0].endDate != "") {
                    stDate = this.state.fields[0].startDate;
                    edDate = this.state.fields[0].endDate;
                    this.state.fields[0].startDate = this.datechange(this.state.fields[0].startDate)
                    this.state.fields[0].endDate = this.datechange(this.state.fields[0].endDate)
                    // this.state.fields[0].dynamicList.pop();
                }

                var data = {

                    'dynamicList': this.state.fields[0].dynamicList, 'rateObj': this.state.fields[0].rateObj, 'rateName': this.state.fields.rateName, 'rateType': this.state.fields.rateType,
                    'rate': this.state.fields.rate,//'startDate': startDate, 'endDate': endDate ,
                    'createdDate': date(),  //'isActive': isActive, 'parameterSetDetails': sendArray,

                };
                console.log(data, 'Data');
                fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/CreateRateRulesSet`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                    },
                    body: JSON.stringify(this.state.fields[0])
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
                this.state.fields[0].startDate = stDate;
                this.state.fields[0].endDate = edDate;
            } else {
                swal("", "Parameter Should be Added into Grid", "error");
                this.setState({ errormessage: true });
            }
            //end
            console.log("ShowOutput", this.state.fields);
        }
        else {
            swal({
                text: "Some Fields are missing",
                icon: "error"
            });
        }
    }
   
    ratetabledata = () => {
        this.state.TableDataList = this.state.productRateObj.map((prop, key) => {

            console.log("tableData1", this.state.fields);
            return {
                Header: prop.parameterName,
                accessor: prop.parameterName,
            };
        });
        this.state.TableDataList = this.state.TableDataList.concat({
            Header: "Rate",
            accessor: "Rate",
        });
        console.log("TableDataList", this.state.TableDataList);
        this.state.TableDataList = this.state.TableDataList.concat({
            Header: "Action",
            accessor: "Action",
        });
        console.log("Table2", this.state.TableList, this.state.TableDataList);
    }

     handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

    handleSubmit = (files) => {
        debugger
        if (this.state.fields[0].startDate != "" && this.state.fields[0].endDate != "" && this.state.fields[0].rateName != "") {
            console.log("SubmitData", files.map(f => f.meta))
            var data = new FormData();
            if (files.length > 0) {
                for (var i = 0; i < files.length; i++) {
                    data.append(files[i].file.name, files[i].file);

                }
            }

            let that = this;
            $.ajax({
                type: "POST",
                url: `${RateConfig.rateConfigUrl}/api/RatingConfig/RateUpload?RateName=` + this.state.fields[0].rateName + '&RateObj=' + this.state.fields[0].rateObj + '&StartDate=' + this.state.fields[0].startDate + '&Enddate=' + this.state.fields[0].endDate,
                //url: `https://localhost:44364/api/RatingConfig/RateUpload?RateName=` + this.state.fields[0].rateName + '&RateObj=' + this.state.fields[0].rateObj + '&StartDate=' + this.state.fields[0].startDate + '&Enddate=' + this.state.fields[0].endDate,

                contentType: false,
                processData: false,

                data: data,
                beforeSend: function (xhr) {
                    /* Authorization header */
                    xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.getItem('userToken'));
                },
                success: function (response) {
                    console.log("response ", response.responseMessage);
                    swal({
                        text: response.responseMessage,
                        icon: "success"
                    });
                    that.setState({ result: response.gridList });

                    console.log(that.state.result, 'Result');
                    if (that.state.result.length > 0) {
                        that.tabledata(response.gridList);
                        //this.reset();
                    }
                    else {
                        setTimeout(
                            function () {
                                that.setState({ loader: true, searchTableSec: false, nodata: true });
                            }.bind(that), 2000
                        );
                    }

                },
                error: function () {
                    that.GridFun(false);
                    swal({
                        text: "File uploading unsuccessful",
                        icon: "error"
                    });
                }
            });
        }
        else {
            swal({
                text: "Some Fields are missing",
                icon: "error"
            });
        }

    }

    tabledata = (data) => {
        debugger;
        console.log(this.state.result, 'result');
        this.setState({
            resultDetails: Object.keys(data[0]).map((prop, key) => {
                return {
                    Header: prop.charAt(0).toUpperCase() + prop.slice(1),
                    accessor: prop,
                };

            })
        });
        console.log("table data", this.state.resultDetails);
        this.state.IsParameterGrid = false;
        this.setState({ searchTableSec: true, loader: true });
    }



    render() {
        const { classes } = this.props;
        this.state.fields.todayDate = new Date();
        return (
            <div>
                {this.state.pageloader ?
                         <Card>
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <PermIdentity />
                                </CardIcon>
                                <h4 className={this.props.cardIconTitle}>
                                    <small> Rate Table </small>
                                </h4>
                            </CardHeader>
                            <CardBody>

                                <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        success={this.state.rateNameState === "success"}
                                        error={this.state.rateNameState === "error"}
                                          required={true}
                                        labelText=" Rate Table Name"
                                        id="rateName"
                                        value={this.state.fields[0].rateName}
                                        name='rateName'
                                       // onChange={this.onInputChange}
                                        onChange={(event) => this.onInputChange("string", event)}
                                       
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
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
                                                Rate Object
                                           </InputLabel>
                                            <Select
                                                value={this.state.fields[0].rateObj}
                                            
                                            onChange={(event) => this.onChageRateObj(event)}

                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                inputProps={{
                                                    name: "rateObj",
                                                    id: "simple-select"
                                                }}
                                            >
                                                {
                                                    this.state.ParameterSet.map(item =>
                                                        <MenuItem
                                                            value={item.parameterSetID}
                                                            classes={{
                                                                root: classes.selectMenuItem,
                                                                selected: classes.selectMenuItemSelected
                                                            }}
                                                        >
                                                            {item.parameterSetName}
                                                        </MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                 
                                    <GridItem xs={12} sm={12} md={3}>


                                        <CustomDatetime
                                            success={this.state.StartDateState === "success"}
                                            error={this.state.StartDateState === "error"}
                                            required={true}
                                            onFocus={this.state.onClick}
                                            labelText="Start Date"
                                            id='startDate'
                                            name='startDate'
                                            onChange={(event) => this.onDateChange('datetime', 'startDate', event)}
                                            value={this.state.fields[0].startDate}
                                            formControlProps={{ fullWidth: true }} />

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>


                                        <CustomDatetime
                                             success={this.state.EndDateState === "success"}
                                             error={this.state.EndDateState === "error"}
                                             required={true}
                                            onFocus={this.state.onClick}
                                            labelText="EndDate"
                                            id='endDate'
                                            name='endDate'
                                        onChange={(event) => this.onDateChange('datetime', 'endDate', event)}
                                            value={this.state.fields[0].endDate}
                                            formControlProps={{ fullWidth: true }} />

                                </GridItem>
                                {this.state.Type &&
                                    <GridItem xs={12} sm={12} md={3}>
                                        <Dropdown
                                            labelText="Upload Type"
                                            id="UploadType"
                                            value={this.state.fields[0].UploadType}
                                            lstObject={this.state.typeList}
                                            name='UploadType'
                                            onChange={this.onInputTypeChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                }
                                {
                                //    <GridItem xs={12} sm={12} md={3}>
                                //    <CustomInput
                                //        success={this.state.rateTypeState === "success"}
                                //        error={this.state.rateTypeState === "error"}
                                //        required={true}
                                //            labelText=" Rate Type"
                                //            id="rateType"
                                //            value={this.state.fields[0].rateType}
                                //            name='rateType'
                                //       // onChange={this.onInputChange}
                                //        onChange={(event) => this.onInputChange("string", event)}
                                //            formControlProps={{
                                //                fullWidth: true
                                //            }}
                                //        />
                                //</GridItem>
                                }


                                {this.state.IsParameterRate &&
                                  
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput
                                                labelText=" Rate "
                                                id="rate"
                                                value={this.state.fields[0].rate}
                                                name='rate'
                                        onChange={(event) => this.onInputChange("number", event)}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                        />
                                    </GridItem>
                                }

                                {this.state.IsParameterRate &&
                                    <GridContainer justify="center">
                                    <GridItem xs={12} sm={12} md={3}>
                                        <Button style={{ marginTop: "1rem" }}
                                            onClick={() => this.handleRateSave()}
                                            color="info"
                                            round
                                        >
                                            SAVE
                                </Button>
                                    </GridItem>
                                     </GridContainer>
                           }

                                </GridContainer>
                            </CardBody>
                        </Card>
                    : <PageContentLoader />
                }


                {this.state.IsParameterGrid &&
                    <GridContainer xl={12}>
                    <GridItem xs={12}>
                        
                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                                <ReactTable
                                    data={this.state.TableList}
                                    filterable

                                    columns={this.state.TableDataList}
                                  

                                    defaultPageSize={100}
                                    showPaginationTop={false}
                                  
                                showPaginationBottom
                                    className="-striped -highlight discription-tab"
                                />

                        </Animated>
                    
                        
                            <Dropzone
                                maxFiles={1}
                                onChangeStatus={this.handleChangeStatus}
                                onSubmit={this.handleSubmit}
                            />
                        {
                            //this.state.ExcelTypeButtonflag &&
                            //<GridContainer justify="center">
                            //    <Button style={{ marginTop: "1rem" }} onClick={() => this.handleRateSave()}
                            //        color="info"
                            //        round
                            //    >
                            //        SAVE
                            //    </Button>

                            //</GridContainer>
                        }
                    </GridItem>
                    {/* : <GridItem lg={12}>
                        {this.state.IsParameterGrid &&
                            <Card>
                                <GridContainer lg={12} justify="center">
                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                        <img src={data_Not_found} className="tab-data-not-found" />
                                    </Animated>
                                </GridContainer>
                                <GridContainer lg={12} justify="center">
                                    <GridItem xs={5} sm={3} md={3} lg={1} >
                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                            <Button className="secondary-color" round onClick={() => this.searchagain()}> Try again </Button>
                                        </Animated>
                                    </GridItem>
                                </GridContainer>
                            </Card>
                        }

                    </GridItem>*/}

                        

                    </GridContainer>
                }
                {this.state.ExcelTypeButtonflag &&
                    <GridContainer lg={12} justify="center">
                        <GridItem xs={5} sm={3} md={3} lg={1}>
                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                            <Button style={{ marginTop: "1rem" }} onClick={() => this.handleRateSave()}
                                color="info"
                                round>
                                SAVE
                                </Button>
                            </Animated>
                        </GridItem>
                    </GridContainer>
                }

                {this.state.loader ?
                    <GridContainer xl={12}>
                        {this.state.searchTableSec ?

                            < GridItem lg={12}>
                                <ReactTable
                                    title={<h5><TranslationContainer translationKey={"Rates"} /></h5>}
                                    resultDetails
                                    data={this.state.result}
                                    filterable
                                    columns={this.state.resultDetails}
                                    defaultPageSize={4}
                                    pageSize={([this.state.result.length + 1] < 4) ? [this.state.result.length + 1] : 4}
                                    showPaginationTop={false}
                                    //showPaginationBottom={([this.state.data.length + 1] <= 5) ? false : true}
                                    showPaginationBottom={true}
                                    className="-striped -highlight discription-tab"

                                />
                            </GridItem>
                            : <GridItem lg={12}>{
                                this.state.nodata ?
                                    <Card>
                                        <GridContainer lg={12} justify="center">
                                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                <img src={data_Not_found} className="tab-data-not-found" />
                                            </Animated>
                                        </GridContainer>
                                        <GridContainer lg={12} justify="center">
                                            <GridItem xs={5} sm={3} md={3} lg={1} >
                                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                    <Button className="secondary-color" round onClick={() => this.searchagain()}> Try again </Button>
                                                </Animated>
                                            </GridItem>
                                        </GridContainer>
                                    </Card>
                                    : null
                            }
                            </GridItem>
                        }
                    </GridContainer>
                    :
                    <Card style={paddingCard}>
                        <TableContentLoader />
                    </Card>
                }

            </div>
        );
    }
}

export default connect(null, null)(withStyles(extendedFormsStyle)(RateRules));





