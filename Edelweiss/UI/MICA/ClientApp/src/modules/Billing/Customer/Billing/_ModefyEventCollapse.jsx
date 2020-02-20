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


const ModifyEventCollapse = (props) => {
    let classes = props.classes;
    console.log("props Event", props);
    
    console.log("props.mindex", props.mindex);
  //  const [addEvent, eventFun] = React.useState([eventFun(addEvent.concat({ title: collapsetitle, content: <EventBased props={props} index={props.mindex}/> }))]);
    const [addEvent, eventFun] = React.useState([]);
    const setcalllistFun = () => {
        //for (let i = 0; i <= 2; i++) {
            addEvent.concat({ title: props.mobjval[0], content: <EventBased props={props} index={props.mindex} /> })
        //}
    }
   const callfun = () => {
       for (let i = 0; i <= 2; i++) {
           setcalllistFun();    
       }
    }

    return (
            <GridContainer>
                
 
            <GridItem xs={12} sm={12} md={12}>
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <Accordion
                        active={0}
                        collapses={addEvent}

                        //active={0}
                        //collapses={[

                        //    {
                        //        title: props.mobjval[0],
                        //        content: <EventBased props={props} index={props.mindex} />
                        //    }
                        //]}
                    
                /> </Animated>

                </GridItem>
            </GridContainer>
       
    );
}

export default withStyles(style)(ModifyEventCollapse);

