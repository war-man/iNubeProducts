import React, { useState } from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import Accordion from "components/Accordion/Accordion.jsx";
import History from "./_History.jsx";

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



const HistoryCollapse = (props) => {
    let classes = props.classes;
    console.log("props Event", props);


    return (

        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                    <Accordion
                        //active={0}
                        collapses={[
                            {
                                title: "History",
                                content: <History props={props} />
                            }
                        ]}

                    /> </Animated>

            </GridItem>
        </GridContainer>

    );
}

export default withStyles(style)(HistoryCollapse);

