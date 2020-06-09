import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import Info from "@material-ui/icons/Info";
import LocationOn from "@material-ui/icons/LocationOn";
import Gavel from "@material-ui/icons/Gavel";
import HelpOutline from "@material-ui/icons/HelpOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Accordion from "components/Accordion/Accordion.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import InterviewDetailsData from "./InterviewDetailsData";
import BankDetails from "./BankDetails";

const styles = {
    cardTitle,
    pageSubcategoriesTitle: {
        color: "#3C4858",
        textDecoration: "none",
        textAlign: "center"
    },
    cardCategory: {
        margin: "0",
        color: "#999999"
    }



};
const homeBtn = {
    marginLeft: "250px",
    height: "35px",
    textAlign: "center",
    backgroundColor: "#1068ac",
    color: "white"
}

class BankDetailsAccordian extends React.Component {
    constructor(props) {
        super(props);
        this.state = {


        }

    }


    render() {
        const { classes } = this.props;
        return (
            <div>
                <GridContainer lg={12}>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardBody>
                                <Accordion
                                    active={0}
                                    collapses={[
                                        {
                                            title: "Bank Details",
                                            content: <BankDetails />
                                        },

                                    ]}
                                />
                            </CardBody>
                        </Card>
                    </GridItem>

                </GridContainer>


            </div>
        );
    }
}

export default withStyles(styles)(BankDetailsAccordian);
