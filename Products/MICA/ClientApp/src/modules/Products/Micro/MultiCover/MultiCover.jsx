import React from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import Covers from "./Covers/_Covers.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Accordion from "components/Accordion/Accordion.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";

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

const MultiCover=(props)=> {
   
    console.log("multicover props", props);
    const [addCover, addCoverfun] = React.useState([{
        title: "Cover", content: <Covers props={props} Cindex={0} />
    }]);

    return (<div>
        {/*
        <GridContainer lg={10} justify="center">
        
            <GridItem xs={12} sm={10}>
                <Accordion
                    active={0}
                    collapses={addCover}
                />
            </GridItem>
          
            <GridItem xs={12} sm={1}>
                <Button round color="info" className="Add" small onClick={(e) => { props.componentData.props.addCoverelist(e, addCover.length, props.componentData.Iindex);addCoverfun(addCover.concat({ title: "Cover", content: <Covers props={props} Cindex={addCover.length} /> })) }}>ADD COVERS</Button >
             
            </GridItem>

            <GridItem xs={12} sm={1} style={{
                'left': '91px',
                'position': 'relative'}}>
                <CustomCheckbox
                    name="cover"
                    labelText="Cover Event"
                    value={props.componentData.props.checkBox}
                    onChange={(e) => props.componentData.props.CheckCoverEventFun(e)}
                    //disabled={(item.disable == true) ? true : null}
                    //checked={item.mIsRequired}
                    formControlProps={{
                        fullWidth: true
                    }}

                />
            </GridItem>
        </GridContainer>
          */}
       
            </div>
        );
    
}

export default withStyles(style)(MultiCover);