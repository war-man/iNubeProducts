import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import $ from 'jquery';
import swal from 'sweetalert';
import money from "assets/img/money.png";
import Visibility from "@material-ui/icons/Visibility";
import GetApp from "@material-ui/icons/GetApp";
import Edit from "@material-ui/icons/Edit";
import { Link } from 'react-router-dom';
import data_Not_found from "assets/img/data-not-found-new.png";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import { Animated } from "react-animated-css";
import bindModel from 'components/ModelBinding/bindModel.js';
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import DashboardConfig from "modules/DynamicDashboards/DashboardConfig.js";

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

class DashboardConfiguration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: true,
            pageloader: false,
            nodata: false,
            masterList: [],
            ReportConfigDto: {
                ReportName: "",
                DBSchemaId: "",
                RangeTypeId: "",
                DataTypeId: "",
                ParameterName: "",
            },
            QueryDto: {
                //Select: "Select",
                //Parameter: "",
                //From: "From",
                //Table:"",
                Query: "",
            },
            ReportObjParam: [],
            errormessage: false,
            displayReportObejectGrid: false,
            newParamData: [],
        };
    }

    componentDidMount() {
        fetch(`${DashboardConfig.DashboardConfigUrl}/api/Report/GetMaster`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("masterList: ", data);
                this.setState({ masterList: data });
            });
        console.log("data", this.state.masterList);

        setTimeout(
            function () {
                this.setState({ pageloader: true });
            }
                .bind(this),
            2000
        );
    }

    onInputChange = (type, event) => {
        const fields = this.state.ReportConfigDto;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
        //this.change(event, event.target.name, type);
    };

    onInputQueryChange = (type, event) => {
        const fields = this.state.QueryDto;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
        //this.change(event, event.target.name, type);
    };

    onInputParamChange = (evt) => {
        console.log('Event', evt);
        const fields = this.state.ReportConfigDto;
        fields[evt.target.name] = evt.target.value;
        console.log("fields", fields);
        this.setState({ fields });

        //To display table name for query
        let dbContents = (this.state.masterList.filter((e) => e.mType === "DBSchema")[0]) === undefined
            ? []
            : this.state.masterList.filter((e) => e.mType === "DBSchema")[0].mdata;
        var dbData = dbContents.filter(item => item.mID == this.state.ReportConfigDto.DBSchemaId);
        this.state.QueryDto.Table = dbData[0].mValue;
        console.log("table name", dbData[0].mValue);

    };

    addConfigParameter() {
        debugger;
        console.log(this.state.nodata, 'ReportName');
        if (this.state.ReportConfigDto.ReportName != "" && this.state.ReportConfigDto.DBSchemaId != "" ) {

            //if (dataCheck.length == 0) {
            //Showing Grid
            this.setState({ displayReportObejectGrid: true });

            //To get name from Id for Master Drop down
            let dbContents = (this.state.masterList.filter((e) => e.mType === "DBSchema")[0]) === undefined
                ? []
                : this.state.masterList.filter((e) => e.mType === "DBSchema")[0].mdata;
            let rangeContents = (this.state.masterList.filter((e) => e.mType === "RangeType")[0]) === undefined
                ? []
                : this.state.masterList.filter((e) => e.mType === "RangeType")[0].mdata;
            let dataTypeContents = (this.state.masterList.filter((e) => e.mType === "DataType")[0]) === undefined
                ? []
                : this.state.masterList.filter((e) => e.mType === "DataType")[0].mdata;


            var dbData = dbContents.filter(item => item.mID == this.state.ReportConfigDto.DBSchemaId);
            var rangeData = rangeContents.filter(item => item.mID == this.state.ReportConfigDto.RangeTypeId);
            var dataTypeData = dataTypeContents.filter(item => item.mID == this.state.ReportConfigDto.DataTypeId);

            //Array Part
            let pReportObjParam = this.state.ReportObjParam;
            this.setState({ ReportObjParam: pReportObjParam });

            pReportObjParam.push({
                'reportName': this.state.ReportConfigDto.ReportName,
                'dbSchema': dbData[0].mValue,
                'parameterName': this.state.ReportConfigDto.ParameterName,
                'rangeType': rangeData[0].mValue,
                'dataType': dataTypeData[0].mValue,
            });

            // State Set After Selecting
            console.log(this.state.ReportObjParam, 'RateParamArray');

            if (this.state.ReportObjParam.length > 0) {
                this.setState({
                    newParamData: this.state.ReportObjParam.map((prop, key) => {

                        return {
                            ReportName: prop.reportName,
                            DBSchemaId: prop.dbSchema,
                            ParameterName: prop.parameterName,
                            RangeTypeId: prop.rangeType,
                            DataTypeId: prop.dataType,
                        };
                    })
                });
                this.reset();
            }

            //}
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

    reset = () => {
        let resetFields = this.state.ReportConfigDto;
        resetFields['DataTypeId'] = "";
        resetFields['ParameterName'] = "";
        resetFields['RangeTypeId'] = "";
        this.setState({ resetFields });
    }

    onFormSubmit = (evt) => {
        debugger;
        let sendArray = [];
        for (var i = 0; i < this.state.ReportObjParam.length; i++) {
            sendArray.push({
                'parameterName': this.state.ReportObjParam[i].parameterName,
                'createdDate': date(),
                'dataType': this.state.ReportObjParam[i].dataType,
                'rangeType': this.state.ReportObjParam[i].rangeType,
            });
        }
        console.log(sendArray, 'Sending Array');
        if (this.state.ReportObjParam.length > 0) {
            let isActive = 1;
            var data = {
                'reportConfigName': this.state.ReportConfigDto.ReportName,
                'dbschema': this.state.ReportConfigDto.DBSchemaId,
                'isActive': isActive,
                'createdDate': date(),
                // 'query': this.state.QueryDto.Select +" "+ this.state.QueryDto.Parameter +" "+ this.state.QueryDto.From +" "+ this.state.QueryDto.Table,
                'query': this.state.QueryDto.Query,
                'TblreportConfigParam': sendArray,
            };
            fetch(`${DashboardConfig.DashboardConfigUrl}/api/Report/SaveConfigParameters`, {
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

    render() {
        return (
            <div>
                {this.state.pageloader ?
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Icon><img id="icon" src={money} /></Icon>
                            </CardIcon>
                            {
                                <h4 >
                                    <small> <TranslationContainer translationKey="ReportConfiguration" /> </small>
                                </h4>
                            }
                        </CardHeader>
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                            <CardBody>

                                <div>
                                    <GridContainer>

                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput
                                                labelText="ReportName"
                                                required={true}
                                                value={this.state.ReportConfigDto.ReportName}
                                                name='ReportName'
                                                onChange={(e) => this.onInputChange("string", e)}
                                                formControlProps={{ fullWidth: true }} />
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={4}>
                                            <MasterDropdown
                                                labelText="DBSchema"
                                                id="ReportConfig.DBSchemaId"
                                                value={this.state.ReportConfigDto.DBSchemaId}
                                                lstObject={this.state.masterList}
                                                required={true}
                                                filterName='DBSchema'
                                                name='DBSchemaId'
                                                onChange={this.onInputParamChange}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput
                                                labelText="ParameterName"
                                                required={true}
                                                value={this.state.ReportConfigDto.ParameterName}
                                                name='ParameterName'
                                                onChange={(e) => this.onInputChange("string", e)}
                                                formControlProps={{ fullWidth: true }} />
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={4}>
                                            <MasterDropdown
                                                labelText="RangeType"
                                                id="ReportConfig.RangeTypeId"
                                                value={this.state.ReportConfigDto.RangeTypeId}
                                                lstObject={this.state.masterList}
                                                required={true}
                                                filterName='RangeType'
                                                name='RangeTypeId'
                                                onChange={this.onInputParamChange}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={4}>
                                            <MasterDropdown
                                                labelText="DataType"
                                                id="ReportConfig.DataTypeId"
                                                value={this.state.ReportConfigDto.DataTypeId}
                                                lstObject={this.state.masterList}
                                                required={true}
                                                filterName='DataType'
                                                name='DataTypeId'
                                                onChange={this.onInputParamChange}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>

                                        <GridItem>
                                            <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={() => this.addConfigParameter()}> <TranslationContainer translationKey="AddParameter" />  </Button>
                                        </GridItem>

                                    </GridContainer>
                                </div>
                            </CardBody>
                        </Animated>
                    </Card>
                    : <PageContentLoader />}

                {this.state.displayReportObejectGrid &&
                    <GridContainer xl={12}>
                        <GridItem xs={12}>
                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                                <ReactTable
                                    data={this.state.newParamData}
                                    filterable
                                    columns={[
                                        {
                                            Header: "Parameter Name",
                                            accessor: "ParameterName",
                                            minWidth: 30,
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            resizable: false,

                                        },
                                        {
                                            Header: "Data Type ",
                                            accessor: "DataTypeId",
                                            minWidth: 30,
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            resizable: false,

                                        },
                                        {
                                            Header: "Range Type ",
                                            accessor: "RangeTypeId",
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

                {this.state.displayReportObejectGrid &&
                    <div>
                        <Card>
                            <CardBody>
                                <GridContainer xl={12}>
                                    <GridItem xs={12}>
                                        <CardHeader>
                                            <h3> <small>Query</small> </h3>
                                        </CardHeader>
                                    </GridItem>

                                    {/*   <GridItem xs={12} sm={12} md={2}>
                                        <CustomInput
                                            labelText="Select"
                                            disabled="true"
                                            value={this.state.QueryDto.Select}
                                            name='ParameterName'
                                            onChange={(e) => this.onInputQueryChange("string", e)}
                                            formControlProps={{ fullWidth: true }} />
                                    </GridItem>*/}

                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText="Query"
                                            required={true}
                                            //disabled="true"
                                            value={this.state.QueryDto.Query}
                                            name='Query'
                                            onChange={(e) => this.onInputQueryChange("string", e)}
                                            formControlProps={{ fullWidth: true }} />
                                    </GridItem>

                                    {/* <GridItem xs={12} sm={12} md={2}>
                                        <CustomInput
                                            labelText="From"
                                            disabled="true"
                                            value={this.state.QueryDto.From}
                                            name='From'
                                            onChange={(e) => this.onInputQueryChange("string", e)}
                                            formControlProps={{ fullWidth: true }} />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={2}>
                                        <CustomInput
                                            labelText="Table"
                                            disabled="true"
                                            value={this.state.QueryDto.Table}
                                            name='Table'
                                            onChange={(e) => this.onInputQueryChange("string", e)}
                                            formControlProps={{ fullWidth: true }} />
                                        </GridItem>*/}
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </div>
                }

                {this.state.displayReportObejectGrid &&
                    <GridContainer justify="center">
                        <GridItem>
                            <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={() => this.onFormSubmit()}> <TranslationContainer translationKey="Save" />  </Button>
                            </Animated>
                        </GridItem>
                    </GridContainer>
                }
            </div>

        );
    }
}
export default DashboardConfiguration;