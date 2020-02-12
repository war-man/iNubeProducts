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

import {Animated} from "react-animated-css";

const style = {
    ...dashboardStyle,
};

class UwAlerts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            simpleSelect: "",
            product: "",
            interval: "",
            lob: "",
            barFlag: false,
            pieFlag: true,

        };
    }
    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    pieChart = () => {
        this.setState({
            pieFlag: true,
            barFlag: false
        })
    }
    barChart = () => {
        this.setState({
            pieFlag: false,
            barFlag: true
        })
    }


    render() {
        const { classes } = this.props;
        return (
            <GridContainer lg={12} xs={12}> 
            <GridItem xs={12}> 
            <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>

            <Card >

                <CardHeader color="info" icon>
                    <CardIcon color="info">
                        <Icon><img id="icon" src={CDAccountDashboard} style={{ width: "22px" }} /></Icon>
                    </CardIcon>
                    <h4 className={classes.cardIconTitle}>
                        CD Account Dashboard
                    </h4>
                </CardHeader>
              
                <CardBody >

                    <GridContainer justify="space-between">

                        <GridContainer className="gridBox" id="fullWidth" xs={4} sm={6} md={6} lg={6}>
                            <GridItem xs={4} sm={6} md={6} lg={5}>
                                <FormControl fullWidth className={classes.selectFormControl}>
                                    <InputLabel
                                        htmlFor="time-interval"
                                        className={classes.selectLabel}
                                    >
                                        Product CD account No
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
                                            Select
                                    </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected
                                            }}
                                            value="2"
                                        >
                                            0119/0247/0118/00/000
                                         </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected
                                            }}
                                            value="3"
                                        >
                                            0119/0247/0121/00/000
                                    </MenuItem>
                                    </Select>
                                </FormControl>


                            </GridItem>
                            {/* <GridItem xs={3} sm={3} md={3}>
                                <Button id="round" color="info" >Submit</Button>
                            </GridItem>*/}

                        </GridContainer>

                        <div id="line" color="warning" className={classes.vlinfo}></div>





                        <GridItem xs={6}>
                            <div id="chartOption" className={classes.chartOptions}>
                                <button className={classes.pieBtn} onClick={this.pieChart}><i className="fas fa-chart-pie" /> </button>Pie Chart{` `}
                                <button className={classes.barBtn} onClick={this.barChart}><i className="fas fa-chart-bar" /> </button>Bar Chart{` `}
                            </div>
                            {this.state.pieFlag ?


                                <div id="pieChart" className={classes.pieChart} >

                                    <ChartistGraph
                                        data={pieChart.data}
                                        type="Pie"
                                        options={pieChart.options}
                                    />

                                </div> : null}
                            <div id="textChart" stats className={classes.cardFooter + ' ' + classes.chartFooter}>
                                <button className={classes.avail}><i className={"fas fa-square fa-lg "} /> </button>Available CD Balance{` `}{` `}
                                <button className={classes.utilized}><i className={"fas fa-square fa-lg "} /> </button> CD Balance Utilized {` `}
                            </div>


                            {this.state.barFlag ?
                                <div>

                                    <ChartistGraph
                                        data={multipleBarsChart.data}
                                        type="Bar"
                                        options={multipleBarsChart.options}
                                    />
                                    <div stats className={classes.cardFooter + ' ' + classes.cdBal}>
                                        <button className={classes.avail1}><i className={"fas fa-square fa-lg "} /> </button>Available CD Balance{` `}{` `}
                                        <button className={classes.utilized}><i className={"fas fa-square fa-lg "} /> </button> CD Balance Utilized {` `}
                                    </div>

                                </div> : null}
                        </GridItem>

                    </GridContainer>
                </CardBody>
           
            </Card>
            </Animated>
            </GridItem>
            </GridContainer>
        );
    }
}
export default withStyles(style)(UwAlerts);