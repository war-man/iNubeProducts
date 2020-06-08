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
import SearchLogConfig from "modules/SearchLog/SearchLogConfig.js";

const paddingCard =
{
    padding: "10px",
}


class SearchLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: true,
            pageloader: true,
            nodata: false,
            loggerDTO: {
            "logid": "",
            "correlationId": "",
            "moduleName": "",
            "message": "",
            "methodName": "",
            "fromDate": "",
            "toDate":"",
            "logType": "",
            "contollerName":"",
            },
            logType:  "",
            searchTableSec: false,
            result: [],
            resultDetails: [],
            typeList: [{ "mID": 1, "mValue": "RequestLog", "mType": "LogType" },
                { "mID": 2, "mValue": "ResponseLog", "mType": "LogType" },
                { "mID": 3, "mValue": "Error", "mType": "LogType" }],
        };
    }

    componentDidMount() {
        setTimeout(
            function () {
                this.setState({ pageloader: true });
            }
                .bind(this),
            2000
        );
    }

    onDateChange = (formate, name, event) => {
        var today = event.toDate();
        if (today.getDate() < 10) {
            var dt = '0' + today.getDate();
        }
        else {
            var dt = today.getDate();
        }
        if (today.getMonth() < 10) {
            var mm = '0' + (today.getMonth() + 1)
        }
        else {
            var mm = (today.getMonth() + 1);
        }
        var date = dt + '/' + mm + '/' + today.getFullYear();
        var date2 = new Date();
        var date1 = new Date(today);
        let state = this.state.loggerDTO;
        state[name] = date;
        this.setState({ state });

    };

    onInputParamChange = (evt) => {
        debugger;
        console.log('Event', evt);
        const fields = this.state.loggerDTO;
        const text = this.state;
        fields[evt.target.name] = evt.currentTarget.innerText;
        text[evt.target.name] = evt.target.value;
        this.setState({ fields,text});
    }

    onInputChange = (type, event) => {
        const fields = this.state.loggerDTO;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
    };

    datechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }

    onFormSubmit = () => {
        let fdate = "";
        let edate = "";
        if (this.state.loggerDTO.fromDate != "") {
            fdate = this.state.loggerDTO.fromDate;
            this.state.loggerDTO.fromDate = this.datechange(this.state.loggerDTO.fromDate);
        }
        if (this.state.loggerDTO.toDate != "") {
            edate = this.state.loggerDTO.toDate;
            this.state.loggerDTO.toDate = this.datechange(this.state.loggerDTO.toDate);
        }
        this.setState({ loader: false });
        fetch(`${SearchLogConfig.SearchLogConfigUrl}/api/UserProfile/SearchLogs`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.loggerDTO)
        }).then(response => response.json())
            .then(data => {
                this.setState({ result: data });
                console.log(this.state.result, 'Result');
                if (this.state.result.length > 0) {
                    this.setState({ searchTableSec: false, loader: false });
                    this.tabledata();
                    //this.reset();
                }
                else {
                    setTimeout(
                        function () {
                            this.setState({ loader: true, searchTableSec: false, nodata: true });
                        }.bind(this), 2000
                    );
                }
            });
        this.state.loggerDTO.fromDate = fdate;
        this.state.loggerDTO.toDate = edate;
    }

    tabledata = () => {
        this.setState({ searchTableSec: true, loader: true });
        this.setState({
            resultDetails: this.state.result.map((prop, key) => {
                return {
                    SNo: key + 1,
                    LogId: prop.logid,
                    LogType:prop.logType,
                    CorrelationId: prop.correlationId,
                    //ModuleName: prop.moduleName,
                    ModuleName: prop.contollerName,
                    Message: prop.message,
                    CreatedDate: new Date(prop.createdDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                    MethodName: prop.methodName,
                };
            })
        });
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
                                    <small> <TranslationContainer translationKey="SearchLog" /> </small>
                                </h4>
                            }
                        </CardHeader>
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                            <CardBody>

                                <div>
                                    <GridContainer>

                                        <GridItem xs={12} sm={12} md={3}>
                                            <Dropdown
                                                labelText="Log Type"
                                                id="logType"
                                                value={this.state.logType}
                                                lstObject={this.state.typeList}
                                                //required={true}
                                                //model="InvoiceSearchHistory"
                                                //filterName='InvoiceStatus'
                                                name='logType'
                                                onChange={this.onInputParamChange}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput
                                                labelText="Correlation Id"
                                                id='loggerDTO.correlationId'
                                                //required={true}
                                                value={this.state.loggerDTO.correlationId}
                                                name='correlationId'
                                                onChange={(e) => this.onInputChange("string", e)}
                                                formControlProps={{ fullWidth: true }} />
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput
                                                labelText="Module Name"
                                                id='loggerDTO.moduleName'
                                                //required={true}
                                                value={this.state.loggerDTO.moduleName}
                                                name='moduleName'
                                                onChange={(e) => this.onInputChange("string", e)}
                                                formControlProps={{ fullWidth: true }} />
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomInput
                                                labelText="Method Name"
                                                id='loggerDTO.methodName'
                                                //required={true}
                                                value={this.state.loggerDTO.methodName}
                                                name='methodName'
                                                onChange={(e) => this.onInputChange("string", e)}
                                                formControlProps={{ fullWidth: true }} />
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={4}>
                                            <CustomDatetime
                                                labelText="From Date"
                                                id='loggerDTO.fromDate'
                                                name='fromDate'
                                                onChange={(evt) => this.onDateChange('datetime', 'fromDate', evt)}
                                                value={this.state.loggerDTO.fromDate}
                                                formControlProps={{ fullWidth: true }} />
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={4}>
                                            <CustomDatetime
                                                labelText="To Date"
                                                id='loggerDTO.toDate'
                                                name='toDate'
                                                onChange={(evt) => this.onDateChange('datetime', 'toDate', evt)}
                                                value={this.state.loggerDTO.toDate}
                                                formControlProps={{ fullWidth: true }} />
                                        </GridItem>

                                        <GridContainer justify="center">
                                            <GridItem>
                                                <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={this.onFormSubmit}> <TranslationContainer translationKey="Search" />  </Button>
                                            </GridItem>
                                        </GridContainer>

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
                                                            title=<TranslationContainer translationKey={"SearchLogDetails"} />
                                                            data={this.state.resultDetails}
                                                            filterable

                                                            columns={[
                                                                      {

                                                                    Header: "Log Id",
                                                                    accessor: "LogId",
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 40,
                                                                    resizable: false,
                                                                    },
                                                                    {

                                                                        Header: "Log Type",
                                                                        accessor: "LogType",
                                                                        headerClassName: 'react-table-center',
                                                                        //minWidth: 40,
                                                                        resizable: false,
                                                                    },
                                                                {
                                                                    Header: "Correlation Id",
                                                                    accessor: "CorrelationId",
                                                                    style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 40,
                                                                    resizable: false,
                                                                },
                                                                {
                                                                    Header: "Module Name",
                                                                    accessor: "ModuleName",
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 40,
                                                                    resizable: false,
                                                                },
                                                                {
                                                                    Header: "Message",
                                                                    accessor: "Message",
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 40,
                                                                    resizable: false,
                                                                },

                                                                {
                                                                    Header: "Method Name",
                                                                    accessor: "MethodName",
                                                                    //style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 30,
                                                                    resizable: false,
                                                                },
                                                                {

                                                                    Header: "Created Date",
                                                                    accessor: "CreatedDate",
                                                                    style: { textAlign: "center" },
                                                                    headerClassName: 'react-table-center',
                                                                    //minWidth: 30,
                                                                    resizable: false,
                                                                },
                                                               
                                                            ]}

                                                            defaultPageSize={5}
                                                            showPaginationTop={false}
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

            </div>
            );
    }
}
export default SearchLog;