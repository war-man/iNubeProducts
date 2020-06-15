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
import money from "assets/img/money.png";
import swal from 'sweetalert';
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
import Dropdown from "components/Dropdown/Dropdown.jsx";
import DashboardConfig from "modules/DynamicDashboards/DashboardConfig.js";
import Delete from "@material-ui/icons/Delete";

const paddingCard =
{
    padding: "10px",
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

class DashboardUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: true,
            pageloader: false,
            nodata: false,
            searchTableSec:false,
            mList: [],
            masterList:[],
            ReportConfigDto: {
                ReportName: "",
                DBSchemaId: "",
                RangeTypeId: "",
                DataTypeId: "",
                ParameterName: "",
            },
            parameterList: [],
            parameterListDetails: [],
            displayReportObejectGrid: false,
            QueryDto: {
                Query: "",
            },
            ReportObjParam: [],
            newParamData: [],
            deleteParam:[],
        };
    }

    searchagain = () => {
        this.setState({ nodata: false });
        window.scrollTo(0, 0);
    }

    onInputParamChange = (evt) => {
        console.log('Event', evt);
        const fields = this.state.ReportConfigDto;
        fields[evt.target.name] = evt.target.value;
        console.log("fields", fields);
        this.setState({ fields });
    };

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

    componentDidMount() {

        fetch(`${DashboardConfig.DashboardConfigUrl}/api/Graph/GetReportConfigName`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("mList: ", data);
                this.setState({ mList: data });
            });
        console.log("data", this.state.mList);

        fetch(`${DashboardConfig.DashboardConfigUrl}/api/Graph/GetMaster`, {
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

    handleParameterCheck = event => {
        debugger;
        const ReportConfigDto = this.state.ReportConfigDto;
        ReportConfigDto[event.target.name] = event.target.value;
        this.setState({ ReportConfigDto });
        this.setState({ [event.target.name]: event.target.value });
        console.log(ReportConfigDto[event.target.name], event.target.value, "reportdto");

        this.setState({ displayReportObejectGrid: true });

        fetch(`${DashboardConfig.DashboardConfigUrl}/api/Graph/GetParameterDetails?ReportConfigId=` + event.target.value, {
       // fetch(`https://localhost:44351/api/Graph/GetParameterDetails` + event.target.value, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ parameterList: data });
                if (this.state.parameterList.length > 0) {
                    this.setState({ searchTableSec: false, loader: false });
                    this.tabledata();
                } else {
                    setTimeout(
                        function () {
                            this.setState({ loader: true, searchTableSec: false, nodata: true });
                        }.bind(this), 2000
                    );
                }
                console.log(this.state.parameterList, data, 'parameters');
            });
    }

    tabledata = () => {
        this.setState({ searchTableSec: true, loader: true });
        this.setState({
            parameterListDetails: this.state.parameterList.map((prop, key) => {
                return {
                    SNo: key + 1,
                    ParameterName: prop.parameterName,
                    RangeType: prop.rangeType,
                    DataType: prop.dataType,
                    btn: <div>
                        {/* <Button color="info" justIcon round simple className="edit" onClick={this.handleEdit.bind(this, key, prop.invoiceId)}><Edit /></Button>*/}
                        <Button color="danger" justIcon round simple className="edit" onClick={this.onDelete.bind(this,prop.reportConfigParamId)} > <Delete /></Button>

                    </div>
                };
            })
        });
    }

    addConfigParameter() {
        this.setState({ displayReportObejectGrid: true });

        let rangeContents = (this.state.masterList.filter((e) => e.mType === "RangeType")[0]) === undefined
            ? []
            : this.state.masterList.filter((e) => e.mType === "RangeType")[0].mdata;
        let dataTypeContents = (this.state.masterList.filter((e) => e.mType === "DataType")[0]) === undefined
            ? []
            : this.state.masterList.filter((e) => e.mType === "DataType")[0].mdata;

        var rangeData = rangeContents.filter(item => item.mID == this.state.ReportConfigDto.RangeTypeId);
        var dataTypeData = dataTypeContents.filter(item => item.mID == this.state.ReportConfigDto.DataTypeId);

        //To add into existing table
        this.state.parameterList.push({
            'parameterName': this.state.ReportConfigDto.ParameterName,
            'rangeType': rangeData[0].mValue,
            'dataType': dataTypeData[0].mValue,
        });

        this.tabledata();
        this.reset();
    }

    reset = () => {
        let resetFields = this.state.ReportConfigDto;
        resetFields['DataTypeId'] = "";
        resetFields['ParameterName'] = "";
        resetFields['RangeTypeId'] = "";
        this.setState({ resetFields });
    }

    //Delete Parameters
    onDelete = (id) => {
        debugger;
        console.log(id, "id");
        fetch(`${DashboardConfig.DashboardConfigUrl}/api/Graph/DeleteParameter?ReportConfigParamId=` + id, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(data => {
            this.setState({ deleteParam: data });
            if (data.length>0) {
            this.setState({ searchTableSec: false, loader: false });
            this.tabledata();
            } else {
                setTimeout(
                    function () {
                        this.setState({ loader: true, searchTableSec: false, nodata: true });
                    }.bind(this), 2000
                );
            }
            console.log("data", data, this.state.deleteParam.length);
            swal({

                text: "Parameter Deleted!",
                icon: "success"
            });
        });
       
    }

    updateReport = event => {
        debugger;
       
        let sendArray = [];
        for (var i = 0; i < this.state.parameterList.length; i++) {
            sendArray.push({
                'parameterName': this.state.parameterList[i].parameterName,
                'createdDate': date(),
                'dataType': this.state.parameterList[i].dataType,
                'rangeType': this.state.parameterList[i].rangeType,
            });
        }

        console.log(sendArray, 'Sending Array');
        if (this.state.parameterList.length > 0) {
            let isActive = 1;
            var data = {
                'reportConfigId': this.state.ReportConfigDto.ReportName,
                'isActive': isActive,
                'query': this.state.QueryDto.Query,
                'TblreportConfigParam': sendArray,
            };

             fetch(`${DashboardConfig.DashboardConfigUrl}/api/Graph/UpdateReport?ReportConfigId=` + this.state.ReportConfigDto.ReportName, {
           //fetch(`https://localhost:44351/api/Graph/UpdateReport?ReportConfigId=` + this.state.ReportConfigDto.ReportName, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(data)
            })
                .then(data => {
                    if (data.status == 200) {
                            swal({

                                text: "Report Modified!",
                                icon: "success"
                        });
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

                    console.log("Search history data:", data);

                });
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
                                    <small> <TranslationContainer translationKey="DashboardUpdate" /> </small>
                                </h4>
                            }
                        </CardHeader>
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                            <CardBody>

                                <div>
                                    <GridContainer>

                                        <GridItem xs={12} sm={12} md={3}>
                                            <Dropdown
                                                labelText="ReportName"
                                                id="ReportConfigDto.ReportName"
                                                value={this.state.ReportConfigDto.ReportName}
                                                lstObject={this.state.mList}
                                                required={true}
                                                name='ReportName'
                                                onChange={this.handleParameterCheck}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>

                                        {this.state.displayReportObejectGrid &&
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={3}>
                                                    <CustomInput
                                                        labelText="ParameterName"
                                                        //required={true}
                                                        value={this.state.ReportConfigDto.ParameterName}
                                                        name='ParameterName'
                                                        onChange={(e) => this.onInputChange("string", e)}
                                                        formControlProps={{ fullWidth: true }} />
                                                </GridItem>

                                                <GridItem xs={12} sm={12} md={3}>
                                                    <MasterDropdown
                                                        labelText="RangeType"
                                                        id="ReportConfig.RangeTypeId"
                                                        value={this.state.ReportConfigDto.RangeTypeId}
                                                        lstObject={this.state.masterList}
                                                        //required={true}
                                                        filterName='RangeType'
                                                        name='RangeTypeId'
                                                        onChange={this.onInputParamChange}
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                    />
                                                </GridItem>

                                                <GridItem xs={12} sm={12} md={3}>
                                                    <MasterDropdown
                                                        labelText="DataType"
                                                        id="ReportConfig.DataTypeId"
                                                        value={this.state.ReportConfigDto.DataTypeId}
                                                        lstObject={this.state.masterList}
                                                        //required={true}
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
                                        }
                                    </GridContainer>
                                </div>
                            </CardBody>
                        </Animated>
                    </Card>
                    : <PageContentLoader />}

                    {this.state.loader ?

                                        <GridContainer xl={12}>
                                            {this.state.searchTableSec ?

                                                    <GridItem lg={12}>
                                                        <ReactTable
                                                            title=<TranslationContainer translationKey={"ParameterDetails"} />
                                                            data={this.state.parameterListDetails}
                                                            filterable

                                                            columns={[

                                                                {

                                                                    Header: "Parameter Name",
                                                                    accessor: "ParameterName",
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 40,
                                                                    resizable: false,
                                                                },
                                                                {
                                                                    Header: "Range Type",
                                                                    accessor: "RangeType",
                                                                    style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 40,
                                                                    resizable: false,
                                                                },
                                                                {
                                                                    Header: "Data Type",
                                                                    accessor: "DataType",
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 40,
                                                                    resizable: false,
                                                                },
                                                                {

                                                                    Header: "Action",
                                                                    accessor: "btn",
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
                                                    </GridItem>
                                                    : <GridItem lg={12}>
                                                    {this.state.nodata ?
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
                                                         : null}
                                                    </GridItem>}

                                        </GridContainer>
                                        : <Card style={paddingCard}>
                                            <TableContentLoader />
                    </Card>}
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
                                
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </div>
                }

                {this.state.displayReportObejectGrid &&
                    <GridContainer justify="center">
                        <GridItem>
                            <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                            <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={this.updateReport}> <TranslationContainer translationKey="Update Report" />  </Button>
                            </Animated>
                        </GridItem>
                    </GridContainer>
                }

            </div>

        );
    }
}
export default DashboardUpdate;