import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import Chart from "react-google-charts";
// @material-ui/icons
//import Calendar from 'react-calendar';
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import AccountSummary from "./Dashboard/_AccountSummary.jsx";
import SalesSummary from "./Dashboard/_SalesSummary.jsx";
import Calendars from "./Dashboard/_Calendar.jsx";
import MyAlerts from "./Dashboard/_MyAlerts.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import product from "assets/img/product.png";
import policy from "assets/img/policy.png";
import information from "assets/img/content.png";
import calender from "assets/img/calendar-with-a-clock-time-tools.png";
import funnel from "assets/img/funnel.png";
import statistics from "assets/img/statistics.png";
import analytics from "assets/img/analytics.png";
import pieChart from "assets/img/pie-chart.png";
import CDAccountDashboard from "assets/img/security.png";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
//import "animate.css/animate.min.css";
import { Animated } from "react-animated-css";

var mapData = {
    AU: 760,
    BR: 550,
    CA: 120,
    DE: 1300,
    FR: 540,
    GB: 690,
    GE: 200,
    IN: 200,
    RO: 600,
    RU: 300,
    US: 2920
};

const pieOptions = {
    title: "",
    pieHole: 0.6,
    slices: [
        {
            color: "#BBB673"
        },
        {
            color: "#808080"
        },
        {
            color: "#800000"
        },
        {
            color: "#FF0000"
        }
    ],
    //  legend: 'none',
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

class AVODashboard extends React.Component {
    state = {
        value: 0,
        accountFlag: true,
        salesFlag: false,
        calenderFlag: false,
        alertFlag: false,
        date: new Date(),
    };

    onChange = date => this.setState({ date })

    handleChange = (event, value) => {
        this.setState({ value });
    };
    handleChangeIndex = index => {
        this.setState({ value: index });
    };
    showAccountSummary = () => {
        this.setState({
            accountFlag: true,
            salesFlag: false,
            calenderFlag: false,
            alertFlag: false
        })
    }
    showSalesSummary = () => {
        this.setState({
            accountFlag: false,
            salesFlag: true,
            calenderFlag: false, alertFlag: false
        })
    }
    showCalendar = () => {
        this.setState({
            calenderFlag: true,
            accountFlag: false,
            salesFlag: false,
            alertFlag: false
        })
    }
    showAlert = () => {
        this.setState({
            calenderFlag: false,
            accountFlag: false,
            salesFlag: false,
            alertFlag: true
        })
    }
    render() {
        const { classes } = this.props;
        return (


            <GridContainer lg={12}>
                <GridItem lg={6}>
                    <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                        <Card>
                            <CardHeader color="warning" stats icon>
                                <CardIcon color="warning">
                                    <Icon><img id="dashboardimg" src={information} className={classes.calImg} /></Icon>
                                </CardIcon>
                                <h4 className={classes.cardCategory}> Proposal Information</h4>
                                <h3 className={classes.cardTitle}>

                                </h3>

                            </CardHeader>

                            <CardBody>
                                <GridContainer lg={12}>
                                    <GridItem xs={5}>
                                        <FormControl fullWidth className={classes.selectFormControl}>
                                            <InputLabel
                                                htmlFor="time-interval"
                                                className={classes.selectLabel}
                                            >
                                                Select
                                 </InputLabel>
                                            <Select
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                value={this.state.interval}
                                                onChange={this.handleSimple}
                                                inputProps={{
                                                    name: "interval",
                                                    id: "time-interval"
                                                }}
                                            >
                                                <MenuItem
                                                    disabled
                                                    classes={{
                                                        root: classes.selectMenuItem
                                                    }}
                                                >
                                                    <ListItemIcon>

                                                    </ListItemIcon>
                                                    MTD
                                    </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="2"
                                                >
                                                    {/* THis is with icon  it can use with material icon**/}
                                                    <ListItemIcon>

                                                    </ListItemIcon>
                                                    YTD
                                         </MenuItem>

                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem xs={5}>
                                        <FormControl fullWidth className={classes.selectFormControl}>
                                            <InputLabel
                                                htmlFor="time-interval"
                                                className={classes.selectLabel}
                                            >
                                                Select
                                 </InputLabel>
                                            <Select
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                value={this.state.interval}
                                                onChange={this.handleSimple}
                                                inputProps={{
                                                    name: "interval",
                                                    id: "time-interval"
                                                }}
                                            >
                                                <MenuItem
                                                    disabled
                                                    classes={{
                                                        root: classes.selectMenuItem
                                                    }}
                                                >
                                                    ANP
                                    </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="2"
                                                >
                                                    NOP
                                         </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                        <Chart
                                            width={500}
                                            height={400}
                                            chartType="ColumnChart"
                                            // loader={<div>Loading Chart</div>}
                                            data={[
                                                ['Year/Month', '2010 GWP ', '2010  PC'],
                                                ['Jan', 810, 100],
                                                ['Feb', 370, 360],
                                                ['Mar', 260, 280],
                                                ['Apr', 200, 190],
                                                ['jun', 150, 110],
                                            ]}
                                            options={{
                                                title: 'Total GWP ',
                                                chartArea: { width: '50%', height: '70%' },
                                                hAxis: {
                                                    title: 'Total GWP',
                                                    //minValue: 0,
                                                },
                                                vAxis: {
                                                    title: 'Data',
                                                },
                                            }}
                                            legendToggle
                                        />
                                    </Animated>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </Animated>
                    <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                        <Card>
                            <CardHeader color="info" stats icon>
                                <CardIcon color="info">
                                    <Icon><img id="dashboardimg" src={statistics} className={classes.calImg} /></Icon>
                                </CardIcon>
                                <p className={classes.cardCategory}> Based On Proposal Submission Date</p>
                                <h3 className={classes.cardTitle}>

                                </h3>
                            </CardHeader>

                            <CardBody>
                                <GridContainer lg={12}>
                                    <GridItem xs={5}>
                                        <FormControl fullWidth className={classes.selectFormControl}>
                                            <InputLabel
                                                htmlFor="time-interval"
                                                className={classes.selectLabel}
                                            >
                                                Select
                                 </InputLabel>
                                            <Select
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                value={this.state.interval}
                                                onChange={this.handleSimple}
                                                inputProps={{
                                                    name: "interval",
                                                    id: "time-interval"
                                                }}
                                            >
                                                <MenuItem
                                                    disabled
                                                    classes={{
                                                        root: classes.selectMenuItem
                                                    }}
                                                >
                                                    <ListItemIcon>

                                                    </ListItemIcon>
                                                    MTD
                                    </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="2"
                                                >
                                                    {/* THis is with icon  it can use with material icon**/}
                                                    <ListItemIcon>

                                                    </ListItemIcon>
                                                    YTD
                                         </MenuItem>

                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem xs={5}>
                                        <FormControl fullWidth className={classes.selectFormControl}>
                                            <InputLabel
                                                htmlFor="time-interval"
                                                className={classes.selectLabel}
                                            >
                                                Select
                                 </InputLabel>
                                            <Select
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                value={this.state.interval}
                                                onChange={this.handleSimple}
                                                inputProps={{
                                                    name: "interval",
                                                    id: "time-interval"
                                                }}
                                            >
                                                <MenuItem
                                                    disabled
                                                    classes={{
                                                        root: classes.selectMenuItem
                                                    }}
                                                >
                                                    ANP
                                    </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="2"
                                                >
                                                    NOP
                                         </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </GridItem>

                                    <Chart
                                        width={500}
                                        height={300}
                                        chartType="ColumnChart"
                                        // loader={<div>Loading Chart</div>}
                                        data={[
                                            ['Year/Month', '2010 GWP ', '2010  PC'],
                                            ['Jan', 810, 100],
                                            ['Feb', 370, 360],
                                            ['Mar', 260, 280],
                                            ['Apr', 200, 190],
                                            ['jun', 150, 110],
                                        ]}
                                        options={{
                                            title: 'Total GWP ',
                                            chartArea: { width: '50%', height: '70%' },
                                            hAxis: {
                                                title: 'Total GWP',
                                                //minValue: 0,
                                            },
                                            vAxis: {
                                                title: 'Data',
                                            },
                                        }}
                                        legendToggle
                                    />
                                </GridContainer >
                            </CardBody>
                        </Card>
                    </Animated>

                    <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                        <Card style={{ marginTop: '0' }}>
                            <CardHeader color="warning" stats icon>
                                <CardIcon className="header-color1" color="warning">
                                    <Icon><img id="dashboardimg" src={analytics} className={classes.calImg} /></Icon>
                                </CardIcon>
                                <p className={classes.cardCategory}>  Based On Last Requirement Calling Date</p>
                                <h3 className={classes.cardTitle}>

                                </h3>
                            </CardHeader>

                            <CardBody>
                                <GridContainer lg={12}>

                                    <GridItem xs={5}>
                                        <FormControl fullWidth className={classes.selectFormControl}>
                                            <InputLabel
                                                htmlFor="time-interval"
                                                className={classes.selectLabel}
                                            >
                                                Select
                                 </InputLabel>
                                            <Select
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                value={this.state.interval}
                                                onChange={this.handleSimple}
                                                inputProps={{
                                                    name: "interval",
                                                    id: "time-interval"
                                                }}
                                            >
                                                <MenuItem
                                                    disabled
                                                    classes={{
                                                        root: classes.selectMenuItem
                                                    }}
                                                >
                                                    <ListItemIcon>

                                                    </ListItemIcon>
                                                    MTD
                                    </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="2"
                                                >
                                                    {/* THis is with icon  it can use with material icon**/}
                                                    <ListItemIcon>

                                                    </ListItemIcon>
                                                    YTD
                                         </MenuItem>

                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem xs={5}>
                                        <FormControl fullWidth className={classes.selectFormControl}>
                                            <InputLabel
                                                htmlFor="time-interval"
                                                className={classes.selectLabel}
                                            >
                                                Select
                                 </InputLabel>
                                            <Select
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                value={this.state.interval}
                                                onChange={this.handleSimple}
                                                inputProps={{
                                                    name: "interval",
                                                    id: "time-interval"
                                                }}
                                            >
                                                <MenuItem
                                                    disabled
                                                    classes={{
                                                        root: classes.selectMenuItem
                                                    }}
                                                >
                                                    ANP
                                    </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="2"
                                                >
                                                    NOP
                                         </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </GridItem>


                                    <Chart
                                        width={500}
                                        height={310}
                                        chartType="ColumnChart"
                                        // loader={<div>Loading Chart</div>}
                                        data={[
                                            ['Year/Month', '2010 GWP ', '2010  PC'],
                                            ['Jan', 810, 100],
                                            ['Feb', 370, 360],
                                            ['Mar', 260, 280],
                                            ['Apr', 200, 190],
                                            ['jun', 150, 110],
                                        ]}
                                        options={{
                                            title: 'Total GWP ',
                                            chartArea: { width: '50%', height: '70%' },
                                            hAxis: {
                                                title: 'Total GWP',
                                                //minValue: 0,
                                            },
                                            vAxis: {
                                                title: 'Data',
                                            },
                                        }}
                                        legendToggle
                                    />
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </Animated>
                </GridItem>



                <GridItem lg={6}>
                    <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                        <Card>

                            <CardHeader color="success" stats icon>
                                <CardIcon color="success">
                                    <Icon><img id="dashboardimg" src={funnel} className={classes.calImg} /></Icon>
                                </CardIcon>
                                <p className={classes.cardCategory}> Sale Funnel</p>
                                <h3 className={classes.cardTitle}>

                                </h3>
                            </CardHeader>
                            <CardBody>
                                <GridContainer xs={12} sm={12} md={12} lg={12}>
                                    <GridItem xs={5}>
                                        <FormControl fullWidth className={classes.selectFormControl}>
                                            <InputLabel
                                                htmlFor="time-interval"
                                                className={classes.selectLabel}
                                            >
                                                Select
                                 </InputLabel>
                                            <Select
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                value={this.state.interval}
                                                onChange={this.handleSimple}
                                                inputProps={{
                                                    name: "interval",
                                                    id: "time-interval"
                                                }}
                                            >
                                                <MenuItem
                                                    disabled
                                                    classes={{
                                                        root: classes.selectMenuItem
                                                    }}
                                                >
                                                    MTD
                                    </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="2"
                                                >
                                                    YTD
                                         </MenuItem>

                                            </Select>
                                        </FormControl>
                                    </GridItem>

                                    <Chart
                                        width={500}
                                        height={300}
                                        chartType="ColumnChart"
                                        // loader={<div>Loading Chart</div>}
                                        data={[
                                            ['Year/Month', '2010 GWP ', '2010  PC'],
                                            ['Jan', 810, 100],
                                            ['Feb', 370, 360],
                                            ['Mar', 260, 280],
                                            ['Apr', 200, 190],
                                            ['jun', 150, 110],
                                        ]}
                                        options={{
                                            title: 'Total GWP ',
                                            chartArea: { width: '50%', height: '70%' },
                                            hAxis: {
                                                title: 'Total GWP',
                                                //minValue: 0,
                                            },
                                            vAxis: {
                                                title: 'Data',
                                            },
                                        }}
                                        legendToggle
                                    />

                                </GridContainer>

                            </CardBody>
                        </Card>
                    </Animated>

                    <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                        <Card className="bg-cal">
                            <CardHeader /*color="danger"*/ stats icon>

                                <p id="cal-heading" className={classes.cardCategory}> Daily Planner</p>
                                <h3 className={classes.cardTitle}>

                                </h3>
                            </CardHeader>
                            {
                                //<CardBody>
                                //    <Calendar />
                                //</CardBody>
                            }
                        </Card>

                        <Card>
                            <CardHeader color="warning" stats icon>
                                <CardIcon className="header-color2" color="warning">
                                    <Icon><img id="dashboardimg" src={pieChart} className={classes.calImg} /></Icon>
                                </CardIcon>
                                <p className={classes.cardCategory}> Medical/Non-Medical</p>
                                <h3 className={classes.cardTitle}>

                                </h3>
                            </CardHeader>

                            <CardBody>
                                <GridContainer lg={12}>
                                    <GridItem xs={5}>
                                        <FormControl fullWidth className={classes.selectFormControl}>
                                            <InputLabel
                                                htmlFor="time-interval"
                                                className={classes.selectLabel}
                                            >
                                                Select
                                 </InputLabel>
                                            <Select
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                value={this.state.interval}
                                                onChange={this.handleSimple}
                                                inputProps={{
                                                    name: "interval",
                                                    id: "time-interval"
                                                }}
                                            >
                                                <MenuItem
                                                    disabled
                                                    classes={{
                                                        root: classes.selectMenuItem
                                                    }}
                                                >
                                                    <ListItemIcon>

                                                    </ListItemIcon>
                                                    MTD
                                    </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="2"
                                                >
                                                    {/* THis is with icon  it can use with material icon**/}
                                                    <ListItemIcon>

                                                    </ListItemIcon>
                                                    YTD
                                         </MenuItem>

                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem xs={5}>
                                        <FormControl fullWidth className={classes.selectFormControl}>
                                            <InputLabel
                                                htmlFor="time-interval"
                                                className={classes.selectLabel}
                                            >
                                                Select
                                 </InputLabel>
                                            <Select
                                                MenuProps={{
                                                    className: classes.selectMenu
                                                }}
                                                classes={{
                                                    select: classes.select
                                                }}
                                                value={this.state.interval}
                                                onChange={this.handleSimple}
                                                inputProps={{
                                                    name: "interval",
                                                    id: "time-interval"
                                                }}
                                            >
                                                <MenuItem
                                                    disabled
                                                    classes={{
                                                        root: classes.selectMenuItem
                                                    }}
                                                >
                                                    ANP
                                    </MenuItem>
                                                <MenuItem
                                                    classes={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelected
                                                    }}
                                                    value="2"
                                                >
                                                    NOP
                                         </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </GridItem>


                                    <Chart className="pie_Chart"
                                        chartType="PieChart"

                                        data={[
                                            ['Year/Month', '2010 GWP ', '2010  PC'],
                                            ['Jan', 810, 100],
                                            ['Feb', 370, 360],
                                            ['Mar', 260, 280],
                                            ['Apr', 200, 190],
                                            ['jun', 150, 110],
                                        ]}
                                        options={{
                                            title: 'My Daily Activities',
                                            // Just add this option
                                            is3D: true,
                                            animation: {
                                                startup: true,
                                                easing: 'linear',
                                                duration: 1500,
                                            },
                                        }}

                                        graph_id="PieChart"
                                        width={500}
                                        height={515}
                                        legend_toggle
                                        chartEvents={[
                                            {
                                                eventName: 'animationfinish',
                                                callback: () => {
                                                    console.log('Animation Finished')
                                                },
                                            },
                                        ]}
                                    />
                                </GridContainer>
                            </CardBody>

                        </Card>
                    </Animated>
                </GridItem>
            </GridContainer>

        );
    }
}

AVODashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(AVODashboard);
