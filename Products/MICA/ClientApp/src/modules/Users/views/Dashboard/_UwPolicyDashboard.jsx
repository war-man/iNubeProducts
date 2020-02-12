import React from "react";
import ChartistGraph from "react-chartist";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import { pieChart, multipleBarsChart } from "variables/charts.jsx";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";
import policy from "assets/img/policy.png";
import Button from "components/CustomButtons/Button.jsx";



import {Animated} from "react-animated-css";

const style = {
    ...dashboardStyle,
};


class PendingActions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pieFlag: false,
            barFlag: true,
        };
    }
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
            <Animated animationIn="fadeInUp" animationOut="fadeOut" isVisible={true}>  
            <GridContainer className="dash" xs={12} sm={6} md={6} lg={12}>
            <Card>


                <CardHeader color="warning" icon>
                    <CardIcon color="warning">
                        <Icon><img id="icon" src={policy} className={classes.cardIcons} /></Icon>
                    </CardIcon>
                    <h4 className={classes.cardIconTitle}>
                        Policy Dashboard
                </h4>
                </CardHeader>
                
                <CardBody>

                    <GridContainer justify="space-between">

                        <GridContainer className="gridBox" id="fullWidth" xs={4} sm={6} md={6} lg={6}>
                            <GridItem xs={6} sm={6} md={6} lg={5}>
                                <CustomInput

                                    labelText="Product ID"
                                    // required={true}
                                    name="productId"
                                    //  value={this.state}
                                    onChange={this.setValue}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                            <GridItem xs={6} sm={6} md={6} lg={5}>
                                <CustomInput

                                    labelText="Product Name"
                                    // required={true}
                                    name="productname"
                                    //  value={this.state}
                                    onChange={this.setValue}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                                <GridItem justify="center" xs={3} sm={3} md={3}>
                                    <Button id="button" color="info" onClick={this.onClick}>Submit</Button>
                                </GridItem>
                            </GridItem>




                        </GridContainer>

                        <div id="line" color="warning" className={classes.vl}></div>





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



                            {this.state.barFlag ?
                                <div>

                                    <ChartistGraph
                                        data={multipleBarsChart.data}
                                        type="Bar"
                                        options={multipleBarsChart.options}
                                    />
                                    {/*  <div stats className={classes.cardFooter + ' ' + classes.cdBal}>
                                        <button className={classes.avail1}><i className={"fas fa-square fa-lg "} /> </button>Available CD Balance{` `}{` `}
                                        <button className={classes.utilized}><i className={"fas fa-square fa-lg "} /> </button> CD Balance Utilized {` `}
                                    </div>*/}
                                    <div id="textChart" stats className={classes.cardFooter + ' ' + classes.chartFooter}>
                                        <button className={classes.avail}><i className={"fas fa-square fa-lg "} /> </button> Policy Count{` `}{` `}
                                        <button className={classes.utilized}><i className={"fas fa-square fa-lg "} /> </button> Gross Written Premium {` `}
                                    </div>

                                </div> : null}
                        </GridItem>

                    </GridContainer>
                </CardBody>
              
            </Card>
            </GridContainer>
            </Animated>
        );
    }
}
export default withStyles(style)(PendingActions);