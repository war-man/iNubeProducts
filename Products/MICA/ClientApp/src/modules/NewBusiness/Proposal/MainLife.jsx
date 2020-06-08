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
import MLMedicalHistory from "./_MLMedicalHistory.jsx";
import MLFamilyBackGround from "./_MLFamilyBG.jsx";
import PrevCurrLifeInsurance from "./_PCLifeInsurance.jsx";




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

const MainLife = (props) => {
    console.log("propsLifeSTyle2", props.componentData.LifeStyleQuesDTO);
    console.log("masterdto12", props.componentData.MasterDataDto);
    const { classes } = props;
    return (
        <div>
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
                                <MainlifeLifeStyle {...props.componentData} LifeStyleQuesDTO={props.componentData.LifeStyleQuesDTO} />
                            </div>
                        )
                    },
                    {
                        tabButton: "Medical History",
                                    //tabIcon: ChromeReader,
                        tabContent: (
                            <div>
                                <MLMedicalHistory  {...props.componentData} MedHistQuesDTO={props.componentData.MedHistQuesDTO} />
                            </div>
                        )
                    },
                    {
                        tabButton: "Family Background",
                        //tabIcon: ChromeReader,
                        tabContent: (
                            <div>
                                <MLFamilyBackGround  {...props.componentData} FBQuesDTO={props.componentData.FBQuesDTO} />
                            </div>
                        )
                    },
                    {
                        tabButton: "Additional Questionnaires",
                        //tabIcon: ChromeReader,
                        tabContent: (
                            <div>
                                
                            </div>
                        )
                    },

                    {
                        tabButton: "Previous and Current Life Insurance",
                        //tabIcon: ChromeReader,
                        tabContent: (
                            <div>
                                <PrevCurrLifeInsurance  {...props.componentData} PCQuesDTO={props.componentData.PCQuesDTO} />
                            </div>
                        )
                    }
                ]}
            />
        </div>
    )
}
export default withStyles(style)(MainLife);