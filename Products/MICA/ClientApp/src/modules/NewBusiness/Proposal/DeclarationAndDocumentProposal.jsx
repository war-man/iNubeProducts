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
import generatequotation from "assets/img/generate-quotation.png";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import CardIcon from "components/Card/CardIcon.jsx";

import PremiumPayingDetails from "./PremiumPayingDetailProposal.jsx";
import Icon from "@material-ui/core/Icon";

import CommunicationMethod from "./CommunicationMethodProposal.jsx";
import DocumentUpdating from "./DocumentUpdatingAndDeclarationPropsl";


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

class Panels extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                            <CardBody>
                                <Accordion
                                    active={0}
                                    collapses={[
                                        {
                                            title: "Premium Paying Details",
                                            content: <PremiumPayingDetails />
                                           
                                        },
                                        {
                                            title: "Preferred Communication Method",
                                            content: <CommunicationMethod />

                                        },
                                        {
                                            title: "Document Updating And Declaration",
                                            content: <DocumentUpdating />

                                        }
                                    ]}
                                />
                            </CardBody>
                       
                    </GridItem>

                </GridContainer>

            </div>
        );
    }
}

export default withStyles(styles)(Panels);
