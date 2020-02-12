import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import product from "assets/img/product.png";
import policy from "assets/img/policy.png";
import SalesSummaryIcon from "assets/img/sales-summary.png";
import Alerts from "assets/img/My-alerts.png";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";


class Dashboard extends React.Component {
  state = {
      value: 0,
      accountFlag: true,
      salesFlag: false,
      calenderFlag: false,
      alertFlag : false
  };
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
            alertFlag : false
        })
    }
    showSalesSummary = () => {
        this.setState({
            accountFlag: false,
            salesFlag: true,
            calenderFlag: false,
            alertFlag: false
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
    showAlerts = () => {
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
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6} lg={3}>
             <Card onClick={this.showAccountSummary}>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon><img src={policy} className={classes.calImg} /></Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Account Summary</p>
                <h3 className={classes.cardTitle}>
               
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <a href="#account" >
                   Click Here to View Account Summary
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
              <Card onClick={this.showSalesSummary}>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                    <Icon><img src={SalesSummaryIcon} className={classes.calImg} /></Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Sales Summary</p>
                <h3 className={classes.cardTitle}></h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                <a href="#sales">
                    Click Here to View Sales Summary
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card onClick={this.showCalendar}>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                   <Icon><img src={product} className={classes.calImg} /></Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Calender</p>
                <h3 className={classes.cardTitle}></h3>
              </CardHeader>
               <CardFooter stats>
                <div className={classes.stats}>
                <a href="#calendar">
                    Click Here to View Calendar
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
              <Card onClick={this.showAlerts}>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                    <Icon><img src={Alerts} className={classes.calImg} /></Icon>
                </CardIcon>
                <p className={classes.cardCategory}>My Alerts And Quick Links</p>
                <h3 className={classes.cardTitle}></h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                    <a href="#alert">Click Here to View Alerts  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
       

      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
