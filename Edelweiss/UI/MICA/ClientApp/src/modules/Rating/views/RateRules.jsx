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
            count: 0,
            copyrate: {},
            copyrateList: [],
            show: false,
            showG: false,
            //  date: date,
            IsParameterGrid: false,
            IsParameterRate: false,
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

            EmptyField: [{
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
            }],
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
              
            }],
            ParameterSet:[],

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
                this.setState({ RateRule: data });
                console.log("RateRule", data);
            });
    }

    onInputChange = (evt) => {
        const fields = this.state.fields;
        fields[0][evt.target.name] = evt.target.value;
        this.setState({ fields });
    };

    onDateChange = (formate, name, event) => {
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

    };
    


    handleRadioOnChange = (event) => {
        const fields = this.state.fields;
        this.state.singleValueIsParameter = event.target.value;
        if (event.target.value == 0) {
            this.setState({ IsParameterGrid: true });
            this.setState({ IsParameterRate: false });
            this.state.fields[0].isParameter = true;
            

            // this.addRule();
            this.ratetabledata();
            this.setState({});
        }
        else {
            this.setState({ IsParameterGrid: false });
            this.setState({ IsParameterRate: true });
            
            this.state.fields[0].isParameter = false;

        }

    }


    onChageRateObj = (evt) => {
        
        this.state.TableList = [];
        this.state.copyrateList = [];
        this.state.RateObjNew = {};
        this.state.copyrate = {};
        const fields = this.state.fields;
        //   fields[evt.target.name] = evt.target.value;
        fields[0][evt.target.name] = evt.target.value;
        this.setState({ fields });
        //Filter through Element 

        const Rule = this.state.RateRule.filter(item => item.parameterSetID == evt.target.value);
        this.setState({ RateRule: Rule });
        this.setState({ parameterId: evt.target.value });
        this.commonFunRate(0, evt.target.value);

    }

    commonFunRate = (index, value) => {
        let filter = [];
        if (value != "") {
            filter = this.state.RateRule.filter(item => item.parameterSetID == value);
        } else {
            filter = this.state.RateRule.filter(item => item.parameterSetID == this.state.parameterId);
        }
        console.log("Ratefilter", filter);
        this.setState({ productRateObj: filter });
        this.setState({ copyrateList: filter });

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
        console.log("RateObjNew", this.state.RateObjNew, this.state.TableList.length, index);
        console.log("RateConcatT", this.state.TableDbSave);

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

    addRule = () => {

        for (let i = 0; i < this.state.productRateObj.length; i++) {
            this.state.fields = this.state.fields.concat({
                name: this.state.productRateObj[i].parameterName,
            })
        }
        this.ratetabledata();
    }
    datechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }
    reset = () => {
        debugger;
        const obj = this.state.EmptyField;
        this.state.fields = obj;

        this.setState({ obj });
        this.state.TableDbSave = [];
      
        this.state.TableDataList = [];
           //this.state.fields[0].dynamicList = [];
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
        this.state.fields[0].dynamicList.push(this.state.TableDbSave);
    //   this.state.fields[0].dynamicList=this.state.TableDbSave;
        console.log("fields", this.state.fields);

        console.log("abc", this.state.ratingRules, this.state.ratingRuleConditions, this.state.TableDbSave);



        if (this.state.fields.length > 0) {
            let isActive = 1;
           
            if (this.state.fields[0].startDate != "" || this.state.fields[0].endDate != "") {
                this.state.fields[0].startDate = this.datechange(this.state.fields[0].startDate)
                this.state.fields[0].endDate = this.datechange(this.state.fields[0].endDate)
            }
  
            var data = {

                'dynamicList': this.state.fields[0].dynamicList, 'rateObj': this.state.fields[0].rateObj, 'rateName': this.state.fields.rateName, 'rateType': this.state.fields.rateType,
                'rate': this.state.fields.rate,//'startDate': startDate, 'endDate': endDate ,
                'createdDate': date(),  //'isActive': isActive, 'parameterSetDetails': sendArray,

            };
            //  delete fields[0].att[0];
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
        } else {
            swal("", "Parameter Should be Added into Grid", "error");
            this.setState({ errormessage: true });
        }
        //end
        console.log("ShowOutput", this.state.fields);
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
                                    <small> Rate Rules </small>
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
                                                Rate Object
                                           </InputLabel>
                                            <Select
                                                value={this.state.fields[0].rateObj}
                                                onChange={this.onChageRateObj}
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
                                        <CustomInput
                                            labelText=" Rate Rule Name"
                                            id="rateName"
                                            value={this.state.fields[0].rateName}
                                            name='rateName'
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>


                                        <CustomDatetime
                                            //  success={this.state.StartDateState === "success"}
                                            //  error={this.state.StartDateState === "error"}
                                            // required={true}
                                            onFocus={this.state.onClick}
                                            labelText="Start Date"
                                            id='startDate'
                                            name='startDate'
                                            onChange={(evt) => this.onDateChange('datetime', 'startDate', evt)}
                                            value={this.state.fields[0].startDate}
                                            formControlProps={{ fullWidth: true }} />

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>


                                        <CustomDatetime
                                            //  success={this.state.EndDateState === "success"}
                                            //  error={this.state.EndDateState === "error"}
                                            // required={true}
                                            onFocus={this.state.onClick}
                                            labelText="EndDate"
                                            id='endDate'
                                            name='endDate'
                                            onChange={(evt) => this.onDateChange('datetime', 'endDate', evt)}
                                            value={this.state.fields[0].endDate}
                                            formControlProps={{ fullWidth: true }} />

                                    </GridItem>


                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText=" Rate Type"
                                            id="rateType"
                                            value={this.state.fields[0].rateType}
                                            name='rateType'
                                            onChange={this.onInputChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>


                                    <GridItem>
                                        <h5 id="radio-bnt-text"> IsParameter</h5>
                                        {/*       <CustomRadioButton radiolist={props.radiolist1} onChange={(e) => props.onChangeradio(e, 'radiolist1')} />
                        */}
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <div style={{ marginTop: "24px" }}>
                                            <FormControlLabel
                                                control={
                                                    <Radio

                                                        checked={this.state.singleValueIsParameter === "0"}
                                                        onChange={this.handleRadioOnChange}
                                                        disabled={this.state.viewdisable}
                                                        value={0}
                                                        name="singleValueIsParameter"
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
                                                        checked={this.state.singleValueIsParameter === "1"}
                                                        onChange={this.handleRadioOnChange}
                                                        disabled={this.state.viewdisable}
                                                        value={1}
                                                        name="singleValueIsParameter"
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
                                        </div>

                                    </GridItem>
                                    {this.state.IsParameterRate &&
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput
                                                labelText=" Rate "
                                                id="rate"
                                                value={this.state.fields[0].rate}
                                                name='rate'
                                                onChange={this.onInputChange}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>
                                    }
                                </GridContainer>
                            </CardBody>
                        </Card>

                    </GridItem>
                </GridContainer>

                {this.state.IsParameterGrid &&
                    <GridContainer xl={12}>
                        <GridItem xs={12}>
                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                                <ReactTable
                                    data={this.state.TableList}
                                    filterable

                                    columns={this.state.TableDataList}
                                    //columns={[
                                    //    {
                                    //        Header: "Select",
                                    //        accessor: "radio",
                                    //        minWidth: 30,
                                    //        setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                    //        headerClassName: 'react-table-center',
                                    //        sortable: false,
                                    //        filterable: false,
                                    //        resizable: false,
                                    //    },
                                    //]}

                                    defaultPageSize={5}
                                    showPaginationTop={false}
                                    // pageSize={([prop.billingItem[props.index].BillingItemDetail.length + 1] < 5) ? [prop.billingItem[props.index].BillingItemDetail.length + 1] : 5}
                                    showPaginationBottom
                                    className="-striped -highlight discription-tab"
                                />

                            </Animated>
                        </GridItem>

                    </GridContainer>
                }
                <GridContainer justify="center">

                    <Button style={{ marginTop: "1rem" }} onClick={() => this.handleRateSave()}
                        color="info"
                        round
                    >
                        SAVE
                                </Button>

                </GridContainer>

            </div>
        );
    }
}

export default connect(null, null)(withStyles(extendedFormsStyle)(RateRules));





