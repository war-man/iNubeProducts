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
import BasicDetailsAccordian from "modules/Recruitment/Tasks/BasicDetailsAccordian.jsx";
import PersonalDetailsAccordian from "modules/Recruitment/Tasks/PersonalDetailsAccordian.jsx";
import CommunicationDetailsAccordian from "modules/Recruitment/Tasks/CommunicationDetailsAccordian.jsx";
import EducationDetailsAccordian from "modules/Recruitment/Tasks/EducationDetailsAccordian.jsx";
import ReferenceDetailsAccordian from "modules/Recruitment/Tasks/ReferenceDetailsAccordian.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import InterviewDetailsAccordian from './InterviewDetailsAccordian';
import OfficialDetailsAccordian from './OfficialDetailsAccordian';
import BankDetailsAccordian from './BankDetailsAccordian';

   

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

class InterviewDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

         
        }

    };
    render() {
        const { classes } = this.props;
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
                            tabButton: "Basic Details",
                            //tabIcon: cover,
                            tabContent: (
                                <div>
                                    <BasicDetailsAccordian/>
                                </div>
                            )
                        },
                        {
                            tabButton: "Personal Details",
                            //tabIcon: ChromeReader,
                            tabContent: (
                                <div>
                                    <PersonalDetailsAccordian />
                                </div>
                            )
                        },
                        {
                            tabButton: "Communication Details",
                            //tabIcon: ChromeReader,
                            tabContent: (
                                <div>
                                    <CommunicationDetailsAccordian />
                                </div>
                            )
                        },
                        {
                            tabButton: "Education Details",
                            //tabIcon: ChromeReader,
                            tabContent: (
                                <div>
                                    <EducationDetailsAccordian />
                                </div>
                            )
                        },

                        {
                            tabButton: "Reference Details",
                            //tabIcon: ChromeReader,
                            tabContent: (
                                <div>
                                    <ReferenceDetailsAccordian />
                                </div>
                            )
                        },
                        {
                            tabButton: "Interview Details",
                            //tabIcon: ChromeReader,
                            tabContent: (
                                <div>
                                    <InterviewDetailsAccordian />
                                </div>
                            )
                        },
                        {
                            tabButton: "Official Details",
                            //tabIcon: ChromeReader,
                            tabContent: (
                                <div>
                                    <OfficialDetailsAccordian/>
                                </div>
                            )
                        },
                        {
                            tabButton: "Bank Details",
                            //tabIcon: ChromeReader,
                            tabContent: (
                                <div>
                                    <BankDetailsAccordian/>
                                </div>
                            )
                        }
                       




                    ]}
                />
            </div>
        )
    }
}
export default withStyles(style)(InterviewDetails);