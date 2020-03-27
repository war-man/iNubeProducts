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
import AllocationConfig from "modules/Allocation/AllocationConfig.js";
import Dropdown from "components/Dropdown/Dropdown.jsx";


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

class AllocationRules extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //Allocfields: {
            //    allocationObj: "",
            //    dynamicList: [{}],
            //},
            Allocfields: {
                allocationObj: "",
                allocationName: "",
                dynamicList: [{}],
                
                tblAllocationRules: [],
            },
            tblAllocationRules: {
                input: "",
                output: "",
                isMulti: "",
                tblAllocationRuleConditions: "",
            },
            tblAllocationRuleConditions:
            {
                output:"",
            },
          
            RateRuleData: [],
            count: 0,
            copyrate: {},
            copyrateList: [],
            show: false,
            showG: false,
            //  date: date,
            IsParameterGrid: false,
            IsParameterRate: true,
            RateRule: [],
            RateRule1: [],
            productRateObj: [],
            RateObjNew: {},
            RateClassObjInp: {},
            RateObjNewInp: {},
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
               // dynamicList: [],

            }], rateNameState: "",
            StartDateState: "",
            EndDateState: "",
            rateTypeState: "",


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
            newlist: [],

        };
     
        this.handleRateSave1 = this.handleRateSave1.bind(this);
    }



    componentDidMount() {
        //fetch(`${AllocationConfig.ruleEngineUrl}/api/AllocationConfig/GetRateRule?paramid=1` , {
        //    // api / AllocationConfig / GetRateRule ? paramid = 1
        //    method: 'GET',
        //    headers: {
        //        'Accept': 'application/json',
        //        'Content-Type': 'application/json',
        //        'Authorization': 'Bearer ' + localStorage.getItem('userToken')

        //    },
        //})
        //    .then(response => response.json())
        //    .then(data => {
        //        this.setState({ RateRuleData: data });

        //       // this.state.RateRule = this.state.RateRuleData.filter(item => item.allocParametersID == event.target.value);

        //       // this.commonFunRate1(0, event.target.value);

        //        this.setState({});
        //        console.log("RateRuleCHC", this.state.RateRule, this.state.RateRuleData, data);

        //    });



            fetch(`${AllocationConfig.ruleEngineUrl}/api/AllocationConfig/GetParameterSet`, { 
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

                console.log("ParameterSet", data, this.state.ParameterSet);
            });

      
        //loader
        setTimeout(
            function () {
                this.setState({ pageloader: true });
            }.bind(this), 2000
        );
    }

    onInputChange = (type, event) => {
        const Allocfields = this.state.Allocfields;
        Allocfields[event.target.name] = event.target.value;
        this.setState({ Allocfields });
        this.change(event, event.target.name, type);

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

   
    //tableData


    reset = () => {
        debugger;
       
        this.state.TableDbSave = [];

        this.state.TableDataList = [];
            this.state.Allocfields.allocationObj = "";
            this.state.Allocfields.allocationName = "";
        
        this.setState({ IsParameterRate: true });
        this.setState({ IsParameterGrid: false });
       
    }
    
    handleRateSave1 = (event) => {
        debugger
        let sendArray = [];

        //const myObjStr = JSON.stringify(this.state.TableDbSave);

        //console.log(myObjStr, "myObjStr");
        //for (var i = 0; i < this.state.TableDbSave.length; i++) {

        //    sendArray.push({
        //        'input': this.state.TableDbSave[i].State,

        //        'output': myObjStr,
      // const myObjStr = JSON.stringify(this.state.TableDbSave);
       // const myObjStr1 = str.split(',');

      //  console.log(myObjStr, "myObjStr");
        for (var i = 0; i < this.state.TableDbSave.length; i++) {

            sendArray.push({
                'input': this.state.TableDbSave[i].State,

                'output': JSON.stringify(this.state.TableDbSave[i]),

            });


            }
        

        console.log(sendArray, 'SendArrayD');
        //sendArray.pop();
        if (this.state.TableDbSave.length > 0) {
            var data = {

                'allocationObj': this.state.Allocfields.allocationObj,
                'allocationName': this.state.Allocfields.allocationName,
                'tblAllocationRules': sendArray,

            };

            console.log("sendArrayRule", sendArray);
            console.log("AllocfieldsS", this.state.Allocfields, "TableDbSave", this.state.TableDbSave);
            fetch(`${AllocationConfig.ruleEngineUrl}/api/AllocationConfig/CreateAllocationRules`, {
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

        } else {
            swal("", "Parameter Should be Added into Grid", "error");
            this.setState({ errormessage: true });
        }
    }

    ratetabledata = () => {
        debugger
       
        this.state.TableDataList = this.state.productRateObj.map((prop, key) => {

            console.log("tableData1", this.state.TableDataList);
      
            return {
                Header: prop.parameter,
                accessor: prop.parameter,
            };
            
        });
        //this.state.TableDataList = this.state.TableDataList.concat({
        //    Header: prop.output,
        //    accessor: prop.output,
            
        //});

   
        console.log("TableDataListC", this.state.TableList, this.state.TableDataList, this.state.productRateObj);
        this.state.TableDataList = this.state.TableDataList.concat({
            Header: "Action",
            accessor: "Action",
        });
        console.log("Table2", this.state.TableList, this.state.TableDataList);
    }

  
    handleState = (event) =>
    {
        debugger
        this.state.TableList = [];
        this.state.copyrateList = [];
        this.state.RateObjNew = {};
        this.state.RateObjNewInp = {}; 
        this.state.copyrate = {};
        const Allocfields = this.state.Allocfields;
        Allocfields[event.target.name] = event.target.value;
        this.setState({ Allocfields });
        this.setState({});
        this.setState({ flagButton: true });
        
      
      this.setState({ allocParametersID: event.target.value });
        this.setState({ id: event.target.value });

        fetch(`${AllocationConfig.ruleEngineUrl}/api/AllocationConfig/GetRateRule?paramid=` + this.state.Allocfields.allocationObj, {
           
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

               // this.state.RateRule = this.state.RateRuleData.filter(item => item.id == event.target.value);
                this.state.RateRule = this.state.RateRuleData.filter(item => item.allocParametersID == event.target.value);
                this.commonFunRate1(0, event.target.value);
                console.log("RateRuleCH", this.state.RateRule, this.state.RateRuleData, data);
                this.dataGrid();
            });
    
        

    };
    //commonfn
        dataGrid = () => {
        console.log("RateRuleC", this.state.RateRule, this.state.RateRuleData, this.state.data);
        if (this.state.RateRule.length > 0) {
            console.log("flagRule", this.state.RateRule)
            this.setState({ IsParameterGrid: true });
            this.ratetabledata();
            this.setState({ IsParameterRate: false });
        }
        
    }
    commonFunRate1 = (index, value) => {
        debugger
        let filter = [];
      
        if ( value != "") {
           // filter = this.state.RateRuleData.filter(item => item.id == value);
            filter = this.state.RateRuleData.filter(item => item.allocParametersID == value);
        } else {
          //  filter = this.state.RateRuleData.filter(item => item.id == this.state.id);
            filter = this.state.RateRuleData.filter(item => item.allocParametersID == this.state.allocParametersID);
        }
     //   filter = this.state.RateRuleData.filter(item => item.allocParametersID == value);
        console.log("Allocfilter", filter);
        this.state.productRateObj = filter;
      
        this.setState({ copyrateList: filter });
        console.log("productAllocObj", this.state.productRateObj);
        let lenrate = this.state.TableList.length;

        this.state.RateObjNew = {};
        this.state.RateClassObj = {};
        
        for (var i = 0; i < filter.length; i++) {
            console.log("Ratefilter loop", this.state.Allocfields.allocationObj, i, filter);
            this.state.RateObjNew[filter[i].parameter] = <CustomInput name={filter[i].input} onChange={(e) => this.setRateValue('', e, index)} formControlProps={{ fullWidth: true }} />;
            this.state.RateClassObj[filter[i].parameter] = "";
        }
        //    for (var i = 0; i < filter.length; i++) {
        //    this.state.RateObjNew[filter[i].output] = <CustomInput name={filter[i].output} onChange={(e) => this.setRateValue('', e, index)} formControlProps={{ fullWidth: true }} />;
        //    this.state.RateClassObj[filter[i].output] = "";

           

        //}

      
       this.state.RateObjNew['Action'] = <Button color="info" disabled={this.state.viewdisable} justIcon round simple className="add" onClick={(e) => this.addrowBtn(e, index)}><Add /></Button>

        this.state.TableList.push(this.state.RateObjNew);
    
        this.state.TableDbSave.push(this.state.RateClassObj);
     
        console.log("RateObjNew1", this.state.RateObjNew, this.state.TableList,this.state.TableList.length, index);

        console.log("RateConcatTB", this.state.TableDbSave);

    }

    //add button 
    addrowBtn = (event, index) => {
        debugger
        let numIndex = Number(index) + 1;
        this.commonFunRate1(numIndex, "");
       
        console.log("tableindex", index, numIndex, this.state.TableList, this.state.TableDataList);
        console.log("tableindex1", this.state.TableDataList, this.state.TableList);
        this.setState({});
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
                                <small> Allocation Rules </small>
                            </h4>
                        </CardHeader>
                        <CardBody>

                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <Dropdown
                                        required={true}
                                        labelText="Allocation Name"
                                        id="allocationObj"
                                        lstObject={this.state.ParameterSet}
                                       value={this.state.Allocfields.allocationObj}
                                        name='allocationObj'
                                        onChange={(event) => this.handleState(event)}
                                   
                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>

                                    <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        required={true}
                                            labelText=" Rule Allocate "
                                        id="allocationName"
                                            value={this.state.Allocfields.allocationName}
                                        name='allocationName'
                                   
                                        onChange={(event) => this.onInputChange("string", event)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>

                                {this.state.IsParameterRate &&
                                    <GridContainer justify="center">
                                        <GridItem xs={12} sm={12} md={3}>
                                            <Button style={{ marginTop: "1rem" }}
                                                onClick={() => this.handleRateSave1()}
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
                                    defaultPageSize={7}
                                    showPaginationTop={false}
                                  showPaginationBottom
                                    className="-striped -highlight discription-tab"
                                />

                            </Animated>
                            <GridContainer justify="center">

                                <Button style={{ marginTop: "1rem" }} onClick={() => this.handleRateSave1()}
                                    color="info"
                                    round
                                >
                                    SAVE
                                </Button>
                            </GridContainer>
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


            </div>
        );
    }
}

export default connect(null, null)(withStyles(extendedFormsStyle)(AllocationRules));





