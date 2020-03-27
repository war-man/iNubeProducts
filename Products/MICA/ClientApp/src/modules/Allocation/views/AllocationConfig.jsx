import React from "react";
import PropTypes, { string } from "prop-types";
import { connect } from 'react-redux';
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";
import Button from "components/CustomButtons/Button.jsx";
import MenuItem from "@material-ui/core/MenuItem";
import classNames from "classnames";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Select from "@material-ui/core/Select";
import Assignment from "@material-ui/icons/Assignment";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
//import config from '../../../../config.js';
import "react-table/react-table.css";
import { Row, Col } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import $ from 'jquery';
import "react-table/react-table.css";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import RateConfig from "modules/Rating/RateConfig.js";
import { keys } from "@material-ui/core/styles/createBreakpoints";
import swal from 'sweetalert';
import { Animated } from "react-animated-css";
import AllocationConfig from "modules/Allocation/AllocationConfig.js";
import Dropdown from "components/Dropdown/Dropdown.jsx";


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

class AllocationConf extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {
                allocParamName: "",
                //parameter Name
                // input: "",

                MasterList: "",
                // dataType: "",
                tblAllocParameterSet: [],
                tblAllocParameterSetDetails: "",
            },
            AllocParameterSet: {
                input: "",
                dataType: "",
                
            },
            tblAllocParameterSetDetails: 
                {
                    // input: "",
                output: "",
                },
          
            newdata: [],
            newParamData: [],
            RatingParameter: [],
            RatingObjParam: [],
            ParameterDetails: [],
            displayRateObejectGrid: false,
            MasterList: [

                { mID: 1, mValue: "Input", mType: 1 },
                { mID: 2, mValue: "Output", mType: 2 },
            ],
            dataType: [

                { mID: 1, mValue: "Int", mType: 1 },
                { mID: 2, mValue: "String", mType: 2 },
                { mID: 2, mValue: "Float", mType: 2 },
            ]
        };

    }


    onInputChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };
    onInputChangeChild = (evt) => {
        const AllocParameterSet = this.state.AllocParameterSet;
        AllocParameterSet[evt.target.name] = evt.target.value;
        this.setState({ AllocParameterSet });
    };
    onHandleChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    }

    addConfigParameter() {
        debugger;
        if (this.state.MasterList!= "" && this.state.fields.allocParamName != "") {
       
                this.setState({ displayRateObejectGrid: true });
                const parameterDetails = "";
                // = this.state.RatingParameter.filter(param => param.parametersId == this.state.fields.RateObjectParameter);
                //Array Part
                let isActive = 1;
                let pRateObjParam = this.state.RatingObjParam;
                this.setState({ RatingObjParam: pRateObjParam });

                pRateObjParam.push({
                   // 'allocParamName': this.state.fields.allocParamName,
                    'tblAllocParameterSetDetails': this.state.tblAllocParameterSetDetails,
                    'tblAllocParameterSet': this.state.AllocParameterSet,
                    'input': this.state.AllocParameterSet.input,
                    'output': this.state.tblAllocParameterSetDetails.output,
                    'MasterList': this.state.fields.MasterList,
                  'dataType': this.state.AllocParameterSet.dataType,
                    'output': this.state.tblAllocParameterSetDetails.output,
                   

                });
                // State Set After Selecting
                this.state.fields.RateObjectParameter = "";
                console.log(this.state.RatingObjParam, 'RateParamArray');

                if (this.state.RatingObjParam.length > 0) {
                    this.setState({
                        newParamData: this.state.RatingObjParam.map((prop, key) => {

                            return {
                                allocParamName: prop.allocParamName,
                                input: prop.input,
                                MasterList: prop.MasterList,
                                dataType: prop.dataType,
                                tblAllocParameterSet: prop.AllocParameterSet,
                                tblAllocParameterSetDetails: prop.tblAllocParameterSetDetails,
                                output: prop.output,
                            };
                        })
                    });
                }
           
            //else {
            //    swal("", "Cannot Insert same Rate Parameters for one Rate Obejct else Add one more Rating Parameters", "error");
            //    this.setState({ errormessage: true });
            //}
        }
        else {
            swal("", "Some fields are missing", "error");
            this.setState({ errormessage: true });
        }
    }

    componentDidMount() {
        fetch(`${RateConfig.rateConfigUrl}/api/RatingConfig/GetParameter`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ RatingParameter: data });
                console.log(data);
            });
    }

    onFormSubmit = (evt) => {
        debugger;
        console.log("submit", this.state.RatingObjParam);
       
        let sendArray = [];
        let AllocArray = [];
        for (var i = 0; i < this.state.RatingObjParam.length; i++) {
            if (this.state.RatingObjParam[i].MasterList == "Output") {
                AllocArray.push({
                    'output': this.state.RatingObjParam[i].input,
                });
                //sendArray.push({
                // 'tblAllocParameterSetDetails': AllocArray
                //        });
            }
        }
        
        for (var i = 0; i < this.state.RatingObjParam.length; i++) {
            if (this.state.RatingObjParam[i].MasterList == "Input") {
                sendArray.push({
                    'input': this.state.RatingObjParam[i].input,
                    'dataType': this.state.RatingObjParam[i].dataType,
                });
            }
        }
        //sendArray.push({
        //    'tblAllocParameterSetDetails': AllocArray
        //});
        console.log("sendArray", sendArray, AllocArray,this.state.RatingObjParam);
        if (this.state.RatingObjParam.length > 0) {
            //let isActive = 1;
            var data = {
                'tblAllocParameterSet': sendArray,
                'tblAllocParameterSetDetails': AllocArray,
                'allocParamName': this.state.fields.allocParamName,
                //'MasterList': this.state.fields.MasterList,
                //'dataType': this.state.fields.dataType,
            };
            //let len = this.state.RatingObjParam.tblAllocParameterSet.cou;
            //for (let i = 0; i < len; i++) {
            //    //    for (let j = 0; j < this.state.ContractObj.ContractData[0].TblBillingConfig[0].tblBillingItem[len].tblBillingItemDetail.length - 1; j++)
            //    if (this.state.RatingObjParam.tblAllocParameterSet[i].dataType == "") {
            //        delete this.state.RatingObjParam.tblAllocParameterSet[i];
            //    }
            //}
         

            fetch(`${AllocationConfig.ruleEngineUrl}/api/AllocationConfig/CreateParamSet`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(data)
            //}).then(response => response.json())
            //    .then(data => {
            //        this.setState({ result: data });
            //        console.log(this.state.data, 'AlocPara');
            //    });
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

    reset = () => {
        //Array Reset
        this.state.fields.allocParamName = "";
        this.state.fields.MasterList = [];
        this.state.AllocParameterSet.input = "";
        this.state.AllocParameterSet.dataType = "";
        this.state.RatingObjParam = [];
        this.state.newParamData = [];

        this.state.tblAllocParameterSetDetails.output = "";
        this.setState({
            RateParameterArray: [],
            newParamData: [],
            displayRateObejectGrid: false
        })

    }



    render() {
        const { classes } = this.props;
        return (

            <GridContainer>
                <GridItem xs={12}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Assignment />
                            </CardIcon>
                            <h4><small>Allocation Config</small></h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        required={true}
                                        labelText="Allocation Name"
                                        value={this.state.fields.allocParamName}
                                        name='allocParamName'
                                        onChange={this.onInputChange}
                                        formControlProps={{ fullWidth: true }} />
                                </GridItem>
                                {/*  <GridItem xs={12} sm={12} md={4}>
                                    <Dropdown
                                        required={true}
                                        labelText=" Parameter Type"
                                        id="ParameterType"
                                        lstObject={this.state.MasterList}
                                        value={this.state.fields.MasterList}
                                       // value={item.mValue}
                                        name='ParameterType'
                                        onChange={this.onHandleChange}

                                        formControlProps={{ fullWidth: true }}
                                    />
                                </GridItem>*/}
                                <GridItem xs={12} sm={12} md={4}>
                                    <FormControl
                                        required={true}
                                        fullWidth
                                        className={classes.selectFormControl}
                                    >
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            Parameter Type
                          </InputLabel>
                                        <Select
                                           
                                            value={this.state.fields.MasterList}
                                            onChange={this.onHandleChange}
                                            MenuProps={{
                                                className: classes.selectMenu
                                            }}
                                            classes={{
                                                select: classes.select
                                            }}
                                            inputProps={{
                                                name: "MasterList",
                                                id: "simple-select"
                                            }}
                                        >
                                            {
                                                this.state.MasterList.map(item =>
                                                    <MenuItem
                                                        value={item.mValue}
                                                        classes={{
                                                            root: classes.selectMenuItem,
                                                            selected: classes.selectMenuItemSelected
                                                        }}
                                                    >
                                                        {item.mValue}
                                                    </MenuItem>
                                                )
                                            }
                                        </Select>
                                    </FormControl></GridItem>

                               
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        required={true}
                                        labelText=" Parameter Name "
                                        id="input"
                                        value={this.state.AllocParameterSet.input}
                                        name='input'
                                        onChange={this.onInputChangeChild}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={4}>
                                    <FormControl
                                        fullWidth
                                        required={true}
                                        className={classes.selectFormControl}
                                    >
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            Data Type
                          </InputLabel>
                                        <Select
                                            value={this.state.AllocParameterSet.dataType}
                                            onChange={this.onInputChangeChild}
                                            MenuProps={{
                                                className: classes.selectMenu
                                            }}
                                            classes={{
                                                select: classes.select
                                            }}
                                            inputProps={{
                                                name: "dataType",
                                                id: "simple-select"
                                            }}
                                        >
                                            {
                                                this.state.dataType.map(item =>
                                                    <MenuItem
                                                        value={item.mValue}
                                                        classes={{
                                                            root: classes.selectMenuItem,
                                                            selected: classes.selectMenuItemSelected
                                                        }}
                                                    >
                                                        {item.mValue}
                                                    </MenuItem>
                                                )
                                            }
                                        </Select>
                                    </FormControl></GridItem>

                                <GridItem xs={12} sm={12} md={3}>
                                    <Button onClick={() => this.addConfigParameter()}
                                        color="info"
                                        round
                                        id="top-bnt"
                                    >
                                        Add Parameter
                </Button>
                                </GridItem>
                            </GridContainer>




                        </CardBody >
                    </Card >

                    {this.state.displayRateObejectGrid &&
                        <GridContainer xl={12}>
                            <GridItem xs={12}>
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                                    <ReactTable
                                        data={this.state.newParamData}
                                        filterable
                                        columns={[
                                            //{
                                            //    Header: "Allocation Name",
                                            //    accessor: "allocParamName",
                                            //    minWidth: 30,
                                            //    style: { textAlign: "center" },
                                            //    headerClassName: 'react-table-center',
                                            //    resizable: false,

                                            //},
                                            {
                                                Header: "Type  ",
                                                accessor: "MasterList",
                                                minWidth: 30,
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                resizable: false,

                                            }, {
                                                Header: "Parameter Name",
                                                accessor: "input",
                                                minWidth: 30,
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                resizable: false,

                                            },
                                            {
                                                Header: "Data Type ",
                                                accessor: "dataType",
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


                                </Animated>
                            </GridItem>
                        </GridContainer>
                    }

                    <GridContainer lg={12} justify="center">
                        <GridItem xs={5} sm={3} md={3} lg={1}>
                            <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                <Button style={{ marginTop: "1rem" }} id="button-search-partner" color="info" round onClick={() => this.onFormSubmit()}>
                                    Save
                                    </Button>
                                {/*    <Button id="button-search-partner" color="info" round >
                                            Grid
                        </Button> */}
                            </Animated>
                        </GridItem>
                    </GridContainer>
                </GridItem >
            </GridContainer >



        );

    }
}



export default connect(null, null)(withStyles(extendedFormsStyle)(AllocationConf));
