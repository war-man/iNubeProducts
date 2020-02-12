import React from "react";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import ChartistGraph from "react-chartist";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import AlertWizard from "components/AlertWizard/AlertWizard.jsx";

import EscalationMatrix from "./_EscalationMatrix.jsx";
import TrackClaims from "./_TrackClaims.jsx";
import Notifications from "./_Notifications.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import CDAccountDashboard from "assets/img/security.png";
import { pieChart, multipleBarsChart, simpleBarChart } from "variables/charts.jsx";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "components/CustomButtons/Button.jsx";
import Chart from "react-google-charts";
import partnerconfig from "modules/Partners/PartnerConfig.js";
//import {Animated} from "react-animated-css";
import Dropdown from "../../../../components/Dropdown/Dropdown.jsx";
import { Animated } from "react-animated-css";
import DashboardContentLoader from "components/Loaders/DashboardContentLoader.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

const pieOptions = {
    title: "",
    pieHole: 0.2,
    slices: [
        {
            color: "#2BB673"
        },
        {
            color: "#d91e48"
        },
        {
            color: "#007fad"
        },
        {
            color: "#e9a227"
        }
    ],
    legend: {
        position: "bottom",
        alignment: "center",
        textStyle: {
            color: "233238",
            fontSize: 14
        }
    },
    tooltip: {
        showColorCode: true
    },
    chartArea: {
        left: 0,
        top: 0,
        width: "100%",
        height: "80%"
    },
    fontName: "Roboto"
};
const style = {
    ...dashboardStyle,
};
class MyAlerts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            simpleSelect: "",
            product: "",
            interval: "",
            lob: "",
            barFlag: false,
            pieFlag: false,
            CDdashboarddata: [],
            PieChartdata: [],
            Cdid: "",
            loader: false,
        };
    }
    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });

        console.log("Cdid", this.state.Cdid);
    };

    componentDidMount() {

        fetch(`${partnerconfig.partnerconfigUrl}/api/Accounts/GetCdAccountMasterAsync?isProduct=true`, {
          //fetch(`https://localhost:44315/api/Accounts/GetCdAccountMasterAsync?isProduct=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("CDdashboarddata", data);
                this.setState({ CDdashboarddata: data });

            });
        setTimeout(
            function () {
                this.setState({ loader: true });
            }
                .bind(this),
            2000
        );
        console.log("CDAccountDashboard", this.state.CDdashboarddata);
    }
    Piechartfun = (e) => {

         this.setState({ [e.target.name]: e.target.value });

        fetch(`${partnerconfig.partnerconfigUrl}/api/Accounts/GetAccountFilter?Cdid=` + e.target.value, {
            //fetch(`https://localhost:44315/api/Accounts/GetAccountFilter?Cdid=` + this.state.Cdid,{
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
                    this.setState({ pieFlag: true });
                    console.log("pieData", data);
                    this.setState({ PieChartdata: data });
                }

            });
    }

    render() {
        const { classes } = this.props;
        return (
            <GridContainer xl={12}>
                {this.state.loader ?
                    <GridContainer xl={12}>
                        <GridItem lg={12}>
                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                <Card style={{ height: '100%' }}>

                                    <CardHeader color="info" icon>
                                        <CardIcon color="info">
                                            <Icon><img id="icon" src={CDAccountDashboard} style={{ width: "22px" }} /></Icon>
                                        </CardIcon>
                                        <h4 className={classes.cardIconTitle}><TranslationContainer translationKey="CDAccountDashboard" /></h4>
                                    </CardHeader>
                                    <CardBody >

                                        <GridContainer justify="space-between">
                                            <GridContainer id="fullWidth" xs={4} sm={6} md={6} lg={6}>
                                                <GridItem xs={4} sm={6} md={6} lg={5}>
                                                    <Dropdown labelText="CDAccountNumber" id="CD" lstObject={this.state.CDdashboarddata} value={this.state.Cdid} name='Cdid' onChange={(e) => this.Piechartfun(e)} formControlProps={{ fullWidth: true }} />
                                                </GridItem>
                                            </GridContainer>

                                            <div id="alert-line" color="info" className={classes.vl}></div>

                                            <GridItem xs={6}>
                                                {this.state.pieFlag && <Chart
                                                    chartType="PieChart"
                                                    data={this.state.PieChartdata}
                                                    options={pieOptions}
                                                    graph_id="PieChart"
                                                    width={"100%"}
                                                    height={"400px"}
                                                    legend_toggle
                                                />}

                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                </Card>
                            </Animated>
                        </GridItem>
                    </GridContainer>
                    : <DashboardContentLoader />}
            </GridContainer>
        );
    }
}
export default withStyles(style)(MyAlerts);