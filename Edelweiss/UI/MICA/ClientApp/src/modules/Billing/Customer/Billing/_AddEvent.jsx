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
import { Animated } from "react-animated-css";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";


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


const AddEvent = (props) => {
    let classes = props.classes;
    const list = props.valueFactorlist;
    console.log("list: ", props.ValueFactor);
    console.log("props Event", props);
    
    const [addEvent, eventFun] = React.useState([]);
    console.log("addevent", addEvent);
   
    return (

            <GridContainer>
                <GridContainer lg={12} justify="center">
                                <GridItem id="event-bnt" xs={5} sm={3} md={3} lg={1}>
                                <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                        <Button color="info" round className={classes.marginRight} onClick={() => {
                            props.addlist();
                            eventFun(addEvent.concat({
                                title: props.objecteventVal[1], content: <EventBased props={props} index={props.billingItem.length-1} /> }))}} >
                            <TranslationContainer translationKey="Add" />  
                        </Button>
                                </Animated>
                                </GridItem>
                </GridContainer>
 
            <GridItem xs={12} sm={12} md={12}>
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <Accordion
                    active={0}
                    collapses={addEvent}

                /> </Animated>

                </GridItem>
            </GridContainer>
       
    );
}

export default withStyles(style)(AddEvent);

