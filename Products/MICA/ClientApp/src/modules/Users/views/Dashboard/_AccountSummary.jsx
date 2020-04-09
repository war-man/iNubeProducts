import React from "react";
import Datetime from "react-datetime";
import ChartistGraph from "react-chartist";
//import '../src/css/common.css'; 

//import styles from '../css/affman.css'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import ContentLoader from "react-content-loader";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";
import policy from "assets/img/chart.png";
import details from "assets/img/policy.png";

import { pieChart, multipleBarsChart } from "variables/charts.jsx";

import CustomInput from "components/CustomInput/CustomInput.jsx";
import { Component } from 'react';
//import { AppRegistry, StyleSheet, ScrollView, StatusBar, Text, View } from 'react-native';
//import PieChart from 'react-native-pie-chart';
//import PieChart from '../src/index.js';
//import { Histogram, DensitySeries, BarSeries, withParentSize, XAxis, YAxis } from '@data-ui/histogram';
//import Histogram from 'react-chart-histogram';
import Chart from "react-google-charts";
import policyConfig from 'modules/Policy/PolicyConfig.js';
import { Animated } from "react-animated-css";
//import BarChart from "react-bar-chart";
import { array, string } from "prop-types";
import Dropdown from "../../../../components/Dropdown/Dropdown.jsx";
import swal from 'sweetalert';
import DashboardContentLoader from "components/Loaders/DashboardContentLoader.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

const margin = { top: 20, right: 20, bottom: 30, left: 40 };


const style = {
    ...dashboardStyle,
};

class AccountSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PolicyYear: [],
            MonthData: [],
            NEWSTACKDATA: [],
            Month: [{ mID: "January", mValue: "January", mType: 1 },
            { mID: "February", mValue: "February", mType: 2 },
            { mID: "March", mValue: "March", mType: 3 },
            { mID: "April", mValue: "April", mType: 4 },
            { mID: "May", mValue: "May", mType: 5 },
            { mID: "June", mValue: "June", mType: 6 },
            { mID: "July", mValue: "July", mType: 7 },
            { mID: "August", mValue: "August", mType: 8 },
            { mID: "September", mValue: "September", mType: 9 },
            { mID: "October", mValue: "October", mType: 10 },
            { mID: "November", mValue: "November", mType: 11 },
            { mID: "December", mValue: "December", mType: 12 }
            ],
            columnId: "",
            selectedMonth: "",
            selectedYear: "",
            productName: "",
            Data: [],
            SpecificData: [],
            StackData: [],
            newdata: ['jan', 'pk', 'pk'],
            data: ["jan", 10, 10],
            AccountDTO: {
                productId: "",
                productname: ""
            },
            BarDTO: {
                productid: "",
                productname: ""
            },
            stackChartflag: false,
            columnChartflag: false,
            barChartflag: false,
            cardid: "12",
            graphwidth: 0,
            graphheight: 0,
            loader: false,
            PolicyPage: true,
        };
    }
    setValue = (event) => {
        let accountdto = this.state.AccountDTO;
        accountdto[event.target.name] = event.target.value;
        this.setState({ accountdto });
    }

    getInitialState = () => {
        return { width: 500 };
    }

    handleBarClick = (element, id) => {
        console.log(`The bin ${element.text} with id ${id} was clicked`);
    }

    componentDidMount = () => {
        let Today = new Date();
        let currentmonth = Today.getMonth() + 1;
        for (var i = 0; i < this.state.Month.length; i++) {
            if (this.state.Month[i].mType == currentmonth)
                this.setState({ selectedMonth: this.state.Month[i].mID })
        }

        fetch(`${policyConfig.PolicyConfigUrl}/api/Policy/PolicyDashboardMaster`, {
            //  fetch(`https://localhost:44351/api/Policy/PolicyDashboardMaster`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {

                if (data.length == 0) {

                    this.setState({ PolicyPage: false });
                }

                console.log("PolicyYearMaster", data);
                this.setState({ PolicyYear: data });
                this.setState({ selectedYear: this.state.PolicyYear[this.state.PolicyYear.length - 1].mValue })
            });

        this.setState({ cardid: "12" });
        this.setState({ graphwidth: 800 });
        this.setState({ graphheight: 375 });

        fetch(`${policyConfig.PolicyconfigUrl}/api/Policy/GetPolicyGrossWrittenPremium`, {
            //fetch(`https://localhost:44351/api/Policy/GetPolicyGrossWrittenPremium`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                console.log("StackData", data);
                this.setState({ StackData: data });
                if (data.length > 0) {
                    /* First I Used ""StackData"" to set data */
                    let ProductData = data[0];

                    let CountData = data[data.length - 1];


                    let index = [];
                    const Array1 = [];
                    const Array2 = [];

                    for (var i = 0; i < ProductData.length; i++) {
                        if (CountData[i] != 0) {
                            index.push(i);
                        }
                    }
                    for (var j = 0; j < index.length; j++) {
                        Array1.push(ProductData[index[j]]);
                        Array2.push(CountData[index[j]]);
                    }
                    this.state.NEWSTACKDATA.push(Array1);
                    this.state.NEWSTACKDATA.push(Array2);
                    this.setState({ columnChartflag: true });
                } else {
                    this.setState({ loader: true });
                }
            });
        setTimeout(
            function () {
                this.setState({ loader: true });
            }
                .bind(this),
            2000
        );
        window.onresize = () => {
            //  this.setState({ width: this.refs.root.offsetWidth });
        };
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

    handleYear = (e) => {
        this.setState({ [e.target.name]: e.target.value });

        fetch(`${policyConfig.policyConfigUrl}/api/Policy/GetPolicyGrossWrittenPremium?Year=` + e.target.value, {
            //fetch(`https://localhost:44351/api/Policy/GetPolicyGrossWrittenPremium?Year=` + e.target.value, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {

                this.setState({ StackData: data });

                /* First I Used ""StackData"" to set data */
                if (data.length > 0) {
                    let ProductData = data[0];

                    let CountData = data[data.length - 1];


                    let index = [];
                    const Array1 = [];
                    const Array2 = [];


                    for (var i = 0; i < ProductData.length; i++) {

                        if (CountData[i] != 0) {
                            index.push(i);
                        }

                    }
                    for (var j = 0; j < index.length; j++) {
                        Array1.push(ProductData[index[j]]);
                        Array2.push(CountData[index[j]]);
                    }
                    this.state.NEWSTACKDATA = [];
                    this.state.NEWSTACKDATA.push(Array1);
                    this.state.NEWSTACKDATA.push(Array2);
                    this.setState({});
                } else {
                    this.setState({ loader: true });
                }
            });

    }

    columnChartfun = () => {
        this.setState({ columnChartflag: true, stackChartflag: false });
    }

    stackChartfun = () => {
        this.setState({ columnChartflag: false, stackChartflag: true });
    }

    render() {
        const { classes } = this.props;

        const options = { fillColor: '#FFFFFF', strokeColor: '#0000FF' };

        const superClass = this;
        this.chartEvents = [
            {
                eventName: 'select',
                callback({ chartWrapper }) {

                    console.log("Selected ", chartWrapper.getChart().getSelection());
                    var Product = chartWrapper.getChart().getSelection();
                    console.log(Product[0].column);
                    var columnNum = Product[0].column;
                    superClass.setState({ columnId: columnNum });


                    /* Changed StackData to --------> NEWSTACKDATA*/

                    superClass.setState({ productName: superClass.state.NEWSTACKDATA[0][superClass.state.columnId] });

                    console.log("added ", superClass.state.productName);

                    superClass.state.BarDTO.productname = superClass.state.productName.toUpperCase();

                    fetch(`${policyConfig.policyConfigUrl}/api/Policy/GetPolicyGrossWrittenPremium?productname=` + superClass.state.productName, {
                        //fetch(`https://localhost:44351/api/Policy/GetPolicyGrossWrittenPremium?productname=` + superClass.state.productName, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                        },
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.length > 0) {
                                var finalbardata = data.splice(1, 3);

                                console.log("Specific Data", data);
                                superClass.setState({ SpecificData: finalbardata, barChartflag: true });

                                console.log("setstate", superClass.state.SpecificData);
                            } else {
                                this.setState({ loader: true });
                            }
                        });


                    superClass.setState({ cardid: "6" });
                    superClass.setState({ graphwidth: 400 });
                    superClass.setState({ graphheight: 400 });
                }
            },
        ];
        return (<div>
            {
                this.state.PolicyPage ? <GridContainer xl={12}>
                    {this.state.loader ?
                        <GridContainer xl={12}>
                            <GridItem lg={12}>
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                    <GridContainer className="dash" xl={12} justify="space-between">
                                        <GridItem xs={this.state.cardid}>
                                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                <Card>
                                                    <CardHeader color="warning" icon>
                                                        <CardIcon color="warning">
                                                            <Icon><img id="icon" src={policy} className={classes.cardIcons} /></Icon>
                                                        </CardIcon>
                                                        <h4 className={classes.cardIconTitle}><TranslationContainer translationKey="PolicyDashboard" /></h4>
                                                    </CardHeader>
                                                    <CardBody>
                                                        <GridContainer lg={12} justify="flex-end">
                                                            <GridItem xs={12} sm={12} md={3}>
                                                                <Dropdown
                                                                    labelText="Month"
                                                                    id="Month"
                                                                    lstObject={this.state.Month}
                                                                    value={this.state.selectedMonth}
                                                                    name='selectedMonth'
                                                                    onChange={(e) => this.MonthWise(e)}
                                                                    formControlProps={{ fullWidth: true }}
                                                                />
                                                            </GridItem>
                                                            <GridItem xs={12} sm={12} md={3}>

                                                                <Dropdown
                                                                    labelText="Year"
                                                                    lstObject={this.state.PolicyYear}
                                                                    value={this.state.selectedYear}
                                                                    name='selectedYear'
                                                                    onChange={(e) => this.handleYear(e)}
                                                                    formControlProps={{ fullWidth: true }}
                                                                />

                                                            </GridItem>

                                                            <GridItem xs={12} sm={12} md={12} lg={4}>
                                                                <button className={classes.barBtn} onClick={this.columnChartfun}><i className="fas fa-chart-bar" /> </button> <span id="chart-text">Column Chart</span>{` `}
                                                                <button className={classes.pieBtn} onClick={this.stackChartfun}><i className="fas fa-chart-line" /> </button><span id="chart-text">Stack Chart</span>{` `}
                                                            </GridItem>
                                                        </GridContainer>
                                                        {/* Stack Chart  */}
                                                        {this.state.stackChartflag &&

                                                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                                <Chart
                                                                    width={this.state.graphwidhth}
                                                                    height={this.state.graphheight}
                                                                    chartType="ColumnChart"
                                                                    // loader={<div>Loading Chart</div>}
                                                                    chartEvents={this.chartEvents}
                                                                    data={this.state.NEWSTACKDATA}
                                                                    //onClick={this.chartEvents}
                                                                    options={{
                                                                        title: 'Total Policy Count ',
                                                                        chartArea: { width: '62%', height: '70%' },
                                                                        hAxis: {
                                                                            title: 'Month',
                                                                            //minValue: 0,
                                                                        },
                                                                        vAxis: {
                                                                            0: { title: 'Count' },
                                                                            1: { title: 'parsecs' },

                                                                        },
                                                                        isStacked: true,
                                                                        animation: {
                                                                            startup: true,
                                                                            easing: 'linear',
                                                                            duration: 1500,
                                                                        },

                                                                    }}
                                                                    legendToggle

                                                                /> </Animated>
                                                        }
                                                        {this.state.columnChartflag &&
                                                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                                                                <Chart
                                                                    width={this.state.graphwidhth}
                                                                    height={this.state.graphheight}
                                                                    chartType="ColumnChart"
                                                                    // loader={<div>Loading Chart</div>}
                                                                    chartEvents={this.chartEvents}
                                                                    data={this.state.NEWSTACKDATA}
                                                                    // data={this.state.StackData}  ---OldOne
                                                                    //onClick={this.chartEvents}
                                                                    options={{
                                                                        title: 'Total Policy Count ',
                                                                        chartArea: { width: '62%', height: '70%' },
                                                                        hAxis: {
                                                                            title: 'Month',
                                                                            //minValue: 0,
                                                                        },
                                                                        vAxis: {
                                                                            0: { title: 'Count' },
                                                                            1: { title: 'parsecs' },

                                                                        },
                                                                        animation: {
                                                                            startup: true,
                                                                            easing: 'linear',
                                                                            duration: 1500,
                                                                        },

                                                                    }}
                                                                    legendToggle

                                                                />
                                                            </Animated>
                                                        }
                                                    </CardBody>
                                                </Card>
                                            </Animated>
                                        </GridItem>
                                        {this.state.barChartflag && <GridItem xs={6}>

                                            <GridContainer xl={12}>
                                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                    <Card>
                                                        <CardHeader color="warning" icon>
                                                            <CardIcon color="warning">
                                                                <Icon><img id="icon" src={details} className={classes.cardIcons} /></Icon>
                                                            </CardIcon>
                                                            <h4 className={classes.cardIconTitle}><TranslationContainer translationKey="ProductDetails" /></h4>
                                                        </CardHeader>
                                                        <CardBody>
                                                            <br />
                                                            <GridContainer direction="column" lg={12}  >
                                                                <GridItem xs={12} sm={12} md={12} lg={7}>
                                                                    <h5><TranslationContainer translationKey="Product" /><b id="color-blue"> {this.state.BarDTO.productname}</b></h5>
                                                                </GridItem>
                                                            </GridContainer>
                                                            <div style={{ display: 'flex', maxWidth: 900 }}>
                                                                {/* <div id="line" color="warning" className={classes.vl}></div> */}
                                                                <Chart
                                                                    width={500}
                                                                    height={400}
                                                                    chartType="ColumnChart"
                                                                    // loader={<div>Loading Chart</div>}

                                                                    data={this.state.SpecificData}
                                                                    options={{
                                                                        title: 'Premium and Policy Count ',
                                                                        chartArea: { width: '62%', height: '70%' },
                                                                        hAxis: {
                                                                            title: 'Month',
                                                                            //minValue: 0,
                                                                        },
                                                                        vAxis: {
                                                                            title: '', //This is for Y axis Labeling 
                                                                        },
                                                                        animation: {
                                                                            startup: true,
                                                                            easing: 'linear',
                                                                            duration: 1500,
                                                                        },
                                                                    }}
                                                                    legendToggle
                                                                />
                                                            </div>
                                                        </CardBody>
                                                    </Card>
                                                </Animated>
                                            </GridContainer>
                                        </GridItem>}
                                    </GridContainer>
                                </Animated>
                            </GridItem>
                        </GridContainer>
                        : <DashboardContentLoader />
                    }
                </GridContainer> : null}
        </div>
        );
    }
}
export default withStyles(style)(AccountSummary);