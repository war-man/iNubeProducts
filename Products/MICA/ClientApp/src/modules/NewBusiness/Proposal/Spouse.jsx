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

import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";
import MainlifeLifeStyle from "./MainLifeLifeStyle.jsx";
import SpouseLifeStyle from './_SpouseLifeStyle.jsx';
import SpouseMedicalHistory from "./_SpouseMedicalHistory";
import SpouseFamilyBackGround from "./_SpouseFamilyBG.jsx";
import SpousePrevCurrLifeInsurance from "./_SpousePCInsurance.jsx";




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

const Spouse = (props) => {
    const { classes } = props;
    return (
        <NavPills
            color="rose"
            horizontal={{
                tabsGrid: { xs: 12, sm: 12, md: 4 },
                contentGrid: { xs: 12, sm: 12, md: 8 }
            }}
            tabs={[
                {
                    tabButton: "Life Style",
                    //tabIcon: cover,
                    tabContent: (
                        <div>
                            <SpouseLifeStyle   {...props.componentData}/>
                        </div>
                    )
                },
                {
                    tabButton: "Medical History",
                    //tabIcon: ChromeReader,
                    tabContent: (
                        <div id="wizChanel">
                            <SpouseMedicalHistory {...props.componentData}/>
                        </div>
                    )
                },
                {
                    tabButton: "Family Background",
                    //tabIcon: ChromeReader,
                    tabContent: (
                        <div id="wizChanel">
                            <SpouseFamilyBackGround {...props.componentData}/>
                        </div>
                    )
                },
                {
                    tabButton: "Additional Questionnaires",
                    //tabIcon: ChromeReader,
                    tabContent: (
                        <div id="wizChanel">
                           
                        </div>
                    )
                },

                {
                    tabButton: "Previous and Current Life Insurance",
                    //tabIcon: ChromeReader,
                    tabContent: (
                        <div id="wizChanel">
                            <SpousePrevCurrLifeInsurance {...props.componentData} />
                        </div>
                    )
                }
            ]}
        />

           )
}
export default withStyles(style)(Spouse);