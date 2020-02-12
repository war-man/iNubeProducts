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
import { Animated } from "react-animated-css";
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

class PageContentLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (

            <GridContainer>
                <GridItem xs={12} sm={12} md={12} >

                    <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>                    <Card>
                        <ContentLoader className="icon-loader" >

                            <rect x="31" y="21" rx="0" ry="0" width="25" height="100" />
                        </ContentLoader >

                        <ContentLoader className="header-loader" >

                            <rect x="31" y="21" rx="0" ry="0" width="100" height="146" />
                        </ContentLoader >

                        <CardHeader>
                        </CardHeader>

                        <CardBody>

                            <GridContainer>
                                <GridItem xs={12} sm={4} md={3}>
                                    <ContentLoader className="content-loader" >

                                        <rect x="31" y="21" rx="0" ry="0" width="300" height="146" />
                                    </ContentLoader >
                                </GridItem>
                                <GridItem xs={12} sm={4} md={3}>
                                    <ContentLoader className="content-loader" >

                                        <rect x="31" y="21" rx="0" ry="0" width="300" height="146" />
                                    </ContentLoader >
                                </GridItem>
                                <GridItem xs={12} sm={4} md={3}>
                                    <ContentLoader className="content-loader" >

                                        <rect x="31" y="21" rx="0" ry="0" width="300" height="146" />
                                    </ContentLoader >
                                </GridItem>
                                <GridItem xs={12} sm={4} md={3}>
                                    <ContentLoader className="content-loader" >

                                        <rect x="31" y="21" rx="0" ry="0" width="300" height="146" />
                                    </ContentLoader >
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

export default withStyles(style)(PageContentLoader);