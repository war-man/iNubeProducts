import React, { useState} from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import Accordion from "components/Accordion/Accordion.jsx";
import EventBased from "./_EventBased";
import Button from "components/CustomButtons/Button.jsx";
import {Animated} from "react-animated-css";
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


const Events = (props) => {
    let classes = props.classes;
    const list = props.valueFactorlist;
    console.log("list: ", props.ValueFactor);
    console.log("props Event", props);
    const [addEvent, eventFun] = React.useState([props.addBill]);
    console.log("addevent", props.addBill);
   
    return (
            <GridContainer>
   
                <Accordion
                    active={0}
                        collapses={props.addBill}

                /> 
 
            </GridContainer>
       
    );
}

export default withStyles(style)(Events);

