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
//import CustomDatetime from "components/CustomComponent/CustomDatetimeFormate.jsx";

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
import UserConfig from 'modules/Users/UserConfig.js';
import Chart from "react-google-charts";
import { format } from "util";

const paddingCard =
{
    padding: "10px",
}

class ViewDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: {
                xaxis: "",
                yaxis: ""
            },
            title: "",
            showgraph: false,
            loader: true,
            pageloader: false,
            nodata: false,
            masterList: [],
            ReportConfigDto: {
                ReportName: "",
            },
            duplicategraphData: [],
            parameterList: [],
            CheckCondition: {
                //paramList:[],
            },
            paramList: [],
            otFlag: false,
            graphData: [
                ['Task', '']
            ],
            result: [],
            flagParam: false,
            fields: [],
            TableDataList: [],
            tableFlag: false,
            reportName: [],
            selectedReport: "",
            reportparameters: [],
            fromDate: "",
            toDate: "",
            requestData: {
                dashboardConfigId: "",
                paramList: [],
            },
            displayparameter: {},
            SpecificData: [['Task', 'Hours per Day'],
            ['A', 13,],
            ['B', 2],
            ['C', 2],
            ['D', 2],
            ['E', 7],
            ['F', 7]
            ],
            fields: {
                ChartType: "ColumnChart",
            },
            typeList: [{ "mID": 1, "mValue": "ScatterChart", "mType": "ChartType" },
                { "mID": 2, "mValue": "LineChart", "mType": "ChartType" },
                { "mID": 3, "mValue": "ColumnChart", "mType": "ChartType" },
                { "mID": 4, "mValue": "PieChart", "mType": "ChartType" },
                { "mID": 5, "mValue": "Table", "mType": "ChartType" },
                { "mID": 6, "mValue": "SteppedAreaChart", "mType": "ChartType" },
                { "mID": 7, "mValue": "BarChart", "mType": "ChartType" }

            ],
            CTypes: "",
            piedata: [
                ['Task', 'Hours per Day'],
                ['Work', 11],
                ['Eat', 2],
                ['Commute', 2],
                ['Watch TV', 2],
                ['Sleep', 7]
            ],
            ChartName: "",
            showdd:false,
        };
    }

    componentDidMount() {

        /////////////////From UserManagement //////////////////////////
        let userid = "";
        let roleid = "";
        userid = localStorage.getItem('userId');
        roleid = localStorage.getItem('roleId');
        console.log("login: ", userid, roleid);
        fetch(`${UserConfig.UserConfigUrl}/api/Role/GetDynamicGraphPermissions?Userid=` + userid + `&Roleid=` + roleid + `&itemType=` + "Graph", {
            //fetch(`https://localhost:44351/api/Role/GetDynamicGraphPermissions?Userid=` + userid + `&Roleid=` + roleid + `&itemType=` + "Graph", {
            method: 'GET',
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
                this.state.reportName = this.state.masterList.filter(x => x.mType == "Graph");
                console.log("list1: ", this.state.reportName);
            });

        setTimeout(
            function () {
                this.setState({ pageloader: true });
            }
                .bind(this),
            2000
        );
    }

    onInputParamChange = (evt) => {
        console.log('Event', evt);
        const fields = this.state.ReportConfigDto;
        fields[evt.target.name] = evt.target.value;
        console.log("fields", fields, evt.target.name, evt.target.value);
        this.setState({ fields });

    };

    onInputChartChange = (evt) => {

        console.log('Event', evt, evt.target.name, evt.target.value);
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });

        //For Charts change
       
        this.state.CTypes = evt.target.value;
       
        var cont = this.state.typeList.filter(x => x.mID == this.state.CTypes);
        console.log("dd value", evt.target.name, cont, cont[0].mValue);
      
        this.setState({ ChartName: cont[0].mValue });
     
        console.log("dd name", cont, this.state.ChartName);
        this.setState({ showgraph: true });
        
        
    }

    onInputParamListChange = (evt) => {
        var fields = this.state.CheckCondition;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
        console.log("fields", fields);

        let param = this.state.displayparameter;
        param[evt.target.name] = evt.target.value;
        this.setState({ param });
        console.log(this.state.paramList, "Array List");
    };

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
        var date = today.getFullYear() + '-' + mm + '-' + dt;
        var date2 = new Date();
        var date1 = new Date(today);

        var fields = this.state.CheckCondition;
        fields[name] = date;
        this.setState({ fields });

        var temp = event.toDate();
        // var tempDate = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        var tempDate = dt + '/' + mm + '/' + today.getFullYear();

        var dparam = this.state.displayparameter;
        dparam[name] = tempDate;
        this.setState({ dparam });
        console.log("fields", fields);
    };

    handleParameterCheck = event => {
        debugger;
        this.state.title = this.state.reportName.filter(a => a.mID == event.target.value)[0].mValue;
        console.log("title", this.state.title);
        let param = this.state.paramList;
        let parameter = this.state.parameterList;
        let rparam = this.state.reportparameters;
        let array = [];
        //for (let i = 1; i < this.state.graphData.length; i++) {
        //    this.state.graphData[i] = [];
        //    console.log("gdata",this.state.graphData)
        //}

        console.log("gdata", this.state.graphData);
        param = array;
        rparam = array;
        parameter = array;
        var emptyarray = {};
        this.state.CheckCondition = {};
        this.state.displayparameter = {};
        //this.state.CheckCondition = Object.assign(this.state.CheckCondition, emptyarray);
        this.setState({ param, parameter, rparam });
        let index = this.state.reportName.findIndex(a => a.dynamicId == event.target.value);
        let report = this.state.reportName[index].dynamicName;
        this.setState({ selectedReport: report });

        const ReportConfigDto = this.state.ReportConfigDto;
        ReportConfigDto[event.target.name] = event.target.value;
        this.setState({ ReportConfigDto });
        this.setState({ [event.target.name]: event.target.value });
        console.log(ReportConfigDto[event.target.name], event.target.value, "reportdto");

        this.setState({ flagParam: true, tableFlag: false, showgraph: false, showdd:false});
        fetch(`${DashboardConfig.DashboardConfigUrl}/api/Graph/GetParameters?dashboardConfigId=` + event.target.value, {
            // fetch(` https://localhost:44351/api/Graph/GetParameters?dashboardConfigId=` + event.target.value, {
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
                console.log("rparameter: ", data);
                this.setState({ otFlag: true });
            });
        console.log("ReportName", this.state.ReportConfigDto.ReportName);
        fetch(`${DashboardConfig.DashboardConfigUrl}/api/Graph/GetLabels?DashboardConfigParamId=` + event.target.value, {
            //fetch(`https://localhost:44351/api/Graph/GetLabels?DashboardConfigParamId=` + event.target.value, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.state.labels.xaxis = data.xaxis;
                this.state.labels.yaxis = data.yaxis;
                //console.log("labels: ", this.state.labels.yaxis + " " + "per" + " " + this.state.labels.xaxis.slice(0, -1));
            });

    }

    MonthWise = (event) => {

        this.setState({ [event.target.name]: event.target.value });
        let month = event.target.value;

        let data = this.state.StackData;

        console.log("PolicyData", data);

        let index = [];
        let Final = [];
        const ProdArray = [];
        const CountArray = [];

        for (var i = 1; i < data.length; i++) {

            if (data[i][0] == month) {

                let ARRAY1 = data[0];

                let ARRAY2 = data[i];

                for (var i = 0; i < ARRAY1.length; i++) {

                    if (ARRAY2[i] != 0) {
                        index.push(i);
                    }

                }

                console.log("index", index);

                for (var j = 0; j < index.length; j++) {

                    ProdArray.push(ARRAY1[index[j]]);

                    CountArray.push(ARRAY2[index[j]]);

                }

                Final.push(ProdArray);
                Final.push(CountArray);
                console.log("FinalArray", Final.length);
                this.setState({ NEWSTACKDATA: Final });




            }


        }

        if (Final.length <= 0) {
            swal({
                text: "There are No Records for selected Month: " + month,
                icon: "error"
            });

        }

        console.log("MonthWiseData", Final);



    }



    queryExecution = event => {
        debugger;
        let check = this.state.CheckCondition;
        this.setState({ paramList: [] });
        let param = this.state.paramList;
        let array = [];
        let object = {};
        param = array;
        this.setState({ param });
        let pArray = [];
        let dArray = [];
        var dummyvalue = Object.keys(check).map((prop, key) => {
            pArray.push({
                "parameterName": prop,
                "parameterValue": check[prop],
            });
        });
        var dummyparam = Object.keys(this.state.displayparameter).map((prop, key) => {
            dArray.push({
                "parameterName": prop,
                "parameterValue": this.state.displayparameter[prop],
            });
        });
        this.state.reportparameters = [...dArray];
        console.log("rparameter: ", this.state.CheckCondition);
        param = pArray;
        let request = this.state.requestData;
        request.dashboardConfigId = this.state.ReportConfigDto.ReportName;
        request.paramList = [...param];

        this.setState({ request });

        console.log("rparameter: ", this.state.reportparameters);
        this.setState({ loader: false });
        fetch(`${DashboardConfig.DashboardConfigUrl}/api/Graph/QueryExecution`, {
            // fetch(`https://localhost:44351/api/Graph/QueryExecution`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(request)
        }).then(response => response.json())
            .then(data => {
                debugger;
                this.state.graphData = [];
                if (this.state.labels.xaxis != null && this.state.labels.xaxis != null) {
                    let strLength = this.state.labels.xaxis.length;
                    if (this.state.labels.xaxis.charAt(strLength - 1) == 's') {
                        this.state.graphData[0] = ['Task', this.state.labels.yaxis + " " + "per" + " " + this.state.labels.xaxis.slice(0, -1)];
                    } else {
                        this.state.graphData[0] = ['Task', this.state.labels.yaxis + " " + "per" + " " + this.state.labels.xaxis];
                    }
                } else {
                    if (this.state.labels.yaxis != null && this.state.labels.xaxis != null) {
                        this.state.graphData[0] = ['Task', this.state.labels.yaxis + " " + "per" + " " + this.state.labels.xaxis];
                    } else {
                        this.state.graphData[0] = ['Task', ''];
                    }

                }
                this.setState({ result: data });
                console.log(this.state.result, 'Result');

                this.state.result.map(m => {
                    let arr = [];
                    //let date= this.datechange(m.column1);
                    //var today = new Date(m.column2);
                    //if (today.getDate() < 10) {
                    //    var dt = '0' + today.getDate();
                    //}
                    //else {
                    //    var dt = today.getDate();
                    //}
                    //if (today.getMonth() < 10) {
                    //    var mm = '0' + (today.getMonth() + 1)
                    //}
                    //else {
                    //    var mm = (today.getMonth() + 1);
                    //}
                    //var date = today.getFullYear() + '-' + mm + '-' + dt;
                    //debugger;
                    //if (date != "NaN-NaN-NaN") {
                    //    var formatteddate = this.datechange1(date);
                    //    arr.push(formatteddate);
                    //    arr.push(m.column1);
                    //} else {
                    //    arr.push(m.column2);
                    //    arr.push(m.column1);
                    //}
                    let splitdate = m.column2.toString().split('-');
                    if (splitdate.length >= 2) {
                        if (m.column2 != undefined) {
                            m.column2 = new Date(m.column2).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                        }
                    } 
                    arr.push(m.column2);
                    arr.push(m.column1);
                    this.state.graphData.push(arr);
                    console.log("graphdata", this.state.graphData, arr);
                });
                this.setState({ showgraph: false, showdd:true })
                //this.setState({ CheckCondition: Object.assign(this.state.CheckCondition, emptyarray) });
                if (this.state.result.length > 0) {
                    this.setState({ tableFlag: false, flagParam: false, loader: false });
                    this.tabledata();
                    this.reset();
                    this.setState({ otFlag: false });
                }
                else {
                    setTimeout(
                        function () {
                            this.setState({ loader: true, tableFlag: false, nodata: false });
                        }.bind(this), 2000
                    );
                }
            });
    }


    /*onDateChange = (name, event) => {
        var today = event.toDate();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

        var fields = this.state.CheckCondition;
        fields[name] = date;
        this.setState({ fields });

        var temp = event.toDate();
        var tempDate = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

        var dparam = this.state.displayparameter;
        dparam[name] = tempDate;
        this.setState({ dparam });
        console.log("fields", fields);
    };*/

    reset = () => {
        let resetField = this.state.ReportConfigDto;
        resetField['ReportName'] = "";
        this.setState({ resetField/* check */ });
    }

    tabledata = () => {
        this.setState({ tableFlag: false, loader: true });
        console.log("prop data", this.state.result);
        this.setState({
            TableDataList: Object.keys(this.state.result[0]).map((prop, key) => {
                return {
                    Header: prop.charAt(0).toUpperCase() + prop.slice(1),
                    accessor: prop,
                };
                this.setState({});
            })
        });
        console.log("table data", this.state.TableDataList);
    }

    searchagain = () => {
        this.setState({ nodata: false });
        window.scrollTo(0, 0);
    }
    datechange1 = (date) => {
        debugger;
        if (date != undefined) {
            const _date = date.split('-');
            const dateObj = { month: _date[1], year: _date[0], day: _date[2] };

            return dateObj.day + '/' + dateObj.month + '/' + dateObj.year;
        }
    }
    datechange = (date) => {
        debugger;
        if (date != undefined) {
            const _date = date.split('-');
            const dateObj = { month: _date[1], year: _date[0], day: _date[2] };

            return dateObj.day + '/' + dateObj.month + '/' + dateObj.year;
        }
    }
    render() {
        console.log(this.state.ChartName, "CName");
        return (
            <div>
                {
                    this.state.pageloader ?
                        <Card>
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <Icon><img id="icon" src={money} /></Icon>
                                </CardIcon>
                                {
                                    <h4 >
                                        <small> <TranslationContainer translationKey="ViewDashboard" /> </small>
                                    </h4>
                                }
                            </CardHeader>
                            <CardBody>

                                <div>
                                    <GridContainer>

                                        <GridItem xs={12} sm={12} md={3}>
                                            <Dropdown
                                                labelText="GraphName"
                                                id="ReportConfigDto.ReportName"
                                                value={this.state.ReportConfigDto.ReportName}
                                                lstObject={this.state.reportName}
                                                required={true}
                                                //filterName='Report'
                                                name='ReportName'
                                                onChange={this.handleParameterCheck}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>

                                        {this.state.flagParam &&
                                            <GridContainer>

                                                <GridItem xs={12} sm={12} md={12}>
                                                    <Card>
                                                        <CardHeader color="info" icon >

                                                            {
                                                                <h3 >
                                                                    <small>Criteria</small>
                                                                </h3>
                                                            }
                                                        </CardHeader>
                                                        <CardBody>
                                                            {this.state.otFlag &&
                                                                <GridContainer>
                                                                    {this.state.parameterList.map((item, index) => {
                                                                        if (item.dataType != "Date") {
                                                                            return (
                                                                                <GridItem xs={12} sm={12} md={3} key={index}>
                                                                                    <CustomInput labelText={item.parameterName}
                                                                                        // value={item.paramName}
                                                                                        name={item.parameterName}
                                                                                        onChange={(e) => this.onInputParamListChange(e)}
                                                                                        inputProps={{
                                                                                            //type: "number"
                                                                                        }}
                                                                                        formControlProps={{ fullWidth: true }} />
                                                                                </GridItem>
                                                                            );
                                                                        }
                                                                        else {
                                                                            return (
                                                                                <GridItem xs={12} sm={12} md={3} key={index}>
                                                                                    <CustomDatetime
                                                                                        style="ddl"
                                                                                        labelText={item.parameterName}
                                                                                        id='dob'
                                                                                        name={item.parameterName}
                                                                                        //onChange={(evt) => this.onDateChange('datetime',item.parameterName, evt)}
                                                                                        //value={this.state.CheckCondition[item.parameterName]}
                                                                                        onChange={(evt) => this.onDateChange('datetime', item.parameterName, evt)}
                                                                                        value={this.datechange(this.state.CheckCondition[item.parameterName])}
                                                                                        formControlProps={{ fullWidth: true }} />
                                                                                </GridItem>

                                                                            )
                                                                        }
                                                                    }
                                                                    )}
                                                                </GridContainer>
                                                            }
                                                            <GridContainer>

                                                                <GridItem>
                                                                    <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={(e) => this.queryExecution(e)}> <TranslationContainer translationKey="Generate" />  </Button>
                                                                </GridItem>

                                                            </GridContainer>

                                                        </CardBody>
                                                    </Card>

                                                </GridItem>
                                            </GridContainer>

                                        }

                                    </GridContainer>
                                </div>
                            </CardBody>
                        </Card>
                        : <PageContentLoader />
                }
                {this.state.tableFlag ?
                    <Card>
                        <GridItem>
                            <GridContainer>
                                <GridItem>
                                    <h4><small> {this.state.selectedReport}</small></h4>
                                </GridItem>
                            </GridContainer>
                        </GridItem>
                        <GridItem>
                            <GridContainer>
                                {this.state.reportparameters.map((item, key) =>
                                    <GridItem xs={12} sm={4}>
                                        <h5><b><TranslationContainer translationKey={item.parameterName} />:</b> {item.parameterValue}</h5>
                                    </GridItem>
                                )}
                            </GridContainer>
                        </GridItem>
                    </Card>
                    : null}

                {this.state.showdd &&
                    <Card>
                    <CardBody>
                    <GridContainer>

                        {this.state.showdd &&
                            <GridItem xs={12} sm={6} md={3}>
                                <Dropdown
                                    labelText="Chart Type"
                                    id="ChartType"
                                    value={this.state.fields.ChartType}
                                    lstObject={this.state.typeList}
                                    name='ChartType'
                                    onChange={this.onInputChartChange}
                                    // onChange={this.handleSubmit}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                        }
                        
                        {this.state.showgraph &&
                            
                            <Chart
                                width={1000}
                                height={500}
                                key={this.state.ChartName}
                                chartType={this.state.ChartName}
                                loader={<div>Loading Chart</div>}
                                data={this.state.graphData}

                                formatters={[
                                    {
                                        type: 'ArrowFormat',
                                        column: 1,
                                    },
                                ]}

                                options={{
                                    title: this.state.title,
                                    chartArea: { width: '62%', height: '70%' },
                                    hAxis: {title: this.state.labels.xaxis},
                                    vAxis: { title: this.state.labels.yaxis },//This is for Y axis Labeling
                                    bar: { groupWidth: "95%" },
                                    isStacked: true,
                                    is3D: true,
                                    showRowNumber: true,
                                    allowHtml: true,
                                    showRowNumber: true,
                                    intervals: { lineWidth: 1, barWidth: 1, style: 'boxes' },

                                    gantt: {
                                        trackHeight: 30,
                                    },

                                    animation: {
                                        startup: true,
                                        easing: 'linear',
                                        duration: 1500,
                                    },
                                }}
                                legendToggle
                                rootProps={{ 'data-testid': '1' }}
                            />}
                        </GridContainer>
                        </CardBody>
                    </Card>
                }
            </div>

        );
    }
}
export default ViewDashboard;