import React from "react";

import CardBody from "components/Card/CardBody.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import ContentLoader from "react-content-loader";

const style = {
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center"
    },
    inputAdornmentIcon: {
        color: "#555"
    },
    choiche: {
        textAlign: "center",
        cursor: "pointer",
        marginTop: "20px"
    },
    ...customSelectStyle,
    ...customCheckboxRadioSwitch
};

class DashboardLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={6} md={6} lg={3}>
                        <Card onClick={this.showAccountSummary}>
                            <ContentLoader className="dashboard-icon" >
                                <rect x="31" y="21" rx="0" ry="0" width="160" height="100" />
                            </ContentLoader >
                            <p >
                            </p>
                            <CardFooter stats>
                                <div>
                                    <a >
                                        <ContentLoader className="loader-footer" >
                                            <rect x="160" y="-20" rx="0" ry="0" width="300" height="100" />
                                        </ContentLoader >
                                    </a>
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6} lg={3}>
                        <Card onClick={this.showAccountSummary}>
                            <ContentLoader className="dashboard-icon" >
                                <rect x="31" y="21" rx="0" ry="0" width="160" height="100" />
                            </ContentLoader >
                            <p >
                            </p>
                            <CardFooter stats>
                                <div>
                                    <a >
                                        <ContentLoader className="loader-footer" >
                                            <rect x="160" y="-20" rx="0" ry="0" width="300" height="100" />
                                        </ContentLoader >
                                    </a>
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6} lg={3}>
                        <Card onClick={this.showAccountSummary}>
                            <ContentLoader className="dashboard-icon" >
                                <rect x="31" y="21" rx="0" ry="0" width="160" height="100" />
                            </ContentLoader >
                            <p >
                            </p>
                            <CardFooter stats>
                                <div>
                                    <a >
                                        <ContentLoader className="loader-footer" >
                                            <rect x="160" y="-20" rx="0" ry="0" width="300" height="100" />
                                        </ContentLoader >
                                    </a>
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6} lg={3}>
                        <Card onClick={this.showAccountSummary}>
                            <ContentLoader className="dashboard-icon" >
                                <rect x="31" y="21" rx="0" ry="0" width="160" height="100" />
                            </ContentLoader >
                            <p >
                            </p>
                            <CardFooter stats>
                                <div>
                                    <a >
                                        <ContentLoader className="loader-footer" >
                                            <rect x="160" y="-20" rx="0" ry="0" width="300" height="100" />
                                        </ContentLoader >
                                    </a>
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(style)(DashboardLoader);