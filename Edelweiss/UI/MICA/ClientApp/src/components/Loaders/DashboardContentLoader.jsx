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
import ContentLoader from "react-content-loader"
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

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


const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const cardHeight = { height: 400 };

const style = {
    ...dashboardStyle,
};





class DashboardContentLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnId: "",
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
            columnChartflag: true,
            barChartflag: false,
            cardid: "12",
            graphwidth: 0,
            graphheight: 0,

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
        this.setState({ cardid: "12" });
        this.setState({ graphwidth: 800 });
        this.setState({ graphheight: 500 });

        fetch(`${policyConfig.policyConfigUrl}/api/Policy/GetPolicyGrossWrittenPremium`, {
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
            });
        window.onresize = () => {
            //  this.setState({ width: this.refs.root.offsetWidth });
        };
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
        return (
            <GridContainer xl={12} >
                <GridItem lg={12} >
                    <Animated animationIn="fadeInUp" animationOut="fadeOut" isVisible={true}>
                        <GridContainer className="dash" justify="space-between">
                            <GridItem xs={this.state.cardid}>
                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                    <Card style={cardHeight} >
                                        <ContentLoader className="icon-loader" >
                                            <rect x="31" y="21" rx="0" ry="0" width="20" height="80" />
                                        </ContentLoader >
                                        <ContentLoader className="header-loader" >
                                            <rect x="31" y="21" rx="0" ry="0" width="100" height="146" />
                                        </ContentLoader >
                                        <CardBody>
                                        </CardBody>
                                    </Card>
                                </Animated>
                            </GridItem>
                        </GridContainer>
                    </Animated>
                </GridItem>
            </GridContainer>

        );
    }
}
export default withStyles(style)(DashboardContentLoader);