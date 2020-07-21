import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import $ from 'jquery';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import ChromeReader from "@material-ui/icons/ChromeReaderMode";
import Extension from "@material-ui/icons/Widgets";
import cover from "@material-ui/icons/VerifiedUser";
import MainLife from "./MainLife.jsx";
import Spouse from "./Spouse.jsx";

import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";
import MainlifeLifeStyle from "./MainLifeLifeStyle.jsx";



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

const QuestioneriesWizard = (props) => {
    console.log("propsLifeStyle1", props.LifeStyleQA);
    const { classes } = props;
    return (
        <GridContainer lg={12}>
            <GridItem xs={12}>
          

                <Wizard
                    validate
                    steps={[
                        { stepName: "Main Life", stepComponent: MainLife , stepId: "", stepData: props }
                       // { stepName: "Spouse", stepComponent: Spouse, stepId: "", stepData: props },

                    ]}
                    title=""
                    subtitle=""
                />

                
                </GridItem>
        </GridContainer>
    );
}
export default withStyles(style)(QuestioneriesWizard);